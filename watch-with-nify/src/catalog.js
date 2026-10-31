// Добавляй сюда свои сериалы. Для каждого сезона указывай episodes.
export const catalog = [
  {
    id: "demo-1",
    title: "ТАЙНА ТРЁХ",
    year: "2026",
    genre: "Детектив · Драма",
    age: "12+",
    description: "Одна загадка, три человека и сообщения, которые меняют всё. Демонстрационная карточка — замени описание и постер на свои.",
    poster: "",
    backdrop: "",
    featured: true,
    episodes: [
      { season: 1, number: 1, title: "Первое сообщение", duration: "08 мин", description: "История начинается с неожиданного уведомления.", video: "" },
      { season: 1, number: 2, title: "Ключ Дениса", duration: "10 мин", description: "Артём узнаёт о вещи, которую никогда не видел.", video: "" },
      { season: 1, number: 3, title: "Теперь нас трое", duration: "09 мин", description: "Новое сообщение ставит под сомнение всё известное.", video: "" }
    ]
  },
  {
    id: "demo-2",
    title: "ЗА КАДРОМ",
    year: "2026",
    genre: "Мистика · Короткий метр",
    age: "12+",
    description: "Небольшая история о том, что остаётся за пределами камеры.",
    poster: "",
    backdrop: "",
    featured: false,
    episodes: [
      { season: 1, number: 1, title: "Пробный дубль", duration: "06 мин", description: "Первый эпизод демонстрационного сериала.", video: "" },
      { season: 1, number: 2, title: "Тихий коридор", duration: "07 мин", description: "Продолжение истории.", video: "" }
    ]
  },
  {
    id: "demo-3",
    title: "NIFY ORIGINALS",
    year: "2026",
    genre: "Подборка · Авторское",
    age: "0+",
    description: "Место для твоих будущих проектов и коротких видео.",
    poster: "",
    backdrop: "",
    featured: false,
    episodes: [
      { season: 1, number: 1, title: "Знакомство", duration: "03 мин", description: "Добавь сюда собственное видео.", video: "" }
    ]
  }
];