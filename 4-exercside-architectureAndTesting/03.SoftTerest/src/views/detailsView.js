import { getIdeaById } from "../api/data.js";
import { userInfo } from "../api/userHelper.js";

const details = document.getElementById("detailsView");

export async function showDetails(ctx, params) {
  const idea = await getIdeaById(params[0]);
  const user = userInfo("get");
  const isOwner = user._id === idea._ownerId;
  details.innerHTML = createTemp(idea, isOwner);
  details.querySelector("a").addEventListener("click", onRemove);
  ctx.renderer(details);
}

function onRemove(e) {
  e.preventDefault();
  debugger;
  const id = e.target.dataset.id;
  context.goTo("/details", id);
}

function createTemp(idea, isOwner) {
  return `
  <img class="det-img" src="${idea.img}" />
        <div class="desc">
          <h2 class="display-5">${idea.title}</h2>
          <p class="infoType">Description:</p>
          <p class="idea-description">${idea.description}</p>
        </div>
        <div class="text-center">
        ${isOwner ? `<a class="btn detb" href="">Delete</a>` : ""}  
        </div>`;
}
