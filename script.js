/* ==========================================================================
   TEREA TAHTAKALE — Ortak Etkileşim & Ürün Verisi
   ========================================================================== */

const WHATSAPP_NUMBER = "905367650212";

/* ---------- Ürün verisi ----------
   Görseller "images/" klasöründen okunur. Her ürünün fotoğrafını bilgisayarınızdan
   bu klasöre, burada yazan dosya adıyla birebir aynı şekilde yüklemeniz yeterli.
------------------------------------------------------------------------- */

const PRODUCTS = [
  // ---- TEREA çeşitleri ----
  t("ter-01", "Terea Purple Wave Kıbrıs", 2700, ["terea-purple-wave-kibris.jpeg"]),
  t("ter-02", "Terea Amber Kıbrıs", 2700, ["terea-amber-kibris.jpeg"]),
  t("ter-03", "Terea Purple Kıbrıs", 2700, ["terea-purple-kibris.jpeg"]),
  t("ter-04", "Terea Sienna Avrupa", 2500, ["terea-sienna-avrupa-1.jpeg", "terea-sienna-avrupa-2.jpeg"]),
  t("ter-05", "Terea Yellow Avrupa", 2500, ["terea-yellow-avrupa.jpeg"]),
  t("ter-06", "Terea Purple Avrupa", 2500, ["terea-purple-avrupa.jpeg"]),
  t("ter-07", "Terea Amber Avrupa", 2500, ["terea-amber-avrupa-1.jpeg", "terea-amber-avrupa-2.jpeg"]),
  t("ter-08", "Terea Sienna Avrupa", 2300, ["terea-sienna-avrupa.jpeg"]),
  t("ter-09", "Terea Amelia Pearl Avrupa", 2500, ["terea-amelia-pearl-avrupa.jpeg"]),
  t("ter-10", "Terea Silver Avrupa", 2500, ["terea-silver-avrupa.jpeg"]),
  t("ter-11", "Terea Teak Avrupa", 2500, ["terea-teak-avrupa.jpeg"]),
  t("ter-12", "Terea Sun Pearl Avrupa", 2500, ["terea-sun-pearl-avrupa.jpeg"]),
  t("ter-13", "Terea Menthol Avrupa", 2500, ["terea-menthol-avrupa.jpeg"]),
  t("ter-14", "Terea Teak Dubai", 2300, ["terea-teak-dubai.jpeg"]),
  t("ter-15", "Terea Amber Dubai", 2300, ["terea-amber-dubai.jpeg"]),
  t("ter-16", "Terea Sienna Dubai", 2300, ["terea-sienna-dubai.jpeg"]),
  t("ter-17", "Terea Purple Dubai", 2300, ["terea-purple-dubai.jpeg"]),
  t("ter-18", "Terea Menthol Dubai", 2300, ["terea-menthol-dubai.jpeg"]),
  t("ter-19", "Terea Silver Dubai", 2300, ["terea-silver-dubai.jpeg"]),

  // ---- IQOS cihazları ----
  d("iqo-01", "IQOS ILUMA İ Prime", 5750, ["iqos-iluma-i-prime-1.png", "iqos-iluma-i-prime-2.png", "iqos-iluma-i-prime-3.png"]),
  d("iqo-02", "IQOS ILUMA İ", 3750, ["iqos-iluma-i-1.png", "iqos-iluma-i-2.png", "iqos-iluma-i-3.png", "iqos-iluma-i-4.png", "iqos-iluma-i-5.png"]),
  d("iqo-03", "IQOS ILUMA İ ONE", 2750, ["iqos-iluma-i-one-1.webp", "iqos-iluma-i-one-2.webp", "iqos-iluma-i-one-3.webp", "iqos-iluma-i-one-4.webp", "iqos-iluma-i-one-5.webp"]),
  d("iqo-04", "IQOS ILUMA Prime", 5750, ["iqos-iluma-prime.png"]),
];

function t(id, name, price, images) {
  return { id, name, kind: "terea", kindLabel: "TEREA", price, images };
}
function d(id, name, price, images) {
  return { id, name, kind: "iqos", kindLabel: "IQOS Cihaz", price, images };
}

function imgSrc(file) {
  return `images/${file}`;
}

function priceFmt(n) {
  return n.toLocaleString("tr-TR") + " ₺";
}

/* ---------- WhatsApp linki ---------- */

