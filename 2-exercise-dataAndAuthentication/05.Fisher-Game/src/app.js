const URI = "http://localhost:3030/users/";
const catchesURI = "http://localhost:3030/data/catches/";
const endpoints = {
  logout: "logout",
  login: "login",
};

document.querySelector("form").addEventListener("submit", onCreateCaches);

const loginRef = document.getElementById("login");
const logoutRef = document.getElementById("logout");
const registerRef = document.getElementById("register");
const emailRef = document.querySelector("p span");
const catchesRef = document.getElementById("catches");
const loadRef = document.querySelector("button.load");
const addCaches = document.querySelector("#addForm button");

catchesRef.innerHTML = "";

logoutRef.addEventListener("click", onLogout);
loadRef.addEventListener("click", onLoad);

if (sessionStorage.getItem("userId")) {
  loginRef.style.display = "none";
  registerRef.style.display = "none";
  emailRef.textContent = sessionStorage.getItem("email");
  addCaches.disabled = false;
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

async function onCreateCaches(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const angler = formData.get("angler");
  const weight = formData.get("weight");
  const species = formData.get("species");
  const location = formData.get("location");
  const bait = formData.get("bait");
  const captureTime = formData.get("captureTime");
  if (!angler || !weight || !species || !location || !bait || !captureTime) {
    throw window.alert("Missing Input");
  }

  const data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": sessionStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      angler,
      weight,
      species,
      location,
      bait,
      captureTime,
    }),
  };

  try {
    const response = await fetch(catchesURI, data);
    if (response.status !== 200) {
      throw new Error("error");
    }
  } catch (error) {
    throw new Error("error");
  }

  e.target.reset();
  onLoad();
}

function generateCatches(e) {
  const div = document.createElement("div");
  div.classList.add("catch");
  const isOwner = e._ownerId === sessionStorage.getItem("userId");
  div.innerHTML = `
    <label>Angler</label>
    <input type="text" class="angler" value="${e.angler}" ${
    !isOwner ? "disabled" : ""
  }>
    <label>Weight</label>
    <input type="text" class="weight" value="${e.weight}" ${
    !isOwner ? "disabled" : ""
  }>
    <label>Species</label>
    <input type="text" class="species" value="${e.species}" ${
    !isOwner ? "disabled" : ""
  }>
    <label>Location</label>
    <input type="text" class="location" value="${e.location}" ${
    !isOwner ? "disabled" : ""
  }
    <label>Bait</label>
    <input type="text" class="bait" value="${e.bait}" ${
    !isOwner ? "disabled" : ""
  }>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value="${e.captureTime}" ${
    !isOwner ? "disabled" : ""
  }>
    <button class="update" data-id="${e._id}" disabled>Update</button>
    <button class="delete" data-id="${e._id}" disabled>Delete</button>`;

  if (e._ownerId === sessionStorage.getItem("userId")) {
    const buttons = div.querySelectorAll("button");
    Array.from(buttons).forEach((x) => {
      x.disabled = false;
      if (x.classList.contains("delete")) {
        return x.addEventListener("click", onDelete);
      }
      x.addEventListener("click", onEdit);
    });
  }

  return div;
}

async function onEdit(e) {
  const catchesId = e.target.dataset.id;
  const inputs = e.target.parentElement.querySelectorAll("input");
  const angler = inputs[0].value;
  const weight = Number(inputs[1].value);
  const species = inputs[2].value;
  const location = inputs[3].value;
  const bait = inputs[4].value;
  const captureTime = Number(inputs[5].value);
  const _ownerId = sessionStorage.getItem("userId");
  if (!angler || !weight || !species || !location || !bait || !captureTime) {
    throw window.alert("Missing Input");
  }

  const data = {
    angler,
    weight,
    species,
    location,
    bait,
    captureTime,
  };

  const response = await fetch(catchesURI + catchesId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": sessionStorage.getItem("accessToken"),
    },
    body: JSON.stringify(data),
  });
}

async function onDelete(e) {
  const catchesId = e.target.dataset.id;
  const response = await fetch(catchesURI + catchesId, {
    method: "DELETE",
    headers: { "x-authorization": sessionStorage.getItem("accessToken") },
  });
  onLoad();
}

async function getAllCatches(e) {
  const response = await fetch(catchesURI);
  const data = response.json();
  return data;
}
