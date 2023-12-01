import { html, render } from "../node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

const root = document.getElementById("towns");
const button = document
  .querySelector("button")
  .addEventListener("click", search);
listTemplate(towns);

function listTemplate(towns, matches) {
  const temp = html`
    <ul>
      ${towns.map((town) => createTemplate(town, matches))}
    </ul>
  `;
  render(temp, root);
}

function createTemplate(town, matches) {
  return html`<li class=${matches?.includes(town) ? "active" : ""}>
    ${town}
  </li>`;
}

function update(matches) {
  const matchOrMatches = matches.length > 1 ? "matches found" : "match found";
  const text = matches.length > 0 ? `${matches.length} ${matchOrMatches}` : "";
  document.getElementById("result").textContent = text;
  listTemplate(towns, matches);
}

function search(e) {
  const searchText = document.getElementById("searchText");
  const text = searchText.value;
  const matches = towns.filter((town) => town.includes(text));
  update(matches);
}
