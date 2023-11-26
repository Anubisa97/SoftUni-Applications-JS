const home = document.getElementById("homeView");
const main = document.getElementById("main");

export function showHome() {
  main.replaceChildren(home);
}
