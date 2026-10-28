const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (menuToggle && primaryNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    primaryNav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) closeMenu();
  });
}

const yearElement = document.querySelector("#current-year");
if (yearElement) yearElement.textContent = new Date().getFullYear();


/* ========================================
   POLÍTICA — NAVEGAÇÃO DOS TEXTOS AUTORAIS
   ======================================== */

function abrirArtigo(event) {
  event.preventDefault();

  document.getElementById("lista-textos").hidden = true;
  document.getElementById("artigo-eleitoral").hidden = false;

  history.pushState(
    { artigo: "analise-eleitoral" },
    "",
    "#analise-eleitoral"
  );

  window.scrollTo({ top: 0, behavior: "auto" });
}

function voltarArtigos() {
  document.getElementById("artigo-eleitoral").hidden = true;
  document.getElementById("lista-textos").hidden = false;

  history.pushState(
    {},
    "",
    window.location.pathname + window.location.search
  );

  window.scrollTo({ top: 0, behavior: "auto" });
}

function sincronizarArtigo() {
  const lista = document.getElementById("lista-textos");
  const artigo = document.getElementById("artigo-eleitoral");

  // Outras páginas do site não possuem esses elementos.
  if (!lista || !artigo) return;

  const artigoAberto = window.location.hash === "#analise-eleitoral";

  lista.hidden = artigoAberto;
  artigo.hidden = !artigoAberto;
}

window.addEventListener("popstate", sincronizarArtigo);
window.addEventListener("DOMContentLoaded", sincronizarArtigo);
