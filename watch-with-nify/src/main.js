import { catalog } from "./catalog.js";
import "./style.css";

const app = document.querySelector("#app");
let page = "home";
let selected = null;
let activeSeason = 1;
let search = "";
let favorites = JSON.parse(localStorage.getItem("nify-favorites") || "[]");
let progress = JSON.parse(localStorage.getItem("nify-progress") || "{}");

const icon = (name) => ({
  home: '<svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg>',
  grid: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M20.8 8.8c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>',
  play: '<svg viewBox="0 0 24 24" class="fill"><path d="m8 5 12 7-12 7z"/></svg>'
}[name]);

function poster(item, wide=false) {
  const style = item.poster ? `background-image:url('${item.poster}')` : "";
  return `<div class="poster ${wide ? "wide" : ""}" style="${style}">
    ${!item.poster ? `<div class="poster-mark"><span>NIFY</span><b>${item.title}</b><i>ORIGINAL SERIES</i></div>` : ""}
    <span class="poster-glow"></span>
  </div>`;
}
function card(item) {
  return `<button class="show-card" data-open="${item.id}">
    ${poster(item)}
    <span class="card-title">${item.title}</span>
    <span class="card-meta">${item.year} · ${item.genre}</span>
  </button>`;
}
function nav() {
  return `<nav class="bottom-nav">
    <button data-page="home" class="${page==="home"?"active":""}">${icon("home")}<span>Главная</span></button>
    <button data-page="catalog" class="${page==="catalog"?"active":""}">${icon("grid")}<span>Каталог</span></button>
    <button data-page="favorites" class="${page==="favorites"?"active":""}">${icon("heart")}<span>Избранное</span></button>
  </nav>`;
}
function header() {
  return `<header class="topbar"><div class="brand">WATCH <span>WITH</span> <b>NIFY</b></div><button class="search-btn" data-action="search">${icon("search")}</button></header>`;
}
function home() {
  const featured = catalog.find(x=>x.featured) || catalog[0];
  const continueItem = catalog.find(x=>progress[x.id]);
  return `${header()}
    <main>
      <section class="hero">
        ${poster(featured,true)}
        <div class="hero-shade"></div>
        <div class="hero-content"><span class="eyebrow">NIFY ORIGINAL</span><h1>${featured.title}</h1>
          <p>${featured.description}</p><div class="hero-actions">
            <button class="primary" data-open="${featured.id}">${icon("play")} Смотреть</button>
            <button class="secondary" data-fav="${featured.id}">${favorites.includes(featured.id)?"♥":"＋"} Мой список</button>
          </div>
        </div>
      </section>
      ${continueItem ? `<section class="section"><div class="section-head"><h2>Продолжить просмотр</h2></div><div class="horizontal">${card(continueItem)}</div></section>` : ""}
      <section class="section"><div class="section-head"><h2>Популярное на NIFY</h2><button data-page="catalog">Все <span>→</span></button></div><div class="horizontal">${catalog.map(card).join("")}</div></section>
      <section class="section"><div class="section-head"><h2>Недавно добавлено</h2></div><div class="horizontal">${catalog.slice().reverse().map(card).join("")}</div></section>
    </main>${nav()}`;
}
function catalogPage() {
  const list = catalog.filter(x=>(x.title+" "+x.genre).toLowerCase().includes(search.toLowerCase()));
  return `${header()}<main class="page-main"><div class="page-title"><span class="eyebrow">ВСЯ КОЛЛЕКЦИЯ</span><h1>Каталог</h1><p>Выбирай историю для просмотра</p></div>
    <div class="search-field">${icon("search")}<input id="catalog-search" placeholder="Название или жанр" value="${search.replaceAll('"',"&quot;")}"></div>
    <div class="catalog-grid">${list.map(card).join("") || "<p class='empty'>Ничего не найдено</p>"}</div></main>${nav()}`;
}
function favoritesPage() {
  const list = catalog.filter(x=>favorites.includes(x.id));
  return `${header()}<main class="page-main"><div class="page-title"><span class="eyebrow">ТВОЯ ПОДБОРКА</span><h1>Избранное</h1><p>Сериалы, к которым хочется вернуться</p></div>
    <div class="catalog-grid">${list.map(card).join("") || "<p class='empty'>Здесь пока пусто. Добавь сериал в свой список.</p>"}</div></main>${nav()}`;
}
function detail(item) {
  const seasons = [...new Set(item.episodes.map(e=>e.season))].sort((a,b)=>a-b);
  const episodes = item.episodes.filter(e=>e.season===activeSeason);
  return `<main class="detail-page"><button class="back-btn" data-action="back">${icon("back")} Назад</button>
    <section class="detail-hero">${poster(item,true)}<div class="detail-overlay"></div><div class="detail-info">
      <span class="eyebrow">WATCH WITH NIFY ORIGINAL</span><h1>${item.title}</h1><div class="detail-meta">${item.year} <span>•</span> ${item.age} <span>•</span> ${item.genre}</div>
      <p>${item.description}</p><div class="hero-actions"><button class="primary" data-playfirst="${item.id}">${icon("play")} Смотреть</button><button class="secondary" data-fav="${item.id}">${favorites.includes(item.id)?"♥ В избранном":"＋ В избранное"}</button></div>
    </div></section>
    <section class="section episodes-section"><div class="section-head"><h2>Серии</h2><select id="season-select">${seasons.map(s=>`<option value="${s}" ${s===activeSeason?"selected":""}>Сезон ${s}</option>`).join("")}</select></div>
    <div class="episode-list">${episodes.map(e=>`<button class="episode" data-episode="${e.season}:${e.number}">
      <div class="episode-thumb">${icon("play")}<span>${String(e.number).padStart(2,"0")}</span></div>
      <div class="episode-copy"><b>${e.number}. ${e.title}</b><span>${e.duration}</span><p>${e.description}</p></div><span class="episode-arrow">›</span>
    </button>`).join("")}</div></section></main>${nav()}`;
}
function player(item, ep) {
  const hasVideo = Boolean(ep.video);
  return `<main class="player-page"><button class="back-btn player-back" data-action="back">${icon("back")} К сериалу</button>
    <div class="video-wrap">${hasVideo ? `<video controls autoplay playsinline src="${ep.video}"></video>` : `<div class="video-placeholder"><div class="play-orb">${icon("play")}</div><b>${item.title}</b><span>СЕЗОН ${ep.season} · СЕРИЯ ${ep.number}</span><p>Добавь ссылку на своё видео в <code>src/catalog.js</code></p></div>`}</div>
    <div class="player-caption"><span class="eyebrow">СЕЗОН ${ep.season} · СЕРИЯ ${ep.number}</span><h1>${ep.title}</h1><p>${ep.description}</p><span class="muted">${item.title} · ${ep.duration}</span></div></main>${nav()}`;
}
function render() {
  if (selected?.episode) app.innerHTML = player(selected.item, selected.episode);
  else if (selected?.item) app.innerHTML = detail(selected.item);
  else app.innerHTML = page==="home" ? home() : page==="catalog" ? catalogPage() : favoritesPage();
}
function openItem(id) { selected={item:catalog.find(x=>x.id===id)}; activeSeason=1; render(); window.scrollTo(0,0); }
function toggleFav(id) {
  favorites = favorites.includes(id) ? favorites.filter(x=>x!==id) : [...favorites,id];
  localStorage.setItem("nify-favorites",JSON.stringify(favorites)); render();
}
app.addEventListener("click", e=>{
  const btn=e.target.closest("button"); if(!btn)return;
  if(btn.dataset.page){page=btn.dataset.page;selected=null;render();window.scrollTo(0,0);}
  if(btn.dataset.open)openItem(btn.dataset.open);
  if(btn.dataset.fav)toggleFav(btn.dataset.fav);
  if(btn.dataset.action==="back"){if(selected?.episode)selected={item:selected.item};else selected=null;render();window.scrollTo(0,0);}
  if(btn.dataset.action==="search"){page="catalog";selected=null;render();document.querySelector("#catalog-search")?.focus();}
  if(btn.dataset.playfirst){const item=catalog.find(x=>x.id===btn.dataset.playfirst);const ep=item.episodes[0];selected={item,episode:ep};progress[item.id]=`${ep.season}:${ep.number}`;localStorage.setItem("nify-progress",JSON.stringify(progress));render();}
  if(btn.dataset.episode){const [s,n]=btn.dataset.episode.split(":").map(Number);const item=selected.item;const ep=item.episodes.find(x=>x.season===s&&x.number===n);selected={item,episode:ep};progress[item.id]=`${s}:${n}`;localStorage.setItem("nify-progress",JSON.stringify(progress));render();window.scrollTo(0,0);}
});
app.addEventListener("change",e=>{
  if(e.target.id==="season-select"){activeSeason=Number(e.target.value);render();}
});
app.addEventListener("input",e=>{
  if(e.target.id==="catalog-search"){const pos=e.target.selectionStart;search=e.target.value;render();const input=document.querySelector("#catalog-search");input.focus();input.setSelectionRange(pos,pos);}
});
render();