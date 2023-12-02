import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../src/dataService.js";

const editTemp = (data) => html` <section id="edit">
  <div class="form">
    <h2>Edit Fruit</h2>
    <form class="edit-form" @submit=${submitHandler}>
      <input
        type="text"
        name="name"
        id="name"
        value=${data.name}
        placeholder="Fruit Name"
      />
      <input
        type="text"
        name="imageUrl"
        id="Fruit-image"
        value=${data.imageUrl}
        placeholder="Fruit Image URL"
      />
      <textarea
        id="fruit-description"
        name="description"
        placeholder="Description"
        rows="10"
        cols="50"
      >
${data.description}</textarea
      >
      <textarea
        id="fruit-nutrition"
        name="nutrition"
        placeholder="Nutrition"
        rows="10"
        cols="50"
      >
${data.nutrition}</textarea
      >
      <button type="submit">post</button>
    </form>
  </div>
</section>`;

let id = "";
let context = "";
export async function showEdit(ctx) {
  context = ctx;
  id = ctx.params.id;
  const data = await dataService.getSingleFruit(id);
  ctx.render(editTemp(data));
}

async function submitHandler(e) {
  e.preventDefault();
  const fromData = new FormData(e.target);
  const { name, imageUrl, description, nutrition } =
    Object.fromEntries(fromData);
  if (!name || !imageUrl || !description || !nutrition) {
    return window.alert("Missing input");
  }

  await dataService.updateFruit(id, { name, imageUrl, description, nutrition });
  context.goTo(`/details/${id}`);
}
