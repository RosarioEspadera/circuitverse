// =============================
// FLASHCARDS
// =============================
function flipCard(card) {
  card.classList.toggle("flipped");
}

// =============================
// COMPONENTS
// =============================
function showComponent(name, desc, img) {
  document.getElementById("component-detail").innerHTML = `
    <h3>${name}</h3>
    <p>${desc}</p>
    <img src="${img}" width="100">
  `;
}

// =============================
// QUIZ BANK (50 Questions)
// =============================
const quizData = [
  // Ohm’s Law & Basics
  { q: "In a series circuit with V=10V and R=5Ω, what is the current?", options: ["2 A", "0.5 A", "50 A"], answer: 0 },
  { q: "Two 100Ω resistors in parallel = ?", options: ["50Ω", "100Ω", "200Ω"], answer: 0 },
  { q: "Power of 10Ω resistor with 2A current?", options: ["5W", "20W", "40W"], answer: 2 },
  { q: "What does a capacitor store?", options: ["Current", "Voltage", "Energy"], answer: 2 },
  { q: "Which law relates Voltage, Current, and Resistance?", options: ["Kirchhoff's Law", "Ohm's Law", "Faraday's Law"], answer: 1 },

  // Circuit Behavior
  { q: "In a parallel circuit, voltage across each branch is:", options: ["Different", "Same", "Depends on resistance"], answer: 1 },
  { q: "In a series circuit, current is:", options: ["Same everywhere", "Different in each resistor", "Zero"], answer: 0 },
  { q: "A short circuit has:", options: ["Zero resistance", "Infinite resistance", "High voltage"], answer: 0 },
  { q: "An open circuit has:", options: ["Zero resistance", "Infinite resistance", "Maximum current"], answer: 1 },
  { q: "If R increases while V is constant, current will:", options: ["Increase", "Decrease", "Stay the same"], answer: 1 },

  // Components
  { q: "A diode allows current to flow:", options: ["Both ways", "Only one way", "Not at all"], answer: 1 },
  { q: "What unit is used for capacitance?", options: ["Henry", "Farad", "Ohm"], answer: 1 },
  { q: "The unit of inductance is:", options: ["Farad", "Henry", "Tesla"], answer: 1 },
  { q: "Which is a passive component?", options: ["Resistor", "Transistor", "Op-Amp"], answer: 0 },
  { q: "An LED needs what to prevent burning out?", options: ["Switch", "Inductor", "Resistor"], answer: 2 },

  // Kirchhoff’s Laws
  { q: "Kirchhoff’s Current Law states:", options: ["Sum of currents at a node = 0", "Sum of voltages in a loop = 0", "Power is conserved"], answer: 0 },
  { q: "Kirchhoff’s Voltage Law states:", options: ["Voltages in loop add to 0", "Currents at node add to 0", "Resistance is constant"], answer: 0 },
  { q: "In KCL, currents entering a node are:", options: ["Equal to currents leaving", "Greater than leaving", "Ignored"], answer: 0 },
  { q: "KVL is based on:", options: ["Charge conservation", "Energy conservation", "Resistance"], answer: 1 },
  { q: "KCL is based on:", options: ["Energy conservation", "Charge conservation", "Magnetism"], answer: 1 },

  // AC & DC
  { q: "DC stands for:", options: ["Direct Current", "Dynamic Current", "Derived Current"], answer: 0 },
  { q: "AC stands for:", options: ["Active Current", "Alternating Current", "Absolute Current"], answer: 1 },
  { q: "In AC circuits, capacitors:", options: ["Block DC, allow AC", "Block AC, allow DC", "Block both"], answer: 0 },
  { q: "Frequency of household AC (PH standard):", options: ["50 Hz", "60 Hz", "100 Hz"], answer: 1 },
  { q: "What device changes AC voltage levels?", options: ["Transformer", "Resistor", "Diode"], answer: 0 },

  // Measurements
  { q: "What instrument measures current?", options: ["Voltmeter", "Ammeter", "Ohmmeter"], answer: 1 },
  { q: "What instrument measures resistance?", options: ["Voltmeter", "Ammeter", "Ohmmeter"], answer: 2 },
  { q: "Multimeter can measure:", options: ["V only", "I only", "V, I, R"], answer: 2 },
  { q: "Oscilloscopes display:", options: ["Voltage vs Time", "Current vs Resistance", "Frequency vs Wavelength"], answer: 0 },
  { q: "Clamp meters measure:", options: ["Temperature", "Current", "Resistance"], answer: 1 },

  // Energy & Power
  { q: "Energy unit is:", options: ["Joule", "Watt", "Coulomb"], answer: 0 },
  { q: "Power unit is:", options: ["Joule", "Watt", "Coulomb"], answer: 1 },
  { q: "1 kWh equals:", options: ["100 J", "1000 J", "3.6 million J"], answer: 2 },
  { q: "If P=VI, then increasing both V and I will:", options: ["Decrease P", "Increase P", "Not change P"], answer: 1 },
  { q: "Batteries supply:", options: ["AC", "DC", "Both"], answer: 1 },

  // Practical Circuits
  { q: "Fuse is used for:", options: ["Overvoltage protection", "Overcurrent protection", "Signal amplification"], answer: 1 },
  { q: "Ground provides:", options: ["Reference voltage", "Current path", "Both"], answer: 2 },
  { q: "Breadboard is used for:", options: ["Permanent circuits", "Temporary prototyping", "Measuring resistance"], answer: 1 },
  { q: "Which device converts AC to DC?", options: ["Rectifier", "Transformer", "Capacitor"], answer: 0 },
  { q: "A transistor can act as:", options: ["Resistor", "Switch & Amplifier", "Inductor"], answer: 1 },

  // Advanced
  { q: "Time constant of RC circuit is:", options: ["R × C", "R / C", "C / R"], answer: 0 },
  { q: "Charge Q = ?", options: ["I × t", "V × t", "R × I"], answer: 0 },
  { q: "Impedance is measured in:", options: ["Ohms", "Watts", "Farads"], answer: 0 },
  { q: "Resonance occurs when:", options: ["XL = XC", "R=0", "V=0"], answer: 0 },
  { q: "The quality factor Q relates to:", options: ["Efficiency", "Resonance sharpness", "Resistance"], answer: 1 },

  // Safety & Real-World
  { q: "Which color wire is usually ground?", options: ["Red", "Black", "Green"], answer: 2 },
  { q: "Static electricity is measured in:", options: ["Amps", "Volts", "Joules"], answer: 1 },
  { q: "GFCI outlets protect against:", options: ["Overvoltage", "Electric shock", "Short circuit"], answer: 1 },
  { q: "Main hazard of capacitors is:", options: ["They heat", "They can store charge", "They change resistance"], answer: 1 },
  { q: "Safe practice in labs is:", options: ["Work alone", "Use PPE & insulated tools", "Bypass fuses"], answer: 1 }
];


