import { userInfo } from "../api/userHelper.js";
import { createIdea } from "../api/data.js";

const create = document.getElementById("createView");
const form = create.querySelector("form");
form.addEventListener("submit", onSubmit);

let context = null;
export function showCreate(ctx) {
  context = ctx;
  ctx.renderer(create);
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const { title, description, imageURL } = Object.fromEntries(formData);

  if (title.length < 6 || description.length < 10 || imageURL.length < 4) {
    return alert("error");
  }
  const userId = userInfo("get")._id;
  createIdea({ title, description, imageURL, userId });
  form.reset();
  context.goTo("/");
}
