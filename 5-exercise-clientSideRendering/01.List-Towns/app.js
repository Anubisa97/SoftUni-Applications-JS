import { html, render } from "../node_modules/lit-html/lit-html.js";

const root = document.getElementById("root");
const form = document.querySelector("form");
form.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const inputData = Object.fromEntries(formData);
  const towns = inputData.towns.split(", ");
  render(listTemp(towns), root);
}

function listTemp(town) {
  return html`
    <ul>
      ${town.map((town) => html`<li>${town}</li>`)}
    </ul>
  `;
}
