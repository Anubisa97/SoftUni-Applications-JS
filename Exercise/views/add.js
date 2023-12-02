import { html } from "../node_modules/lit-html/lit-html.js";
import { api } from "../src/api.js";

const addTemp = () => html` <section id="create">
  <div class="form">
    <h2>Add Fruit</h2>
    <form @submit=${submitHandler} class="create-form">
      <input type="text" name="name" id="name" placeholder="Fruit Name" />
      <input
        type="text"
        name="imageUrl"
        id="Fruit-image"
        placeholder="Fruit Image"
      />
      <textarea
        id="fruit-description"
        name="description"
        placeholder="Description"
        rows="10"
        cols="50"
      ></textarea>
      <textarea
        id="fruit-nutrition"
        name="nutrition"
        placeholder="Nutrition"
        rows="10"
        cols="50"
      ></textarea>
      <button type="submit">Add Fruit</button>
    </form>
  </div>
</section>`;

let context = "";
export function showAdd(ctx) {
  ctx.render(addTemp());
  context = ctx;
}

async function submitHandler(e) {
  e.preventDefault();
  const fromData = new FormData(e.target);
  const { name, imageUrl, description, nutrition } =
    Object.fromEntries(fromData);

  if (!name || !imageUrl || !description || !nutrition) {
    return window.alert("Missing input");
  }

  await api.post("/data/fruits", { name, imageUrl, description, nutrition });
  context.goTo("/dashboard");
}
