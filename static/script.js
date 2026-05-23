const slots = [
  { id: "A1", status: "vacant", live: true },
  { id: "A2", status: "occupied", live: false },
  { id: "A3", status: "vacant", live: false },
  { id: "A4", status: "occupied", live: false }
];

const slotGrid = document.getElementById("slotGrid");
const freeCount = document.getElementById("freeCount");

function renderSlots() {
  slotGrid.innerHTML = "";

  let freeSlots = 0;

  slots.forEach((slot) => {
    if (slot.status === "vacant") {
      freeSlots++;
    }

    const card = document.createElement("div");
    card.classList.add("slot-card", slot.status);

    if (slot.live) {
      card.classList.add("live-slot");
    }

    card.innerHTML = `
      <h3>Slot ${slot.id}</h3>
      <p>Status: ${slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}</p>
      <p>${slot.live ? "Connected to sensor" : "Demo slot"}</p>
    `;

    slotGrid.appendChild(card);
  });

  freeCount.textContent = freeSlots;
}

async function fetchStatus() {
  try {
    const response = await fetch("/status");
    const data = await response.json();

    if (data.A1) {
      slots[0].status = data.A1;
      renderSlots();
    }
  } catch (error) {
    console.error("Error fetching slot status:", error);
  }
}

renderSlots();
fetchStatus();
setInterval(fetchStatus, 2000);