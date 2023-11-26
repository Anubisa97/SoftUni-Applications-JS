const details = document.getElementById("detailsView");
const main = document.getElementById("main");

export function showDetails() {
  main.replaceChildren(details);
}
