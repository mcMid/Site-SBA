// Présélectionne l'offre quand on arrive depuis un bouton « Demander l'offre … ».
(function () {
  var id = new URLSearchParams(location.search).get('offre');
  if (!id || !/^[a-z]+$/.test(id)) return;
  var radio = document.getElementById('offre-' + id);
  if (radio) radio.checked = true;
})();
