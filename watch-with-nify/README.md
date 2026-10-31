# Watch with NIFY

Тёмный кино-каталог NIFY: главная, каталог, карточка сериала, сезоны и серии, избранное, история продолжения и видеоплеер.

## Запуск локально
1. Установи Node.js 22 или новее.
2. В папке проекта выполни `npm install`.
3. Выполни `npm run dev`.

## Как добавить сериал
Открой `src/catalog.js` и добавь объект в массив `catalog`. Для эпизода укажи `season`, `number`, `title`, `duration`, `description` и `video`. В `video` вставь прямую ссылку на собственный видеофайл (например, MP4). Для постера укажи прямую ссылку в `poster`.

Пример:
```js
{
  id: "my-series",
  title: "МОЙ СЕРИАЛ",
  year: "2026",
  genre: "Драма",
  age: "12+",
  description: "Описание сериала.",
  poster: "https://example.com/poster.jpg",
  featured: false,
  episodes: [
    { season: 1, number: 1, title: "Пилот", duration: "08 мин", description: "Описание серии.", video: "https://example.com/episode-1.mp4" }
  ]
}
```

Используй только видео и изображения, на которые у тебя есть права или разрешение. Демонстрационные сериалы — заглушки, видео к ним не приложены.

## Публикация на GitHub Pages
Загрузи файлы проекта в новый GitHub-репозиторий с веткой `main`. В Settings → Pages выбери **GitHub Actions**. Workflow `.github/workflows/deploy.yml` автоматически публикует сайт после push и собирает Android debug APK. APK появится в Actions → последний запуск → Artifacts.

## Android
Проект Android генерируется Capacitor внутри GitHub Actions. Скачай артефакт `watch-with-nify-debug-apk`, чтобы установить тестовую сборку на Android. Для публикации в Google Play потребуется отдельная release-подпись.
