import { getAllIdeas } from "../api/data.js";

const dashboard = document.getElementById("dashboard-holder");
let context = null;

export async function showDashboard(ctx) {
  dashboard.innerHTML = "";
  context = ctx;
  const ideas = await getAllIdeas();
  if (ideas.length === 0) {
    dashboard.innerHTML = "<h1>No ideas yet! Be the first one :)</h1>";
    return ctx.renderer(dashboard);
  }
  ideas.forEach((idea) => {
    dashboard.innerHTML += createIdeaTemp(idea);
  });
  dashboard
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", onClick));
  ctx.renderer(dashboard);
}

function onClick(e) {
  e.preventDefault();
  debugger;
  const id = e.target.dataset.id;
  context.goTo("/details", id);
}

function createIdeaTemp(idea) {
  return `<div
  class="card overflow-hidden current-card details"
  style="width: 20rem; height: 18rem">
  <div class="card-body">
    <p class="card-text">${idea.title}</p>
  </div>
  <img
    class="card-image"
    src="${idea.img}"
    alt="Card image cap"
  />
  //<a class="btn" href="/details" data-id=${idea._id}>Details</a>
</div>`;
}
