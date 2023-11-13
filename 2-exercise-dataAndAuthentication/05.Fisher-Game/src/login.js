document.querySelector("form").addEventListener("submit", onLogin);

const logoutRef = document.getElementById("logout");
logoutRef.style.display = "none";

async function onLogin(e) {
  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");

  const data = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  };

  try {
    const response = await fetch("http://localhost:3030/users/login", data);
    if (response.status !== 200) {
      throw (
        (new Error("Invalid Login Details"),
        window.alert("Invalid Login Details"))
      );
    }
    const userData = await response.json();

    sessionStorage.setItem("email", userData.email);
    sessionStorage.setItem("userId", userData._id);
    sessionStorage.setItem("accessToken", userData.accessToken);
  } catch (error) {
    throw new Error("Error");
  }
  window.location.href = "./index.html";
}
