const URI = "http://localhost:3030/users/";
const catchesURI = "http://localhost:3030/data/catches";
const endpoints = {
  logout: "logout",
  login: "login",
};

const loginRef = document.getElementById("login");
const logoutRef = document.getElementById("logout");
const registerRef = document.getElementById("register");
const emailRef = document.querySelector("p span");
const catchesRef = document.getElementById("catches");
const loadRef = document.querySelector("button.load");

catchesRef.innerHTML = "";

logoutRef.addEventListener("click", onLogout);
loadRef.addEventListener("click", onLoad);

if (sessionStorage.getItem("userId")) {
  loginRef.style.display = "none";
  registerRef.style.display = "none";
  emailRef.textContent = sessionStorage.getItem("email");
} else {
  logoutRef.style.display = "none";
  emailRef.textContent = "guest";
}

async function onLogout(e) {
  const response = await fetch(URI + endpoints.logout, {
    method: "GET",
    headers: { "x-authorization": sessionStorage.getItem("accessToken") },
  });
  sessionStorage.clear();
  window.location.href = "./index.html";
  //throw window.alert("You have have been logged out!");
}

async function onLoad(e) {
  const allCatches = await getAllCatches();
  catchesRef.innerHTML = "";
  allCatches.forEach((e) => {
    const catches = generateCatches(e);
    catchesRef.appendChild(catches);
  });
}

function generateCatches(e) {
  const div = document.createElement("div");
  div.classList.add("catch");
  div.innerHTML = `
    <label>Angler</label>
    <input type="text" class="angler" value="${e.angler}" disabled>
    <label>Weight</label>
    <input type="text" class="weight" value="${e.weight}" disabled>
    <label>Species</label>
    <input type="text" class="species" value="${e.species}" disabled>
    <label>Location</label>
    <input type="text" class="location" value="${e.location}" disabled>
    <label>Bait</label>
    <input type="text" class="bait" value="${e.bait}" disabled>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value="${e.captureTime}" disabled>
    <button class="update" data-id="${e._id}" disabled>Update</button>
    <button class="delete" data-id="${e._id}" disabled>Delete</button>`;

  if (e._ownerId === sessionStorage.getItem("userId")) {
    const buttons = div.querySelectorAll("button");
    Array.from(buttons).forEach((x) => (x.disabled = false));
  }

  return div;
}

async function getAllCatches(e) {
  const response = await fetch(catchesURI);
  const data = response.json();
  return data;
}
