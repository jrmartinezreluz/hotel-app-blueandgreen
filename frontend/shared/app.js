const THEME = window.__HOTEL_THEME__ || "winter";
const SLOT = window.__DEPLOY_SLOT__ || "unknown";
const BUILD_TAG = window.__BUILD_TAG__ || "local";

async function fetchJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`${path} failed: ${res.status}`);
  return res.json();
}

function renderMenu(menu) {
  document.getElementById("menu-season").textContent = menu.season;
  const list = document.getElementById("menu-list");
  list.innerHTML = menu.items
    .map(
      (item) =>
        `<li><span>${item.name}</span><em>${item.price}</em><small>${item.note}</small></li>`
    )
    .join("");
}

async function bootstrap() {
  document.getElementById("slot-label").textContent =
    `Frontend slot: ${SLOT.toUpperCase()} · theme: ${THEME}`;
  document.getElementById("build-info").textContent =
    `Image tag: ${BUILD_TAG} · theme query: ?theme=${THEME}`;

  const [hotel, menu, promo] = await Promise.all([
    fetchJson("/api/hotel"),
    fetchJson(`/api/menu?theme=${THEME}`),
    fetchJson(`/api/promotion?theme=${THEME}`),
  ]);

  document.getElementById("hotel-name").textContent = hotel.name;
  document.getElementById("hotel-tagline").textContent = hotel.tagline;
  document.getElementById("hotel-address").textContent = hotel.address;
  document.getElementById("hotel-checkin").textContent = hotel.checkIn;
  document.getElementById("hotel-checkout").textContent = hotel.checkOut;
  document.getElementById("promo-headline").textContent = promo.headline;
  document.getElementById("promo-details").textContent = promo.details;
  renderMenu(menu);
}

bootstrap().catch((err) => {
  console.error(err);
  document.body.insertAdjacentHTML(
    "beforeend",
    `<p class="error">Failed to load hotel data: ${err.message}</p>`
  );
});
/* deploy */
