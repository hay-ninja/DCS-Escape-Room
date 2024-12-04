// Variables
let currentQuestionIndex = 0;
let keyHeld = false;

// Questions Array for the Fake Escape Room (First 5 Doors)
const questions = [
  {
    question: `What is the output of the following code? <pre>System.out.println(10 / 3);</pre>`,
    answer: '3'
  },
  {
    question: `What does this code output? <pre>String s = "Hello"; System.out.println(s.charAt(1));</pre>`,
    answer: 'e'
  },
  {
    question: `What will be printed? <pre>int x = 5; System.out.println(++x * 2);</pre>`,
    answer: '12'
  },
  {
    question: `For the code: <pre>String s = "Java"; System.out.println(s.substring(1, 3));</pre>`,
    answer: 'av'
  },
  {
    question: `In this code, what would the result be? <pre>int[] arr = {1, 2, 3}; System.out.println(arr[2]);</pre>`,
    answer: '3'
  }
];

// Event Listener for Page Load
window.addEventListener("load", function () {
  const logoContainer = document.getElementById("logo-container");

  // Set a timeout to hide the logo and show the title screen after 2 seconds
  setTimeout(() => {
    logoContainer.style.display = "none";
    document.getElementById("title-screen").style.display = "block";
  }, 2000);

  // Mousemove event for cursor radiance
  document.addEventListener("mousemove", function (event) {
    const cursorRadiance = document.getElementById("cursor-radiance");
    cursorRadiance.style.display = "block";
    // Update the radiance position based on cursor
    cursorRadiance.style.left = `${event.pageX}px`;
    cursorRadiance.style.top = `${event.pageY}px`;

    // Optional: Create a subtle growing/shrinking effect based on cursor movement speed
    cursorRadiance.style.width = "500px";
    cursorRadiance.style.height = "500px";
  });

  setTimeout(initCodeRain, 2000); // Start the code rain effect after logo animation
});

// Start Game Function
function startGame() {
  document.getElementById("title-screen").style.display = "none";
  document.getElementById("door-screen").style.display = "block";
  loadProgress(); // Load progress here
  setupDoors();
}

// Load Progress Function
function loadProgress() {
  const savedIndex = localStorage.getItem('fakeEscapeProgress');
  if (savedIndex !== null) {
    currentQuestionIndex = parseInt(savedIndex);
  } else {
    currentQuestionIndex = 0;
  }
}

// Save Progress Function
function saveProgress() {
  localStorage.setItem('fakeEscapeProgress', currentQuestionIndex);
}

// Setup Doors Function
function setupDoors() {
  const doorContainer = document.querySelector(".door-container");
  doorContainer.innerHTML = ""; // Clear previous doors

  for (let i = 0; i < questions.length; i++) {
    const door = document.createElement("div");
    door.classList.add("door");
    if (i <= currentQuestionIndex) door.classList.add("unlocked"); // Unlock doors up to current progress
    door.textContent = i + 1;

    door.addEventListener("click", function () {
      if (door.classList.contains("unlocked")) {
        enterRoom(i);
      }
    });
    doorContainer.appendChild(door);
  }
}

// Enter Room Function
function enterRoom(index) {
  document.getElementById("door-screen").style.display = "none";
  document.getElementById("puzzle-container").style.display = "block";
  currentQuestionIndex = index;
  displayQuestion();
}

// Display Question Function
function displayQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("puzzle-question").innerHTML = question.question;
  document.getElementById("answer").value = "";
  document.getElementById("result").textContent = "";
}

// Check Answer Function
function checkAnswer() {
  const answer = document.getElementById("answer").value.trim();
  const result = document.getElementById("result");
  if (answer === questions[currentQuestionIndex].answer) {
    result.textContent = "CORRECT";
    result.style.color = "rgb(87, 214, 87)";
    showKey(true); // Pass true to auto-press the key
  } else {
    result.textContent = "INCORRECT";
    result.style.color = "red";
  }
}

// Show Key Function
function showKey() {
  const key = document.getElementById("key");
  key.style.display = "block";

  // Add click behavior for the key
  key.onclick = function () {
    keyHeld = true;
    key.style.display = "none";
    goBack();
  };

  // Add an event listener to recognize the Enter key as a click
  document.addEventListener('keydown', function handleKeyPress(event) {
    if (event.key === 'Enter') {
      // Trigger the key's onclick logic
      keyHeld = true;
      key.style.display = "none";
      goBack();

      // Remove this event listener after handling the Enter key
      document.removeEventListener('keydown', handleKeyPress);
    }
  });
}



// Go Back Function
function goBack() {
  if (currentQuestionIndex + 1 < questions.length) {
    if (keyHeld === true) {
      keyHeld = false;
      currentQuestionIndex++;
      saveProgress(); // Save progress here
      document.getElementById("puzzle-container").style.display = "none";
      document.getElementById("door-screen").style.display = "block";
      setupDoors(); // Refresh doors to reflect progress
    }
  } else {
    // All doors completed
    currentQuestionIndex++;
    saveProgress(); // Save final progress
    document.getElementById("puzzle-container").style.display = "none";
    document.getElementById("door-screen").style.display = "none";
    document.getElementById("completion-screen").style.display = "block";
  }
}

// Proceed to Actual Escape Room Function
function proceedToActualEscapeRoom() {
  // Clear fake escape room progress
  localStorage.removeItem('fakeEscapeProgress');
  window.location.href = "actual-escape-room.html";
}

// Key Press Event Listener
document.addEventListener('keydown', function (event) {
  // Check if the 'Enter' key is pressed
  if (event.key === 'Enter') {
    checkAnswer();
  }
});

// Initialize Code Rain Effect
function initCodeRain() {
  const canvas = document.getElementById("code-background");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Define code rain parameters
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(0);

  // Draw function
  function draw() {
    ctx.fillStyle = "rgba(1, 1, 1, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#555";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = Math.random() > 0.5 ? "1" : "0";
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  // Loop the draw function
  setInterval(draw, 100);
}
