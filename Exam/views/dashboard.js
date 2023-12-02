import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../src/dataServices.js";

const dashboardTemp = (data) => html`
  <h2>Characters</h2>
  ${data.length > 0
    ? html`
        <section id="characters">
          ${data.map((char) => characterCard(char))}
        </section>
      `
    : html`<h2>No added Heroes yet.</h2>`}
`;

const characterCard = (data) => html`
  <div class="character">
    <img src=".${data.imageUrl}" alt="example3" />
    <div class="hero-info">
      <h3 class="category">${data.category}</h3>
      <p class="description">${data.description}</p>
      <a class="details-btn" href="/details/${data._id}">More Info</a>
    </div>
  </div>
`;

export async function dashboardView(ctx) {
  const data = await dataService.getAllCharacters();

  ctx.render(dashboardTemp(data));
}
