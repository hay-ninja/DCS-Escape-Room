// Variables
let currentQuestionIndex = 0;
let keyHeld = false;

// Questions Array for Hallway 1



//IF YOU'RE LOOKING FOR THE ANSWERS THEN
//U SUCK




const questions = [
  {
    question: '<pre>Mr. Bailey has been gaining fans every year. Here’s how his fanbase grew:\n\n- 2020: 40 fans- 2021: 107 fans\n- 2022: 404 fans\n- 2023: 709 fans\n- 2024: 1039 fans\n\nWhat is the average number of fans Mr. Bailey has had per year from 2020 to 2024?</pre>',
    answer: 'NDU5Ljg='
  },
  {
    question: '<pre>Find the palindrome for “supercalifragilisticexpialidocious” and concatenate the 11th, 2nd, and 5th letter in that order. \n\nThe secret classroom to Mr. Bailey’s classroom is the answer!</pre>',
    answer: 'cnVj'
  },
  {
    question: '<pre>Mr. Bailey has gone missing!\n\nlet Mr. Bailey = l!i!l\n\npeople = "li!lii!il!l!!!iil!!!i!ill!!liillili!i!!iil!!liiiilil!i!i!llii!!!lililiiiii!ll!l!lllil!iillillill!!ll!lii!il!ii!lll!!iilll!iilliill!l!!ll!!!!iilll!l!iiilli!li!!llill!lilil!!l!il!llill!!!iiili!lli!i!ii!l!!!li!!lli!i!li!i!!ililliiliil!l!illl!lli!ll!!llili!i!l!l!ii!il!!ll!iliill!!!ill!!!ii!l!i!!i!!i!iiill!!!l!iil!!l!lill!l!i!ii!!l!!i!l!l!iliii!liiliil!iliiiil!!!llliilll!i!!!!!!l!i!l!liillll!l!!!!lll!lii!lii!llii!llliii!l!!!illllill!!!lllll!!lli!i!ii!ili!i!il!iil!lil!il!l!!iliiiil!ili!l!i!ilililiill!i!l!l!l!l!!ilil!!!!!!lili!!i!!iilii!illll!!!il!i!l!il!!!!iiiliiili!!l!!!!lliil!li!llilii!i!!ii!i!iilll!!!il!!i!lli!i!i!l!!i!!llli!i!ll!!lii!l!ll!l!l!iil!!i!ilii!!lliliiii!!!iiiili!lilll!!!l!illllliiliiii!i!il!!!!li!l!!ii!i!!!!li!ll!lii!iil!iiil!!!li!lilliilll!l!illilll!ill!i!!l!il!lll!!lill!!iliil!!iil!i!ilill!!l!!illll!!l!lllllilliilii!l!!illil!l!il!l!!i!il!illiliillllli!!!li!lii!!l!l!!!iliiiiiililllll!i!!!lii!l!!il!!li!ilii!!ll!liilllllil!i!i!li!llii!i!!!!i!i!iliillll!llili!!liiiii!!iii!!ii!lli!!!l"</pre>',
    answer: 'Mzc2'
  },
  {
    question: '<pre>Mr. Baileys phone is locked! He has an intricate phone passcode, and its the sum of the numbers along the outer edge of a 25x25 matrix, where every number increases by 7, starting from 1.\n\n**Clue**:\n\n1. Generate a 25x25 matrix where succeeding values are increased by 7, starting from 1.\n2. Sum all numbers along the outer border of the matrix.</pre>',
    answer: 'MjA5NzYw'
  },
  {
    question: 'Question 5 for Hallway 2',
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
  if (answer === dc(questions[currentQuestionIndex].answer)) {
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
function dc(str) {
   return decodeURIComponent(atob(str).split('').map(function(c) { return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); }).join('')); 
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
