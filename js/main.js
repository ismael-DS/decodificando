
/* ========================================
   MENU RESPONSIVO
   ======================================== */

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (menuToggle && primaryNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

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


/* ========================================
   ANO AUTOMÁTICO DO RODAPÉ
   ======================================== */

const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* ========================================
   POLÍTICA — NAVEGAÇÃO DOS TEXTOS AUTORAIS
   ======================================== */

/**
 * Identifica todos os artigos da página.
 * Outras páginas do site não são afetadas.
 */
function obterArtigosPoliticos() {
  return document.querySelectorAll(".article-reading");
}


/**
 * Abre o artigo correspondente ao cartão clicado.
 *
 * Exemplo de chamada no HTML:
 * abrirArtigo(event, 'artigo-eleitoral')
 * abrirArtigo(event, 'artigo-flavio')
 * abrirArtigo(event, 'artigo-lula')
 */
function abrirArtigo(event, id) {
  if (event) event.preventDefault();

  const lista = document.getElementById("lista-textos");
  const artigos = obterArtigosPoliticos();
  const artigoSelecionado = document.getElementById(id);

  if (!lista || !artigoSelecionado) {
    console.error("Não foi possível encontrar o artigo:", id);
    return;
  }

  // Fecha todos os artigos antes de abrir o selecionado.
  artigos.forEach((artigo) => {
    artigo.hidden = true;
  });

  // Esconde a lista de cartões.
  lista.hidden = true;

  // Exibe somente o artigo escolhido.
  artigoSelecionado.hidden = false;

  // Atualiza a URL para permitir acesso direto ao artigo.
  history.pushState(
    { artigo: id },
    "",
    "#" + id
  );

  window.scrollTo({
    top: 0,
    behavior: "auto"
  });
}


/**
 * Fecha os artigos e retorna à lista de textos.
 */
function voltarArtigos() {
  const lista = document.getElementById("lista-textos");

  if (!lista) return;

  obterArtigosPoliticos().forEach((artigo) => {
    artigo.hidden = true;
  });

  lista.hidden = false;

  history.pushState(
    {},
    "",
    window.location.pathname + window.location.search
  );

  window.scrollTo({
    top: 0,
    behavior: "auto"
  });
}


/**
 * Sincroniza a página com o fragmento da URL.
 * Funciona ao carregar, atualizar ou navegar pelo histórico.
 */
function sincronizarArtigo() {
  const lista = document.getElementById("lista-textos");
  const artigos = obterArtigosPoliticos();

  // As outras páginas do site não possuem a lista de textos.
  if (!lista || artigos.length === 0) return;

  const hash = decodeURIComponent(window.location.hash.slice(1));

  // Procura o artigo indicado na URL.
  const artigoSelecionado = Array.from(artigos).find(
    (artigo) => artigo.id === hash
  );

  if (artigoSelecionado) {
    // Abre o artigo solicitado e fecha os demais.
    artigos.forEach((artigo) => {
      artigo.hidden = artigo !== artigoSelecionado;
    });

    lista.hidden = true;
  } else {
    // Sem um artigo válido na URL, exibe a lista.
    artigos.forEach((artigo) => {
      artigo.hidden = true;
    });

    lista.hidden = false;
  }
}


/* ========================================
   EVENTOS DE NAVEGAÇÃO
   ======================================== */

// Botões voltar/avançar do navegador.
window.addEventListener("popstate", sincronizarArtigo);

// Carregamento inicial da página.
document.addEventListener("DOMContentLoaded", sincronizarArtigo);

// Compatibilidade com navegação por fragmentos da URL.
window.addEventListener("hashchange", sincronizarArtigo);
