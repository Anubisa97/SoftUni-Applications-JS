import { html, render } from "../node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

const section = document.getElementById("allCats");

const list = html`
  <ul>
    ${cats.map((cat) => cardTemplate(cat))}
  </ul>
`;
render(list, section);

function onClick(e) {
  const button = e.target;
  const div = button.parentElement.children[1];
  const state = div.style.display;
  div.style.display = state === "none" ? "block" : "none";
  button.textContent =
    state === "none" ? "Hide status code" : "Show status code";
}

function cardTemplate(cat) {
  return html`<li>
    <img
      src="./images/${cat.imageLocation}.jpg"
      width="250"
      height="250"
      alt="Card image cap"
    />
    <div class="info">
      <button class="showBtn" @click=${onClick}>Show status code</button>
      <div class="status" style="display: none" id="${cat.id}">
        <h4>Status Code: ${cat.statusCode}</h4>
        <p>${cat.statusMessage}</p>
      </div>
    </div>
  </li>`;
}