// =============================
// QUIZ LOGIC
// =============================
let currentQuestion = 0;
let score = 0;

// Shuffle questions for variety
const questions = quizData.sort(() => Math.random() - 0.5);

// DOM elements
const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("quiz-question");
const optionsEl = document.getElementById("quiz-options");
const nextBtn = document.getElementById("next-btn");

// Progress elements
const progressBar = document.createElement("div");
progressBar.className = "w-full bg-gray-300 rounded h-4 mb-4 overflow-hidden";
const progressFill = document.createElement("div");
progressFill.className = "bg-blue-500 h-4 transition-all";
progressFill.style.width = "0%";
progressBar.appendChild(progressFill);

quizContainer.insertBefore(progressBar, questionEl);

const progressText = document.createElement("p");
progressText.className = "mb-2 font-semibold";
quizContainer.insertBefore(progressText, questionEl);

// Load a question
function loadQuestion() {
  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }

  let q = questions[currentQuestion];
  questionEl.textContent = `${currentQuestion + 1}. ${q.q}`;

  // Clear old options
  optionsEl.innerHTML = "";

  // Render options
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className =
      "w-full bg-gray-200 p-2 rounded hover:bg-blue-300 transition";
    btn.textContent = opt;

    btn.onclick = () => {
      // Check answer
      if (i === q.answer) {
        score++;
        btn.classList.add("bg-green-400");
      } else {
        btn.classList.add("bg-red-400");
      }

      // Disable other buttons after choosing
      Array.from(optionsEl.children).forEach((b) => (b.disabled = true));
    };

    optionsEl.appendChild(btn);
  });

  // Update progress
  const progressPercent = Math.round(((currentQuestion + 1) / questions.length) * 100);
  progressFill.style.width = `${progressPercent}%`;
  progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length} (${progressPercent}%)`;
}

// Next button
nextBtn.onclick = () => {
  currentQuestion++;
  loadQuestion();
};

// Show results screen
function showResults() {
  const percentage = Math.round((score / questions.length) * 100);
  const passFail = percentage >= 70 ? "✅ Pass" : "❌ Fail";

  quizContainer.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Quiz Completed!</h2>
    <p class="mb-2">Your Score: <b>${score}</b> / ${questions.length}</p>
    <p class="mb-2">Percentage: <b>${percentage}%</b></p>
    <p class="mb-4">Result: <span class="font-bold">${passFail}</span></p>
    <button id="retry-btn" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Retry Quiz</button>
  `;

  document.getElementById("retry-btn").onclick = () => {
    // Reset quiz
    score = 0;
    currentQuestion = 0;
    loadQuestion();
  };
}

