'use strict';

(function() {
  window.addEventListener('load', init);

  function init() {
    document.getElementById("search_form").addEventListener("submit", async function(event) {
      event.preventDefault();
      await getSearch(document.getElementById('search').value);
    });
  }

  async function getSearch(search) {
    let params = new FormData;
    params.append("search", search);

    fetch("/searchchallenge", {method: "POST", body: params})
      .then(statusCheck)
      .then(resp => resp.text())
      .then(function(resp) {
        console.log(resp);
        document.getElementById('output_field').textContent = resp;
      })
      .catch(resp => document.getElementById("output_field").textContent = resp);
  }

  async function statusCheck(resp) {
    if (!resp.ok) {
      throw new Error(await resp.text());
    }
    return resp;
  }
})();