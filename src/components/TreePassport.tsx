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

function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function IconList({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16M7 6h.01M7 12h.01M7 18h.01" />
    </svg>
  );
}

function IconClose({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

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
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  // Блокировка прокрутки страницы при открытых мобильных меню
  useEffect(() => {
    const open = leftMenuOpen || tocOpen;
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [leftMenuOpen, tocOpen]);

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

  const closeLeftMenu = () => setLeftMenuOpen(false);
  const closeToc = () => setTocOpen(false);

  const leftNavLinks = (
    <>
      <a
        href="/"
        className="block rounded-md px-3 py-1.5 hover:bg-black/5"
        style={{ color: TEXT_COLOR }}
        onClick={closeLeftMenu}
      >
        Атлас
      </a>
      <a
        href="/species"
        className="block rounded-md px-3 py-1.5 hover:bg-black/5"
        style={{ color: TEXT_COLOR }}
        onClick={closeLeftMenu}
      >
        Виды
      </a>
      <a
        href="/about"
        className="block rounded-md px-3 py-1.5 hover:bg-black/5"
        style={{ color: TEXT_COLOR }}
        onClick={closeLeftMenu}
      >
        О проекте
      </a>
    </>
  );

  return (
    <div
      className="flex min-h-screen w-full"
      style={{ backgroundColor: PAGE_BG, color: TEXT_COLOR, lineHeight: 1.6 }}
    >
      {/* Шапка для мобильных: кнопки «меню» и «оглавление» */}
      <header
        className="fixed left-0 right-0 top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-gray-300/60 px-4 lg:hidden"
        style={{ backgroundColor: PAGE_BG }}
        aria-label="Навигация"
      >
        <button
          type="button"
          onClick={() => setLeftMenuOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-black/5"
          aria-label="Открыть меню"
        >
          <IconMenu className="h-6 w-6" style={{ color: TEXT_COLOR }} />
        </button>
        <span className="text-base font-semibold" style={{ color: TEXT_COLOR }}>
          Coniferum
        </span>
        <button
          type="button"
          onClick={() => setTocOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-black/5"
          aria-label="Открыть оглавление"
        >
          <IconList className="h-6 w-6" style={{ color: TEXT_COLOR }} />
        </button>
      </header>

      {/* Левая колонка: глобальное меню (только на больших экранах) */}
      <aside
        className="hidden w-52 shrink-0 border-r border-gray-300/60 bg-white/40 py-6 pl-4 pr-2 lg:block"
        style={{ backgroundColor: PAGE_BG }}
      >
        <nav className="sticky top-6 space-y-1 text-sm">
          <div className="mb-4 font-semibold" style={{ color: SECTION_HEADING_COLOR }}>
            Навигация
          </div>
          {leftNavLinks}
        </nav>
      </aside>

      {/* Мобильный выезжающий левый drawer */}
      {leftMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={closeLeftMenu}
            aria-hidden
          />
          <aside
            className="fixed left-0 top-0 bottom-0 z-50 w-64 shrink-0 border-r border-gray-300/60 py-6 pl-4 pr-2 lg:hidden animate-slide-in-left"
            style={{ backgroundColor: PAGE_BG }}
            role="dialog"
            aria-label="Меню навигации"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="font-semibold" style={{ color: SECTION_HEADING_COLOR }}>
                Навигация
              </div>
              <button
                type="button"
                onClick={closeLeftMenu}
                className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-black/5"
                aria-label="Закрыть меню"
              >
                <IconClose className="h-5 w-5" style={{ color: TEXT_COLOR }} />
              </button>
            </div>
            <nav className="space-y-1 text-sm">{leftNavLinks}</nav>
          </aside>
        </>
      )}

      {/* Центральная колонка: паспорт вида */}
      <main className="min-w-0 flex-1 px-4 pt-14 pb-8 sm:px-6 md:px-8 lg:pt-8">
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

      {/* Правая колонка: липкое оглавление (только на больших экранах) */}
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

      {/* Мобильный выезжающий правый drawer — оглавление */}
      {tocOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 xl:hidden"
            onClick={closeToc}
            aria-hidden
          />
          <aside
            className="fixed right-0 top-0 bottom-0 z-50 w-64 shrink-0 border-l border-gray-300/60 py-6 pl-4 pr-4 xl:hidden animate-slide-in-right"
            style={{ backgroundColor: PAGE_BG }}
            role="dialog"
            aria-label="Оглавление страницы"
          >
            <div className="mb-4 flex items-center justify-between">
              <div
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: SECTION_HEADING_COLOR }}
              >
                Оглавление
              </div>
              <button
                type="button"
                onClick={closeToc}
                className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-black/5"
                aria-label="Закрыть оглавление"
              >
                <IconClose className="h-5 w-5" style={{ color: TEXT_COLOR }} />
              </button>
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
                      closeToc();
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
          </aside>
        </>
      )}
    </div>
  );
};

export default TreePassport;
