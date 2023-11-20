import { showDetails } from "./detailsVew.js";

const URI = `http://localhost:3030/jsonstore/collections/myboard/posts`;

const main = document.querySelector("main");
const topicContainer = document.querySelector("div.topic-title");
const section = document.querySelector("div.new-topic-border");
const form = section.querySelector("form");
const cancel = document.querySelector(".cancel");

cancel.addEventListener("click", clearForm);
form.addEventListener("submit", onSubmit);

export async function showHome(e) {
  e?.preventDefault();
  topicContainer.innerHTML = "";

  const topics = await GetAllTopics();
  Object.values(topics).forEach((topic) => {
    const temp = createTopicTemplate(topic);
    topicContainer.appendChild(temp);
  });

  topicContainer.querySelector("a").addEventListener("click", showDetails);

  main.replaceChildren(section);
  main.appendChild(topicContainer);
}

function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  console.log(...formData.entries());
  const topicName = formData.get("topicName");
  const username = formData.get("username");
  const postText = formData.get("postText");
  const createDate = new Date().getTime();
  if (!topicName && !username && postText) {
    throw window.alert("Missing inputs");
  }
  createTopic({ topicName, username, postText, createDate });
}

function clearForm(e) {
  e?.preventDefault();
  form.reset();
}

async function GetAllTopics() {
  const response = await fetch(URI);
  const data = await response.json();
  return data;
}

async function createTopic(data) {
  const response = await fetch(URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  clearForm();
  showHome();
}

function createTopicTemplate(topic) {
  const div = document.createElement("div");
  div.classList.add("topic-container");
  div.innerHTML = `
  <div class="topic-name-wrapper">
    <div class="topic-name">
      <a href="#" class="normal" data-id=${topic._id}>
        <h2>${topic.topicName}</h2>
      </a>
      <div class="columns">
        <div>
          <p>
            Date: <time>${new Date(topic.createDate).toISOString()}</time>
          </p>
          <div class="nick-name">
            <p>
              Username: <span>${topic.username}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  return div;
}
