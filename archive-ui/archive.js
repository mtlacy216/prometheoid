async function loadArchive() {
  const res = await fetch('../team-operations-archive.json');
  return res.json();
}

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}
