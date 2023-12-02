import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../src/dataService.js";

const searchTemp = (data, isResult) => html` <section id="search">
  <div class="form">
    <h2>Search</h2>
    <form @submit=${submitHandler} class="search-form">
      <input type="text" name="search" id="search-input" />
      <button class="button-list">Search</button>
    </form>
  </div>
  <h4>Results:</h4>
  ${isResult && resultTemp(data)}
  </div>
</section>`;

const resultTemp = (items) =>
  html`
    <div class="search-result">
      ${items.length === 0
        ? html` <p class="no-result">No result.</p>`
        : items.map((item) => fruitTemp(item))}
    </div>
  `;

const fruitTemp = (item) =>
  html`<div class="fruit">
    <img src="${item.imageUrl}" alt="example1" />
    <h3 class="title">${item.name}</h3>
    <p class="description">${item.description}</p>
    <a class="details-btn" href="/details/${item._id}">More Info</a>
  </div>`;

let context = "";
export function showSearch(ctx) {
  context = ctx;
  searchManager();
}

async function submitHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { search } = Object.fromEntries(formData);

  if (!search) {
    return window.alert("You need to search something");
  }

  searchManager(search);
}

async function searchManager(query) {
  if (query) {
    const data = await dataService.search(query);
    return context.render(searchTemp(data, true));
  }
  context.render(searchTemp());
}
