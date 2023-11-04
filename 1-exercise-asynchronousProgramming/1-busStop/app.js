async function getInfo() {
  const URI = "http://localhost:3030/jsonstore/bus/businfo/";
  const inputRef = document.getElementById("stopId");
  const busId = inputRef.value;
  const stopNameRef = document.getElementById("stopName");
  const busesList = document.getElementById("buses");
  inputRef.value = "";
  try {
    const response = await fetch(`${URI}${busId}`);
    const output = await response.json();

    stopNameRef.textContent = output.name;
    busesList.innerHTML = "";

    for (let [busId, time] of Object.entries(output.buses)) {
      let currentBus = document.createElement("li");
      currentBus.textContent = `Bus ${busId} arrives in ${time} minutes`;
      busesList.appendChild(currentBus);
    }
  } catch (error) {
    stopNameRef.textContent = "Error";
  }
}
