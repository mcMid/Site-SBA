// Chargé de façon bloquante dans <head> : le thème est posé avant le premier
// rendu, donc pas de flash clair → sombre. Sombre par défaut, le choix du
// visiteur est mémorisé. (Fichier externe : la CSP interdit les scripts en ligne.)
(function () {
  var KEY = 'theme';
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === 'light') root.setAttribute('data-theme', 'light');

  function sync(btn) {
    var light = root.getAttribute('data-theme') === 'light';
    btn.setAttribute('aria-pressed', String(light));
    btn.setAttribute('aria-label', light ? 'Passer en mode sombre' : 'Passer en mode clair');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', light ? '#f4f1ea' : '#0b0c0e');
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
