let minerals = [
  { name: 'Gold', amount: 0 },
  { name: 'Silver', amount: 0 },
  { name: 'Copper', amount: 0 },
  { name: 'Iron', amount: 0 },
  { name: 'Diamond', amount: 0 },
  { name: 'Coal', amount: 0 },
  { name: 'Platinum', amount: 0 }
];

let workers = {};

function initializeGame() {
  let savedGameState = localStorage.getItem('idleMineTycoon');
  if (savedGameState) {
    let gameState = JSON.parse(savedGameState);
    minerals = gameState.minerals;
    workers = gameState.workers;
    updateAmounts();
  }

  let mineralsContainer = document.getElementById('minerals');
  minerals.forEach(mineral => {
    let mineralDiv = document.createElement('div');
    mineralDiv.className = 'mineral';
    mineralDiv.id = mineral.name.toLowerCase();
    mineralDiv.innerHTML = `
      <h2>${mineral.name}</h2>
      <p>Amount: <span>${mineral.amount}</span></p>
      <button onclick="mine('${mineral.name.toLowerCase()}')">Mine ${mineral.name}</button>
      <button onclick="hireWorker('${mineral.name.toLowerCase()}')">Hire Worker</button>
    `;
    mineralsContainer.appendChild(mineralDiv);
  });

  minerals.forEach(mineral => {
    workers[mineral.name.toLowerCase()] = 0;
  });

  setInterval(earnPassiveIncome, 1000);
}

function earnPassiveIncome() {
  minerals.forEach(mineral => {
    mineral.amount += workers[mineral.name.toLowerCase()];
  });
  updateAmounts();
  saveGameState();
}

function updateAmounts() {
  minerals.forEach(mineral => {
    document.querySelector(`#${mineral.name.toLowerCase()} span`).textContent = mineral.amount;
  });
}

function mine(mineralName) {
  let mineral = minerals.find(m => m.name.toLowerCase() === mineralName);
  mineral.amount += 1;
  updateAmounts();
}

function hireWorker(mineralName) {
  let mineral = minerals.find(m => m.name.toLowerCase() === mineralName);
  if (mineral.amount >= 10) {
    workers[mineralName] += 1;
    mineral.amount -= 10;
    updateAmounts();
    alert(`You hired a worker for ${mineralName} mining!`);
    saveGameState();
  } else {
    alert(`You need at least 10 ${mineral.name} to hire a worker!`);
  }
}

function saveGameState() {
  let gameState = {
    minerals: minerals,
    workers: workers
  };
  localStorage.setItem('idleMineTycoon', JSON.stringify(gameState));
}

initializeGame();
