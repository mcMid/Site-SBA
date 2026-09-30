// Hero à expansion. Tant que la maquette n'est pas ouverte, la molette, le
// doigt et le clavier font avancer --p (0 → 1) au lieu de faire défiler la
// page. Le début de --p ne fait qu'apparaître la maquette ; l'ouverture
// suit (voir --e dans global.css). Une fois ouverte, la page défile
// normalement ; remonter tout en haut referme la maquette. Tout le rendu
// est en CSS (voir .xh dans global.css).
//
// On ne verrouille jamais le défilement quand :
//   - le visiteur préfère réduire les animations ;
//   - la page s'ouvre déjà défilée ou sur une ancre (#offres…) ;
//   - il clique un lien interne ou le lien d'évitement.
(function () {
  var hero = document.querySelector('[data-expand-hero]');
  if (!hero) return;

  var p = 0;
  var open = false;
  var touchY = 0;

  function set(v) {
    p = Math.min(Math.max(v, 0), 1);
    hero.style.setProperty('--p', p.toFixed(4));
    // Le bouton sur la maquette n'est cliquable qu'une fois visible.
    hero.classList.toggle('is-open', p >= 0.55);
    if (p >= 1) open = true;
  }
  function openNow() { set(1); open = true; }

  // Au rechargement, le navigateur restaure la position de défilement : la
  // page ne serait plus en haut et l'animation sauterait. Sans ancre, on
  // repart du haut pour la rejouer.
  if (!location.hash && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }

  if (matchMedia('(prefers-reduced-motion: reduce)').matches || location.hash || window.scrollY > 5) {
    openNow();
    return;
  }

  function locked() { return !open; }

  window.addEventListener('wheel', function (e) {
    if (open && e.deltaY < 0 && window.scrollY <= 5) { open = false; e.preventDefault(); return; }
    if (locked()) { e.preventDefault(); set(p + e.deltaY * 0.0009); }
  }, { passive: false });

  window.addEventListener('touchstart', function (e) { touchY = e.touches[0].clientY; }, { passive: true });
  window.addEventListener('touchmove', function (e) {
    if (!touchY) return;
    var y = e.touches[0].clientY;
    var d = touchY - y;
    if (open && d < -20 && window.scrollY <= 5) { open = false; e.preventDefault(); }
    else if (locked()) { e.preventDefault(); set(p + d * (d < 0 ? 0.008 : 0.005)); touchY = y; }
  }, { passive: false });
  window.addEventListener('touchend', function () { touchY = 0; });

  // Clavier : mêmes touches que pour défiler.
  window.addEventListener('keydown', function (e) {
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    var fwd = ['ArrowDown', 'PageDown', ' ', 'End'].indexOf(e.key) !== -1;
    var back = ['ArrowUp', 'PageUp', 'Home'].indexOf(e.key) !== -1;
    if (locked() && fwd) { e.preventDefault(); set(e.key === 'End' ? 1 : p + 0.2); }
    else if (locked() && back) { e.preventDefault(); set(p - 0.2); }
    else if (open && back && window.scrollY <= 5) { e.preventDefault(); open = false; set(p - 0.2); }
  });

  window.addEventListener('scroll', function () { if (locked()) window.scrollTo(0, 0); });

  // Ancres et lien d'évitement : on ouvre, puis on laisse le navigateur défiler.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="#"]');
    if (!a) return;
    var url = new URL(a.href, location.href);
    if (url.pathname === location.pathname && url.hash) openNow();
  }, true);
  window.addEventListener('hashchange', openNow);
})();
