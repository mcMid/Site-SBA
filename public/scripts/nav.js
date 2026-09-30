// Menu sous 860 px. Au-dessus, la navigation est toujours visible et ce bouton est masqué.
(function () {
  var btn = document.querySelector('[data-nav-toggle]');
  var nav = document.getElementById('nav');
  if (!btn || !nav) return;

  function set(open) {
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  }

  btn.addEventListener('click', function () {
    set(btn.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) set(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') set(false);
  });
  window.addEventListener('resize', function () {
    if (window.matchMedia('(min-width: 860px)').matches) set(false);
  });
})();
