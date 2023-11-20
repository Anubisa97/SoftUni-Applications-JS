const URI = `http://localhost:3030/jsonstore/collections/myboard/posts/`;
const commentsURI = `http://localhost:3030/jsonstore/collections/myboard/comments/`;
const main = document.querySelector("main");
const section = document.getElementById("comments");

section.remove();

export async function showDetails(e) {
  section.innerHTML = "";
  const id = e.target.parentElement.dataset.id;
  const topic = await getTopic(id);
  //const comments = await getAllComments(id);
  const div = document.createElement("div");
  div.classList.add("comment");
  const topicElement = createTopicTemplate(topic);
  const commentForm = createCommentForm();
  div.appendChild(topicElement);
  //   Object.values(comments).forEach((comment) => {
  //     const commentElement = creteCommentTemplate(comment);
  //     div.appendChild(commentElement);
  //   });
  section.appendChild(div);
  section.appendChild(commentForm);
  main.replaceChildren(section);
}

const form = document.querySelector("form");

form.addEventListener("submit", createComment);

async function createComment(e) {
  debugger;
  e.preventDefault();
  const formData = new FormData(e.target);

  console.log(...formData.entries());
}

async function getTopic(id) {
  const response = await fetch(URI + id);
  const data = await response.json();
  return data;
}

async function getAllComments(id) {
  const response = await fetch(commentsURI + id);
  const data = await response.json();
}

function createTopicTemplate(topic) {
  const date = new Date(topic.createDate);
  const dateString = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const div = document.createElement("div");
  div.classList.add("header");
  div.innerHTML = `<img src="./static/profile.png" alt="avatar" />
  <p><span>${topic.username}</span> posted on <time>${dateString}</time></p>
  <p class="post-content">${topic.postText}</p>`;

  return div;
}

function creteCommentTemplate(comment) {
  const div = document.createElement("div");
  div.id = "user-comment";
  div.innerHTML = `<div class="topic-name-wrapper">
      <div class="topic-name">
        <p>
          <strong>Daniel</strong> commented on
          <time>3/15/2022, 12:39:02 AM</time>
        </p>
        <div class="post-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure facere
            sint dolorem quam.
          </p>
        </div>
      </div>
    </div>`;

  return div;
}

function createCommentForm() {
  const div = document.createElement("div");
  div.classList.add("answer-comment");
  div.innerHTML = `<p><span>currentUser</span> comment:</p>
            <div class="answer">
              <form>
                <textarea
                  name="postText"
                  id="comment"
                  cols="30"
                  rows="10"
                ></textarea>
                <div>
                  <label for="username"
                    >Username <span class="red">*</span></label
                  >
                  <input type="text" name="username" id="username" />
                </div>
                <button>Post</button>
              </form>
            </div>`;
  return div;
}
