import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { get } from "../src/api.js";
import { userData } from "../src/userDataHelper.js";

const root = document.querySelector(".container");

const myFurnitureTemp = (data) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>My Furniture</h1>
      <p>This is a list of your publications.</p>
    </div>
  </div>
  <div class="row space-top">${data.map((card) => cardTemp(card))}</div>
`;

const cardTemp = (data) => html` <div class="col-md-4">
  <div class="card text-white bg-primary">
    <div class="card-body">
      <img src="${data.img}" />
      <p>${data.description}</p>
      <footer>
        <p>Price: <span>${data.price} $</span></p>
      </footer>
      <div>
        <a href="/details/${data._id}" class="btn btn-info">Details</a>
      </div>
    </div>
  </div>
</div>`;

export async function myFurnitureView(e) {
  const userId = userData.getUserId();
  const data = await get(`data/catalog?where=_ownerId%3D%22${userId}%22`);
  render(myFurnitureTemp(data), root);
}
