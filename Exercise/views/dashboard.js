import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../src/dataService.js";

const dashboardTemp = (fruit) => html`<h2>Fruits</h2>
  ${fruit.length > 0
    ? html` <section id="dashboard">
        ${fruit.map((fruit) => fruitCard(fruit))}
      </section>`
    : html` <h2>No fruit info yet.</h2>`} `;

const fruitCard = (data) => html` <div class="fruit">
  <img src=".${data.imageUrl}" alt="example1" />
  <h3 class="title">${data.name}</h3>
  <p class="description">${data.description}</p>
  <a class="details-btn" href="/details/${data._id}">More Info</a>
</div>`;

export async function showDashboard(ctx) {
  const data = await dataService.getAllFruits();
  ctx.render(dashboardTemp(data));
}
