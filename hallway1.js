// Variables
let currentQuestionIndex = 0;
let keyHeld = false;

// Questions Array for Hallway 1
const questions = [
  {
    question: 'Question 1 for Hallway 1',
    answer: 'Answer1'
  },
  {
    question: 'Question 2 for Hallway 1',
    answer: 'Answer2'
  },
  {
    question: 'Question 3 for Hallway 1',
    answer: 'Answer3'
  },
  {
    question: 'Question 4 for Hallway 1',
    answer: 'Answer4'
  },
  {
    question: 'Question 5 for Hallway 1',
    answer: 'Answer5'
  }
];

// Load Progress
function loadProgress() {
  const savedIndex = localStorage.getItem('hallway1Progress');
  if (savedIndex !== null) {
    currentQuestionIndex = parseInt(savedIndex);
  } else {
    currentQuestionIndex = 0;
  }
}

// Save Progress
function saveProgress() {
  localStorage.setItem('hallway1Progress', currentQuestionIndex);
}

// Start Game Function
function startGame() {
  loadProgress();
  setupDoors();
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

    door.addEventListener("click", function() {
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
    showKey();
  } else {
    result.textContent = "INCORRECT";
    result.style.color = "red";
  }
}

// Show Key Function
function showKey() {
  const key = document.getElementById("key");
  key.style.display = "block";
  key.onclick = function() {
    keyHeld = true;
    key.style.display = "none";
    goBack();
  };
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
    document.getElementById("completion-screen").style.display = "block";
  }
}

// Go Back to Hallways Function
function goBackToHallways() {
  window.location.href = "actual-escape-room.html";
}

// Key Press Event Listener
document.addEventListener('keydown', function(event) {
  // Check if the 'Enter' key is pressed
  if (event.key === 'Enter') {
    checkAnswer();
  }
});

// On page load
window.onload = function() {
  startGame();
};
