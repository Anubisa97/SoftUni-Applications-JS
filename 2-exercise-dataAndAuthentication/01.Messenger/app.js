function attachEvents() {
  const textArea = document.getElementById("messages");
  const messageRef = document.querySelector("input[name=content]");
  const nameRef = document.querySelector("input[name=author]");
  const submitButton = document.getElementById("submit");
  const refreshButton = document.getElementById("refresh");
  const URI = "http://localhost:3030/jsonstore/messenger";

  refreshButton.addEventListener("click", refreshHandler);
  submitButton.addEventListener("click", submitHandler);

  async function submitHandler(e) {
    const author = nameRef.value;
    const content = messageRef.value;
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author,
        content,
      }),
    };
    fetch(URI, data);
    nameRef.value = "";
    messageRef.value = "";
  }

  async function refreshHandler(e) {
    textArea.textContent = "";
    const response = await fetch(URI);
    const data = await response.json();
    Object.values(data).forEach((line) => {
      let { author, content } = line;
      textArea.textContent += `${author}: ${content}\n`;
    });
    textArea.textContent = textArea.textContent.trim();
  }
}

attachEvents();
