import { type FC, useMemo, useRef, useState, useEffect } from 'react';
import {
  PASSPORT_SECTIONS,
  PASSPORT_ITEMS,
  type PassportData,
  type PassportSection
} from '../passportSchema';

const PAGE_BG = '#fdfaf5';
const SECTION_HEADING_COLOR = '#2d5a27';
const TEXT_COLOR = '#2c2c2c';

function getVisibleSections(data: PassportData): PassportSection[] {
  return PASSPORT_SECTIONS.filter((section) =>
    section.itemIds.some((id) => (data[id] ?? '').trim() !== '')
  );
}

function getFilledItemIds(section: PassportSection, data: PassportData): string[] {
  return section.itemIds.filter((id) => (data[id] ?? '').trim() !== '');
}

interface TreePassportProps {
  data: PassportData;
  /** Заголовок страницы (например, русское название вида) */
  title?: string;
}

export const TreePassport: FC<TreePassportProps> = ({ data, title }) => {
  const visibleSections = useMemo(() => getVisibleSections(data), [data]);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    visibleSections[0]?.id ?? null
  );
  const [accordionOpen, setAccordionOpen] = useState<Record<string, boolean>>({
    '4': false,
    '8': false
  });

  // Scrollspy: отслеживание видимой секции при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = (entry.target as HTMLElement).dataset.sectionId;
          if (id) setActiveSectionId(id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    visibleSections.forEach((s) => {
      const el = sectionRefs.current[s.id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [visibleSections]);

  const toggleAccordion = (id: string) => {
    setAccordionOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className="flex min-h-screen w-full"
      style={{ backgroundColor: PAGE_BG, color: TEXT_COLOR, lineHeight: 1.6 }}
    >
      {/* Левая колонка: глобальное меню */}
      <aside
        className="hidden w-52 shrink-0 border-r border-gray-300/60 bg-white/40 py-6 pl-4 pr-2 lg:block"
        style={{ backgroundColor: PAGE_BG }}
      >
        <nav className="sticky top-6 space-y-1 text-sm">
          <div className="mb-4 font-semibold" style={{ color: SECTION_HEADING_COLOR }}>
            Навигация
          </div>
          <a
            href="/"
            className="block rounded-md px-3 py-1.5 hover:bg-black/5"
            style={{ color: TEXT_COLOR }}
          >
            Атлас
          </a>
          <a
            href="/species"
            className="block rounded-md px-3 py-1.5 hover:bg-black/5"
            style={{ color: TEXT_COLOR }}
          >
            Виды
          </a>
          <a
            href="/about"
            className="block rounded-md px-3 py-1.5 hover:bg-black/5"
            style={{ color: TEXT_COLOR }}
          >
            О проекте
          </a>
        </nav>
      </aside>

      {/* Центральная колонка: паспорт вида */}
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 md:px-8">
        <div className="mx-auto max-w-3xl">
          {title && (
            <h1
              className="mb-8 text-2xl font-bold md:text-3xl"
              style={{ color: TEXT_COLOR, fontFamily: "'Inter', sans-serif" }}
            >
              {title}
            </h1>
          )}

          {visibleSections.map((section) => {
            const filledIds = getFilledItemIds(section, data);
            if (filledIds.length === 0) return null;

            const isAccordion = section.accordion === true;
            const isOpen = accordionOpen[section.id] ?? false;

            const content = (
              <div className="space-y-4">
                {filledIds.map((itemId) => (
                  <div key={itemId}>
                    <dt
                      className="text-sm font-medium"
                      style={{ color: SECTION_HEADING_COLOR, marginBottom: '0.25rem' }}
                    >
                      {itemId} {PASSPORT_ITEMS[itemId]}
                    </dt>
                    <dd
                      className="text-sm"
                      style={{ color: TEXT_COLOR, letterSpacing: '-0.011em' }}
                    >
                      {(data[itemId] ?? '').trim()}
                    </dd>
                  </div>
                ))}
              </div>
            );

            const heading = (
              <h2
                ref={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
                data-section-id={section.id}
                className="scroll-mt-24 text-lg font-semibold"
                style={{
                  color: SECTION_HEADING_COLOR,
                  fontFamily: "'Inter', sans-serif",
                  marginBottom: '0.75rem'
                }}
              >
                {section.title}
              </h2>
            );

            return (
              <section
                key={section.id}
                id={`section-${section.id}`}
                className="mb-10 border-b border-gray-300/50 pb-10 last:border-0"
              >
                {isAccordion ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleAccordion(section.id)}
                      className="flex w-full items-center justify-between gap-2 text-left"
                      aria-expanded={isOpen}
                    >
                      {heading}
                      <span
                        className="shrink-0 text-gray-500 transition-transform"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        ▼
                      </span>
                    </button>
                    {isOpen && <div className="mt-2">{content}</div>}
                  </>
                ) : (
                  <>
                    {heading}
                    {content}
                  </>
                )}
              </section>
            );
          })}
        </div>
      </main>

      {/* Правая колонка: липкое оглавление (только видимые разделы) */}
      <aside
        className="hidden w-56 shrink-0 border-l border-gray-300/60 py-6 pl-2 pr-4 xl:block"
        style={{ backgroundColor: PAGE_BG }}
      >
        <nav className="sticky top-6">
          <div
            className="mb-3 text-xs font-semibold uppercase tracking-wider"
            style={{ color: SECTION_HEADING_COLOR }}
          >
            Оглавление
          </div>
          <ul className="space-y-1 text-sm">
            {visibleSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#section-${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    sectionRefs.current[section.id]?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                  className={`block rounded-md px-2 py-1.5 transition-colors ${
                    activeSectionId === section.id ? 'font-semibold' : ''
                  }`}
                  style={{
                    color:
                      activeSectionId === section.id ? SECTION_HEADING_COLOR : TEXT_COLOR,
                    backgroundColor: activeSectionId === section.id ? 'rgba(45,90,39,0.08)' : 'transparent'
                  }}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default TreePassport;
