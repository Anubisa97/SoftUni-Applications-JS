import { html } from "../node_modules/lit-html/lit-html.js";
import { api } from "../src/api.js";
import { dataService } from "../src/dataServices.js";

const addTemp = () => html`
  <section id="create">
    <div class="form">
      <img class="border" src="./images/border.png" alt="" />
      <h2>Add Character</h2>
      <form @submit=${submitHandler} class="create-form">
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Character Type"
        />
        <input
          type="text"
          name="image-url"
          id="image-url"
          placeholder="Image URL"
        />
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          rows="2"
          cols="10"
        ></textarea>
        <textarea
          id="additional-info"
          name="additional-info"
          placeholder="Additional Info"
          rows="2"
          cols="10"
        ></textarea>
        <button type="submit">Add Character</button>
      </form>
      <img class="border" src="./images/border.png" alt="" />
    </div>
  </section>
`;

let context = "";
export function addView(ctx) {
  context = ctx;
  context.render(addTemp());
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
  debugger;
  if (!category || !imageUrl || !description || !moreInfo) {
    return window.alert("Missing input");
  }

  await dataService.createCharacter({
    category,
    imageUrl,
    description,
    moreInfo,
  });
  context.goTo("/dashboard");
}
