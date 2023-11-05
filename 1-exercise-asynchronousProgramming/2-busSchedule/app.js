function solve() {
  const baseURI = "http://localhost:3030/jsonstore/bus/schedule/";
  let nextStopId = "depot";
  let stopName = "";
  const infoBoardRef = document.querySelector("span.info");
  const departButtonRef = document.getElementById("depart");
  const arriveButtonRef = document.getElementById("arrive");

  async function depart() {
    try {
      const response = await fetch(baseURI + nextStopId);
      const output = await response.json();
      nextStopId = output.next;
      stopName = output.name;
      infoBoardRef.textContent = `Next stop ${stopName}`;

      departButtonRef.disabled = true;
      arriveButtonRef.disabled = false;
    } catch (error) {
      infoBoardRef.textContent = "Error";
      departButtonRef.disabled = true;
      arriveButtonRef.disabled = true;
    }
  }

  function arrive() {
    console.log("Arrive TODO...");
    departButtonRef.disabled = false;
    arriveButtonRef.disabled = true;

    infoBoardRef.textContent = `Arriving at ${stopName}`;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
