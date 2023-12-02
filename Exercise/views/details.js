import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../src/dataService.js";
import { userHelper } from "../src/userHelper.js";

const detailsTemp = (data, isOwner) => html` <section id="details">
  <div id="details-wrapper">
    <img id="details-img" src="..${data.imageUrl}" alt="example1" />
    <p id="details-title">${data.name}</p>
    <div id="info-wrapper">
      <div id="details-description">
        <p>${data.description}</p>
        <p id="nutrition">Nutrition</p>
        <p id="details-nutrition">${data.nutrition}</p>
      </div>
      ${isOwner
        ? html`<div id="action-buttons">
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a @click=${delFruit} href="javascript:void(0)" id="delete-btn"
              >Delete</a
            >
          </div>`
        : ""}
    </div>
  </div>
</section>`;

let id = "";
let context = "";
export async function showDetails(ctx) {
  id = ctx.params.id;
  context = ctx;
  const data = await dataService.getSingleFruit(id);
  const isOwner = userHelper.getUserID() === data._ownerId;
  ctx.render(detailsTemp(data, isOwner));
}

async function delFruit() {
  await dataService.delFruit(id);
  context.goTo("/dashboard");
}