// Start quiz
loadQuestion();
// =============================
// CIRCUIT EXPLORER
// =============================

let placed = [];

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  const type = ev.dataTransfer.getData("type");

  const x = ev.offsetX;
  const y = ev.offsetY;

  const img = document.createElement("img");
  img.src = `images/${type}.png`;
  img.style.left = (x - 30) + "px";
  img.style.top = (y - 30) + "px";
  img.dataset.type = type;

  // Make the component draggable inside canvas
  img.onmousedown = function (e) {
    dragComponent(e, img);
  };

  document.getElementById("canvas").appendChild(img);
  placed.push(type);
}

// Enable dragging inside canvas
function dragComponent(e, element) {
  e.preventDefault();
  let shiftX = e.clientX - element.getBoundingClientRect().left;
  let shiftY = e.clientY - element.getBoundingClientRect().top;

  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX - document.getElementById("canvas").offsetLeft + "px";
    element.style.top = pageY - shiftY - document.getElementById("canvas").offsetTop + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener("mousemove", onMouseMove);

  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}

document.querySelectorAll(".draggable").forEach(el => {
  el.addEventListener("dragstart", e => {
    e.dataTransfer.setData("type", e.target.dataset.type);
  });
});

function analyzeCircuit() {
  if (!placed.includes("battery")) {
    document.getElementById("explorer-output").textContent = "⚠️ Place a battery to power the circuit.";
    return;
  }

  const resistors = placed.filter(x => x === "resistor").length;
  if (resistors === 0) {
    document.getElementById("explorer-output").textContent = "⚠️ Add at least one resistor.";
    return;
  }

  // Basic analysis
  const V = 10; // Assume battery = 10V
  const R = 5 * resistors; // Each resistor = 5Ω
  const I = V / R;

  let message = `🔋 Battery = ${V}V | 🌀 Total Resistance = ${R}Ω | ⚡ Current = ${I.toFixed(2)} A`;

  // Extra components notes
  if (placed.includes("capacitor")) message += " | ⚡ Capacitor stores energy";
  if (placed.includes("inductor")) message += " | 🌀 Inductor resists current change";
  if (placed.includes("diode")) message += " | ➡️ Diode allows one-way flow";
  if (placed.includes("led")) message += " | 💡 LED will glow if forward biased";
  if (placed.includes("transistor")) message += " | 🔀 Transistor can switch/amplify";
  if (placed.includes("switch")) message += " | 🔘 Switch can open/close circuit";
  if (placed.includes("ground")) message += " | ⏚ Ground reference added";

  document.getElementById("explorer-output").textContent = message;
}

// =============================
// INIT
// =============================
window.onload = () => {
  loadQuestion();
};
