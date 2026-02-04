import type { FC } from 'react';

export interface TreeCardProps {
  latinName: string;
  russianName?: string;
  imageUrl?: string;
  family?: string;
  genus?: string;
  shortDescription?: string;
  nativeRange?: string;
}

/**
 * Карточка хвойного дерева для атласа Coniferum.
 * Стиль основан на HTML/CSS-шаблоне:
 * - зелёный заголовок #2d5a27
 * - шрифт Inter (подключён глобально)
 */
export const TreeCard: FC<TreeCardProps> = ({
  latinName,
  russianName,
  imageUrl,
  family,
  genus,
  shortDescription,
  nativeRange
}) => {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg shadow-black/40 backdrop-blur">
      {/* Header */}
      <header className="bg-[#2d5a27] px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] text-emerald-50">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate">{russianName || 'Неизвестный вид'}</span>
          <span className="rounded-full bg-black/20 px-2 py-0.5 text-[10px] font-semibold tracking-[0.18em]">
            CONIFERUM
          </span>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:gap-6">
        {imageUrl && (
          <div className="shrink-0 overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/40">
            <img
              src={imageUrl}
              alt={latinName}
              className="h-40 w-full object-cover sm:h-44 sm:w-44"
            />
          </div>
        )}

        <div className="flex-1 space-y-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">
              {family || 'Семейство не указано'}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-50">
              <span className="italic">{latinName}</span>
              {genus && !latinName.toLowerCase().startsWith(genus.toLowerCase()) && (
                <span className="text-slate-400"> • {genus}</span>
              )}
            </h2>
          </div>

          {shortDescription && (
            <p className="text-sm leading-relaxed text-slate-300">{shortDescription}</p>
          )}

          <dl className="grid gap-x-6 gap-y-2 text-xs text-slate-300 sm:grid-cols-2">
            {nativeRange && (
              <div>
                <dt className="font-medium text-slate-200">Естественный ареал</dt>
                <dd className="mt-0.5 text-slate-300">{nativeRange}</dd>
              </div>
            )}
            {russianName && (
              <div>
                <dt className="font-medium text-slate-200">Русское название</dt>
                <dd className="mt-0.5 text-slate-300">{russianName}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </article>
  );
};

export default TreeCard;

