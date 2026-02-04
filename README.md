# Coniferum — Атлас хвойных

Базовый фронтенд‑проект для атласа хвойных **Coniferum**, построенный на **React + TypeScript + Vite + Tailwind CSS**.

## Технологии

- **React 18** + **TypeScript**
- **Vite** в качестве сборщика
- **Tailwind CSS** для стилизации
- Шрифт **Inter** (через Google Fonts)

## Структура

- `src/schema.ts` — описание схемы из 54 полей (этимология, ДНК и др.) для одной записи вида
- `src/components/TreeCard.tsx` — карточка дерева с зелёным заголовком `#2d5a27` и шрифтом Inter
- `src/App.tsx` — пример страницы с одной тестовой карточкой

## Подготовка окружения

Убедитесь, что у вас установлены **Node.js** и **npm**.

```bash
npm install
npm run dev
```

После запуска перейдите в браузере на `http://localhost:5173`.

## Подготовка к загрузке на GitHub

1. Инициализируйте репозиторий (если ещё не инициализирован):

   ```bash
   git init
   git add .
   git commit -m "Initial Coniferum atlas frontend"
   ```

2. Создайте новый репозиторий на GitHub под своим аккаунтом `PavelDorynin` (например, `coniferum-atlas`).

3. Свяжите локальный репозиторий с GitHub и отправьте код:

   ```bash
   git remote add origin git@github.com:PavelDorynin/coniferum-atlas.git
   git push -u origin main
   ```

