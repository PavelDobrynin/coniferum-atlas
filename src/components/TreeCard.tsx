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
    <article className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-lg shadow-gray-200/50">
      {/* Header */}
      <header className="bg-[#2d5a27] px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] text-emerald-50">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate">{russianName || 'Неизвестный вид'}</span>
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold tracking-[0.18em]">
            CONIFERUM
          </span>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:gap-6">
        {imageUrl && (
          <div className="shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
            <img
              src={imageUrl}
              alt={latinName}
              className="h-40 w-full object-cover sm:h-44 sm:w-44"
            />
          </div>
        )}

        <div className="flex-1 space-y-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-600">
              {family || 'Семейство не указано'}
            </p>
            <h2 className="mt-1 text-lg font-semibold" style={{ color: '#2c2c2c' }}>
              <span className="italic">{latinName}</span>
              {genus && !latinName.toLowerCase().startsWith(genus.toLowerCase()) && (
                <span style={{ color: '#666' }}> • {genus}</span>
              )}
            </h2>
          </div>

          {shortDescription && (
            <p className="text-sm leading-relaxed" style={{ color: '#2c2c2c' }}>{shortDescription}</p>
          )}

          <dl className="grid gap-x-6 gap-y-2 text-xs sm:grid-cols-2" style={{ color: '#2c2c2c' }}>
            {nativeRange && (
              <div>
                <dt className="font-medium" style={{ color: '#2c2c2c' }}>Естественный ареал</dt>
                <dd className="mt-0.5" style={{ color: '#555' }}>{nativeRange}</dd>
              </div>
            )}
            {russianName && (
              <div>
                <dt className="font-medium" style={{ color: '#2c2c2c' }}>Русское название</dt>
                <dd className="mt-0.5" style={{ color: '#555' }}>{russianName}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </article>
  );
};

export default TreeCard;