function waLink(productName) {
  const msg = productName
    ? `Merhaba, ${productName} ürünü hakkında bilgi almak istiyorum.`
    : "Merhaba, ürünleriniz hakkında bilgi almak istiyorum.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/* ---------- Kart üretimi ---------- */

function productCardHTML(product) {
  const cover = imgSrc(product.images[0]);
  return `
  <article class="product-card" data-id="${product.id}" data-kind="${product.kind}">
    <div class="thumb">
      <span class="tag">${product.kindLabel}</span>
      <img src="${cover}" alt="${product.name}" loading="lazy" onerror="this.closest('.thumb').classList.add('img-missing')" />
    </div>
    <div class="info">
      <div class="kind">${product.kindLabel}</div>
      <h3>${product.name}</h3>
      <div class="price">${priceFmt(product.price)}</div>
    </div>
  </article>`;
}

/* ---------- Modal ---------- */

let activeImageIndex = 0;

function openProductModal(product) {
  activeImageIndex = 0;
  const overlay = document.getElementById("productModal");
  if (!overlay) return;

  renderModal(product);
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function renderModal(product) {
  const overlay = document.getElementById("productModal");
  const hasGallery = product.images.length > 1;
  const mainSrc = imgSrc(product.images[activeImageIndex]);

  const thumbs = hasGallery
    ? product.images
        .map(
          (file, i) =>
            `<span class="thumb-swatch ${i === activeImageIndex ? "active" : ""}" data-index="${i}">
               <img src="${imgSrc(file)}" alt="${product.name} görsel ${i + 1}" onerror="this.parentElement.style.display='none'" />
             </span>`
        )
        .join("")
    : "";

  overlay.querySelector(".modal").innerHTML = `
    <button class="modal-close" aria-label="Kapat" id="modalCloseBtn">✕</button>
    <div class="modal-visual">
      <img src="${mainSrc}" alt="${product.name}" onerror="this.style.display='none'; this.parentElement.classList.add('img-missing')" />
    </div>
    <div class="modal-body">
      <div class="kind">${product.kindLabel}</div>
      <h3>${product.name}</h3>
      <div class="price">${priceFmt(product.price)}</div>
      ${hasGallery ? `<div class="variant-label">Fotoğraflar</div><div class="variant-swatches" id="variantSwatches">${thumbs}</div>` : ""}
      <a class="btn modal-order-btn" target="_blank" rel="noopener" href="${waLink(product.name)}">
        ${waIcon()} WhatsApp'tan Sipariş Ver
      </a>
    </div>
  `;

  overlay.querySelector("#modalCloseBtn").addEventListener("click", closeProductModal);

  if (hasGallery) {
    overlay.querySelectorAll(".thumb-swatch").forEach((sw) => {
      sw.addEventListener("click", () => {
        activeImageIndex = parseInt(sw.dataset.index, 10);
        renderModal(product);
      });
    });
  }
}

function closeProductModal() {
  const overlay = document.getElementById("productModal");
  if (!overlay) return;
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

function waIcon() {
  return `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.16c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.83-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.15.12.32.02.52-.1.19-.15.31-.3.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.15.48.22.55.34.07.13.07.75-.17 1.43z"/></svg>`;
}

/* ---------- Sayfa başlatma ---------- */

document.addEventListener("DOMContentLoaded", () => {
  // Mobil nav
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  }

  // WhatsApp FAB linkini güncelle
  document.querySelectorAll(".whatsapp-fab").forEach((btn) => {
    btn.href = waLink();
  });

  // Ana sayfa carousel
  const carousel = document.getElementById("featuredCarousel");
  if (carousel) {
    const featuredIds = ["ter-01", "iqo-01", "ter-04", "ter-09", "ter-13", "iqo-03", "iqo-02", "ter-19"];
    carousel.innerHTML = featuredIds
      .map((id) => productCardHTML(PRODUCTS.find((pr) => pr.id === id)))
      .join("");

    document.getElementById("carouselPrev")?.addEventListener("click", () => {
      carousel.scrollBy({ left: -280, behavior: "smooth" });
    });
    document.getElementById("carouselNext")?.addEventListener("click", () => {
      carousel.scrollBy({ left: 280, behavior: "smooth" });
    });

    carousel.addEventListener("click", (e) => {
      const card = e.target.closest(".product-card");
      if (card) window.location.href = `magaza.html?p=${card.dataset.id}`;
    });
  }

  // Mağaza grid
  const grid = document.getElementById("productGrid");
  if (grid) {
    const chips = document.querySelectorAll(".chip");
    const countEl = document.getElementById("resultsCount");

    function renderGrid(filter) {
      const list = filter === "all" ? PRODUCTS : PRODUCTS.filter((pr) => pr.kind === filter);
      grid.innerHTML = list.map(productCardHTML).join("");
      if (countEl) countEl.textContent = `${list.length} ürün listeleniyor`;
    }

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        renderGrid(chip.dataset.filter);
      });
    });

    renderGrid("all");

    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".product-card");
      if (card) {
        const product = PRODUCTS.find((pr) => pr.id === card.dataset.id);
        if (product) openProductModal(product);
      }
    });

    document.getElementById("modalOverlayBg")?.addEventListener("click", (e) => {
      if (e.target.id === "modalOverlayBg" || e.target.id === "productModal") closeProductModal();
    });
    document.getElementById("productModal")?.addEventListener("click", (e) => {
      if (e.target.id === "productModal") closeProductModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeProductModal();
    });

    // URL parametresiyle direkt ürün açma (carousel'den gelindiğinde)
    const params = new URLSearchParams(window.location.search);
    const directId = params.get("p");
    if (directId) {
      const product = PRODUCTS.find((pr) => pr.id === directId);
      if (product) openProductModal(product);
    }
  }

  // Blog accordion
  document.querySelectorAll(".blog-card .read-more").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".blog-card");
      card.classList.toggle("open");
      btn.textContent = card.classList.contains("open") ? "Daralt ↑" : "Devamını Oku ↓";
    });
  });
});
