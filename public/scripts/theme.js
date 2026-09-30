// Chargé de façon bloquante dans <head> : le thème est posé avant le premier
// rendu, donc pas de flash clair → sombre. Sombre par défaut, le choix du
// visiteur est mémorisé. (Fichier externe : la CSP interdit les scripts en ligne.)
(function () {
  var KEY = 'theme';
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === 'light') root.setAttribute('data-theme', 'light');

  // La maquette du hero part invisible. Classe posée ici, avant le premier
  // pixel : un script dans la page serait bloqué par la CSP. Pas de classe
  // si l'animation ne jouera pas (mouvement réduit, ouverture sur une ancre).
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && !location.hash) {
    root.classList.add('scrub');
  }

  function sync(btn) {
    var light = root.getAttribute('data-theme') === 'light';
    btn.setAttribute('aria-pressed', String(light));
    btn.setAttribute('aria-label', light ? 'Passer en mode sombre' : 'Passer en mode clair');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', light ? '#e7f3f4' : '#07090f');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    sync(btn);
    btn.addEventListener('click', function () {
      var light = root.getAttribute('data-theme') !== 'light';
      if (light) root.setAttribute('data-theme', 'light');
      else root.removeAttribute('data-theme');
      try { localStorage.setItem(KEY, light ? 'light' : 'dark'); } catch (e) {}
      sync(btn);
    });
  });
})();
