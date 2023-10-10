'use strict';

(function() {
  window.addEventListener('load', init);

  function init() {
    document.getElementById("search_form").addEventListener("submit", function(event) {
      event.preventDefault();

      getSearch(document.getElementById('search').value);
    });
  }

  function getSearch(search) {
    let params = new FormData();
    params.append("search", search);

    fetch("/searchchallenge", {method: "POST", body: params})
      .then(statusCheck)
      .then((resp) => resp.text())
      .then(function(resp) {

        if (document.getElementById("output_field").childNodes.length > 0) {
          document.getElementById("output_field").innerHTML = "";
        }

        document.getElementById('output_field').appendChild(tableCreator(resp));
      })
      .catch((resp) => document.getElementById("output_field").textContent = resp);
  }

  function tableCreator(resp) {
    let table = document.createElement("table");

    table.setAttribute("id", "sql_table");
    let header = document.createElement("tr");

    let header0 = document.createElement("td");
    header0.textContent = "Search";
    let header1 = document.createElement("td");
    header1.textContent = "Answer";

    header.appendChild(header0);

    header.appendChild(header1);

    table.appendChild(header);

    let searchList = JSON.parse(resp);

    for (let i = 0; i < searchList.length; i++) {
      let row = document.createElement("tr");

      let search = document.createElement("td");
      search.textContent = searchList[i]["search"];
      let answer = document.createElement("td");
      answer.textContent = searchList[i]["answer"];
      row.appendChild(search);
      row.appendChild(answer);

      table.appendChild(row);
    }

    if (searchList.length === 0) {
      table.innerHTML = "";
    }

    return table;
  }

  async function statusCheck(resp) {
    if (!resp.ok) {
      throw new Error(await resp.text());
    }

    return resp;
  }

})();
