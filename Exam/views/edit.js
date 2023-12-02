import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../src/dataServices.js";

const editTemp = (data) =>
  html`
    <section id="edit">
      <div class="form">
        <img class="border" src="./images/border.png" alt="" />
        <h2>Edit Character</h2>
        <form @submit=${submitHandler} class="edit-form">
          <input
            type="text"
            name="category"
            id="category"
            value=${data.category}
            placeholder="Character Type"
          />
          <input
            type="text"
            name="image-url"
            id="image-url"
            value=${data.imageUrl}
            placeholder="Image URL"
          />
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="2"
            cols="10"
          >
${data.description}</textarea
          >
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="2"
            cols="10"
          >
${data.moreInfo}</textarea
          >
          <button type="submit">Edit</button>
        </form>
        <img class="border" src="./images/border.png" alt="" />
      </div>
    </section>
  `;

let id = "";
let context = "";
export async function editView(ctx) {
  context = ctx;
  id = ctx.params.id;
  const data = await dataService.getSingleCharacter(id);
  ctx.render(editTemp(data));
}

async function submitHandler(e) {
  e.preventDefault();
  const fromData = new FormData(e.target);
  const {
    category,
    "image-url": imageUrl,
    description,
    "additional-info": moreInfo,
  } = Object.fromEntries(fromData);
  if (!category || !imageUrl || !description || !moreInfo) {
    return window.alert("Missing input");
  }
  debugger;
  await dataService.updateCharacter(id, {
    category,
    imageUrl,
    description,
    moreInfo,
  });
  context.goTo(`/details/${id}`);
}
