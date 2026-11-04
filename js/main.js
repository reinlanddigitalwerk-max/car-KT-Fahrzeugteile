/* KT-Fahrzeugteile – Interaktionen */
(() => {
  "use strict";

  const WHATSAPP = "491725187388";
  const $ = (s, el = document) => el.querySelector(s);

  /* ---------- Icons (Linien-Stil) ---------- */
  const ICON = {
    brake: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3a9 9 0 0 1 9 9h-4"/><circle cx="8" cy="8" r=".6"/><circle cx="16" cy="16" r=".6"/><circle cx="8" cy="16" r=".6"/>',
    engine: '<path d="M4 10h2V8h4V6h5v2h2l2 3h2v5h-2l-2 2H8l-2-2H4z"/><path d="M9 12h5"/>',
    filter: '<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 5v14M12 5v14M16 5v14"/>',
    light: '<path d="M14 6c-4 0-7 2.7-7 6s3 6 7 6c1.5 0 2-1 2-6s-.5-6-2-6Z"/><path d="M3 8h3M2.5 12H6M3 16h3M18 9l3-1M18 15l3 1"/>',
    suspension: '<path d="M12 2v4M12 18v4"/><rect x="9" y="6" width="6" height="3" rx="1"/><rect x="9" y="15" width="6" height="3" rx="1"/><path d="M8 10.5l8 1.5-8 1.5 8 1.5"/>',
    wheel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 7v2M12 15v2M7 12h2M15 12h2"/>',
    clutch: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.9 2.9M15.5 15.5l2.9 2.9M18.4 5.6l-2.9 2.9M8.5 15.5l-2.9 2.9"/>',
    electric: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  };
  const svg = (paths) => `<svg viewBox="0 0 24 24" aria-hidden="true">${paths}</svg>`;

  /* ---------- Kategorien ---------- */
  const CATS = [
    ["brake", "Bremsen", "Scheiben, Beläge, Sättel & Bremsflüssigkeit"],
    ["engine", "Motor", "Zahnriemen, Dichtungen, Zündkerzen, Kolben"],
    ["filter", "Filter & Öl", "Öl-, Luft-, Kraftstoff- & Innenraumfilter"],
    ["light", "Beleuchtung", "Xenon-Brenner, LED, Scheinwerfer & Leuchten"],
    ["suspension", "Fahrwerk", "Stoßdämpfer, Federn, Querlenker, Koppelstangen"],
    ["wheel", "Räder & Reifen", "Felgen, Radlager, Radschrauben"],
    ["clutch", "Kupplung & Antrieb", "Kupplungssätze, Antriebswellen, Lager"],
    ["electric", "Elektrik", "Batterien, Lichtmaschinen, Anlasser, Sensoren"],
  ];
  const cats = $("#cats");
  if (cats) {
    cats.innerHTML = CATS.map(([icon, title, text]) => `
      <a class="cat reveal" href="#teilefinder" data-part="${title}">
        <span class="cat__icon">${svg(ICON[icon])}</span>
        <h3>${title}</h3>
        <p>${text}</p>
      </a>`).join("");
    cats.addEventListener("click", (e) => {
      const a = e.target.closest(".cat");
      if (!a) return;
      const input = $('#finder [name="teil"]');
      if (input && !input.value) input.value = a.dataset.part;
    });
  }

  /* ---------- Angebot des Tages ----------
     HINWEIS: Beispieldaten – Produkte, Preise und Bestände bitte
     durch echte Angebote ersetzen. */
  const ART = {
    disc: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#bfc1c6"/><circle cx="50" cy="50" r="40" fill="none" stroke="#7d7f86" stroke-width="2"/>
      ${Array.from({ length: 16 }, (_, i) => { const a = i * Math.PI / 8; return `<circle cx="${(50 + 30 * Math.cos(a)).toFixed(1)}" cy="${(50 + 30 * Math.sin(a)).toFixed(1)}" r="2.2" fill="#55575d"/>`; }).join("")}
      <circle cx="50" cy="50" r="17" fill="#2a2b30"/><circle cx="50" cy="50" r="7" fill="#0b0b0d"/>
      <path d="M63 12 A42 42 0 0 1 92 46 L80 48 A30 30 0 0 0 60 24 Z" fill="#e10600"/></svg>`,
    rim: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#111"/><circle cx="50" cy="50" r="36" fill="#2b2c31" stroke="#9a9ca3" stroke-width="2"/>
      ${Array.from({ length: 5 }, (_, i) => `<path d="M50 50 L46 16 Q50 13 54 16 Z" fill="#c9cbd1" transform="rotate(${i * 72} 50 50)"/><path d="M50 50 L52 16" stroke="#e10600" stroke-width="2" transform="rotate(${i * 72} 50 50)"/>`).join("")}
      <circle cx="50" cy="50" r="9" fill="#d5d7dc"/><circle cx="50" cy="50" r="4" fill="#e10600"/></svg>`,
    filter: `<svg viewBox="0 0 100 100"><rect x="14" y="26" width="72" height="48" rx="6" fill="#e9e9ec"/>
      ${Array.from({ length: 11 }, (_, i) => `<path d="M${20 + i * 6} 30 v40" stroke="#b9bac0" stroke-width="2.4"/>`).join("")}
      <rect x="14" y="26" width="72" height="48" rx="6" fill="none" stroke="#e10600" stroke-width="4"/></svg>`,
    xenon: `<svg viewBox="0 0 100 100"><defs><radialGradient id="xg"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#cfe1ff"/><stop offset="1" stop-color="#8fbaff" stop-opacity="0"/></radialGradient></defs>
      <circle cx="34" cy="50" r="26" fill="url(#xg)"/><rect x="22" y="44" width="30" height="12" rx="6" fill="#f4f8ff" stroke="#9fb5d8"/>
      <rect x="52" y="38" width="10" height="24" fill="#c9cbd1"/><rect x="62" y="34" width="24" height="32" rx="4" fill="#26272c"/><rect x="66" y="42" width="16" height="4" fill="#e10600"/></svg>`,
  };
  const DEALS = [
    { art: "disc", name: "Bremsscheiben-Set vorne", stars: 5, price: 89, old: 119, avail: 42, sold: 18, badge: "-25%" },
    { art: "rim", name: "Alufelge 18\" Sport", stars: 4, price: 149, old: 189, avail: 16, sold: 12, badge: "TOP" },
    { art: "filter", name: "Luftfilter Premium", stars: 4, price: 14.9, old: 19.9, avail: 120, sold: 64, badge: "-25%" },
    { art: "xenon", name: "Xenon-Brenner D1S", stars: 5, price: 39, old: 59, avail: 38, sold: 27, badge: "NEU" },
  ];
  const euro = (n) => n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
  const products = $("#products");
  if (products) {
    products.innerHTML = DEALS.map((d) => {
      const pct = Math.round((d.sold / (d.avail + d.sold)) * 100);
      return `
      <article class="product reveal">
        <div class="product__img">${ART[d.art]}<span class="product__badge">${d.badge}</span></div>
        <div class="stars" aria-label="${d.stars} von 5 Sternen">${"★".repeat(d.stars)}<span class="off">${"★".repeat(5 - d.stars)}</span></div>
        <h3>${d.name}</h3>
        <div class="price"><b>${euro(d.price)}</b><s>${euro(d.old)}</s></div>
        <div class="stock">
          <div class="stock__bar"><i style="width:${pct}%"></i></div>
          <div class="stock__meta"><span>Verfügbar: <b>${d.avail}</b></span><span>Verkauft: <b>${d.sold}</b></span></div>
        </div>
        <a class="btn btn--red btn--sm" href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hallo KT-Fahrzeugteile, ich interessiere mich für das Angebot: ${d.name}`)}" target="_blank" rel="noopener">Reservieren</a>
      </article>`;
    }).join("");
  }

  /* ---------- Countdown bis Mitternacht ---------- */
  const cdH = $("#cdH"), cdM = $("#cdM"), cdS = $("#cdS");
  const pad = (n) => String(n).padStart(2, "0");
  function tick() {
    const now = new Date();
    const end = new Date(now); end.setHours(24, 0, 0, 0);
    let s = Math.max(0, Math.floor((end - now) / 1000));
    cdH.textContent = pad(Math.floor(s / 3600)); s %= 3600;
    cdM.textContent = pad(Math.floor(s / 60));
    cdS.textContent = pad(s % 60);
  }
  if (cdH) { tick(); setInterval(tick, 1000); }

  /* ---------- Marken-Laufband ---------- */
  const BRANDS = ["Volkswagen", "Audi", "BMW", "Mercedes-Benz", "Opel", "Ford", "Škoda", "Seat", "Renault", "Peugeot", "Toyota", "Hyundai", "Kia", "Fiat", "Volvo", "Dacia"];
  const track = $("#brandsTrack");
  if (track) {
    const row = BRANDS.map((b) => `<span>${b}</span>`).join("");
    track.innerHTML = row + row.replace(/<span>/g, '<span aria-hidden="true">');
  }

  /* ---------- Xenon-Licht (automatisch) ----------
     Zündet beim Laden und jedes Mal, wenn der Hero wieder ins Bild kommt. */
  const hero = $(".hero");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let igniteTimer;
  function ignite() {
    hero.classList.remove("lights-on", "igniting");
    if (reduce) { hero.classList.add("lights-on"); return; }
    void hero.offsetWidth; // Animation neu starten
    hero.classList.add("lights-on", "igniting");
    clearTimeout(igniteTimer);
    igniteTimer = setTimeout(() => hero.classList.remove("igniting"), 2500);
  }
  if (hero) {
    setTimeout(ignite, reduce ? 0 : 900);
    if ("IntersectionObserver" in window) {
      let wasOut = false;
      new IntersectionObserver(([en]) => {
        if (!en.isIntersecting) { wasOut = true; hero.classList.remove("lights-on"); }
        else if (wasOut) { wasOut = false; ignite(); }
      }, { threshold: 0.15 }).observe(hero);
    }
  }

  /* ---------- Mobiles Menü ---------- */
  const burger = $("#burger"), nav = $("#nav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    });
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) { nav.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); }
    });
  }

  /* ---------- Aktiver Menüpunkt ---------- */
  const links = [...document.querySelectorAll(".nav a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const id = "#" + en.target.id;
        links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
  }

  /* ---------- Teilefinder → WhatsApp ---------- */
  const form = $("#finder"), hint = $("#finderHint");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const missing = [...form.querySelectorAll("[required]")].filter((el) => !el.value.trim());
      form.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
      if (missing.length) {
        missing.forEach((el) => el.classList.add("is-invalid"));
        missing[0].focus();
        hint.textContent = "Bitte Marke und gesuchtes Teil angeben.";
        return;
      }
      hint.textContent = "";
      const lines = [
        "Hallo KT-Fahrzeugteile, ich suche folgendes Teil:",
        `• Teil: ${data.teil}`,
        `• Marke: ${data.marke}`,
        data.modell && `• Modell/Baujahr: ${data.modell}`,
        data.hsn && `• HSN/TSN: ${data.hsn}`,
      ].filter(Boolean);
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
    });
    form.addEventListener("input", (e) => e.target.classList.remove("is-invalid"));
  }

  /* ---------- Einblenden beim Scrollen ---------- */
  const rev = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((en, i) => {
        if (en.isIntersecting) {
          en.target.style.transitionDelay = `${(i % 4) * 70}ms`;
          en.target.classList.add("is-in");
          ro.unobserve(en.target);
        }
      });
    }, { threshold: .15 });
    rev.forEach((el) => ro.observe(el));
  } else {
    rev.forEach((el) => el.classList.add("is-in"));
  }

  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
})();
