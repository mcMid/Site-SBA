// Événements de conversion pour Plausible (chargé seulement si configuré).
// Tout élément portant data-event="Nom" envoie cet événement au clic ;
// le formulaire de demande envoie « Demande » à l'envoi.
(function () {
  function send(name, props) {
    if (window.plausible) window.plausible(name, props ? { props: props } : undefined);
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-event]');
    if (el) send(el.getAttribute('data-event'));
    var a = e.target.closest && e.target.closest('a[href^="/demande/"]');
    if (a) send('CTA demande', { depuis: location.pathname, texte: a.textContent.trim().slice(0, 40) });
  });
  document.addEventListener('submit', function (e) {
    if (e.target.getAttribute('name') === 'demande') {
      var offre = e.target.querySelector('input[name="offre"]:checked');
      send('Demande', { offre: offre ? offre.value : 'inconnue' });
    }
  });
})();
