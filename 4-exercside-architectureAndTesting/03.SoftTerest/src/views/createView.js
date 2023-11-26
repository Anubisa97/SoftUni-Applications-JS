const create = document.getElementById("createView");
const main = document.getElementById("main");

export function showCreate() {
  main.replaceChildren(create);
}
