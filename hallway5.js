// Variables
let currentQuestionIndex = 0;
let keyHeld = false;

// Questions Array for Hallway 5
const questions = [
  {
    question: '<pre> Problem: <br> An online adventure game needs a script to determine if a player escapes the dungeon: <br> <br>The dungeon map is represented by a 2D array of 1s (walls) and 0s (paths). <br> The player starts at the top-left corner and must reach the bottom-right corner.<br>Movement is restricted to adjacent cells (up, down, left, right). <br><br>Input:<br><br>A 2D array of integers representing the dungeon map. <br><br>[0, 1, 0],<br>[1, 0, 1],<br>[0, 0, 0]<br><br><br>Output:<br><br>1 if the player can reach the bottom-right corner.<br>0 if the player cannot escape.</pre>',
    answer: 'MA=='
  },
  {
    question: '<pre>Problem: You are tasked with designing a dynamic photo gallery for a photography club. The gallery should: <br> Display photos in a grid. <br> Adjust the number of columns dynamically based on the screen width: <br> 1 column for less than 600px. <br> 2 columns for 600px to 900px. <br> 3 columns for more than 900px. <br><br> Input: <br> A number representing the screen width. For example: <br> 550 for a screen less than 600px. <br> 750 for a screen between 600px and 900px. <br> 1200 for a screen greater than 900px. <br> <br>Output: <br> The number of columns visible on the screen.<br><br>Input<br>In this case someone enters 750. What is the output?</pre>',
    answer: 'MQ=='
  },
  {
    question: '<pre>Problem: A rogue script has infected your webpage and is inserting <br>random &lt;marquee&gt; elements across the page! Your job is to write a function that: <br> Detects &lt;marquee&gt; tags. <br> Removes them immediately. <br> Logs the total number of &lt;marquee&gt; tags removed in a minute. <br> Input: <br> An array representing the page DOM elements, where 1 is a &lt;marquee&gt; tag and 0 is any other tag. For example: <br> [0, 1, 0, 1, 1, 0] <br> Output: <br>',
    answer: 'Mw=='
  },
  {
    question: '<pre>Problem: You are building a discount calculator for <br>an e-commerce website. Customers receive a discount based on the total amount of their cart, <br>and there are specific rules for applying the discounts: <br> &nbsp;&nbsp;&nbsp;&nbsp;If the cart total is less than or equal to $100, no discount is applied. <br> &nbsp;&nbsp;&nbsp;&nbsp;If the cart total is between $100 and $500, a 10% discount is applied. <br> &nbsp;&nbsp;&nbsp;&nbsp;If the cart total is between $500 and $1000, a 15% discount is applied. <br> &nbsp;&nbsp;&nbsp;&nbsp;If the cart total is above $1000, a 20% discount is applied. <br> Write a function that calculates the total amount after the discount based on the cart total. <br>The function should round the final total to the nearest integer (in dollars). <br><br> Input: An array of integers representing the prices of individual items in the cart. For example: <br> &nbsp;&nbsp;&nbsp;&nbsp;[30, 120, 450, 80, 250] <br><br> Output: The total amount after the discount has been applied, rounded to the nearest integer (a three-digit number).</pre>',
    answer: 'ODIz'
  },
  {
    question: 'Problem: You are developing a dynamic website where the background color<br> of the page changes based on user interactions. The color transitions depend on the number of actions a user performs, <br>with each action changing the color progressively:<br><br>Base Color: The page starts with a base background color of #FFFFFF (white).<br><br>Action Rules:<br><br>After every 5 actions, the page background color changes to a shade of blue, starting from #99CCFF (light blue) and progressively becoming darker.<br><br>After every 10 actions, the page background color switches to a shade of green, starting from #CCFF99 (light green) and becoming darker.<br><br>After every 20 actions, the page background color switches to a shade of red, starting from #FF6666 (light red) and becoming darker.<br><br>Write a function that calculates the background color after a certain number of actions and returns the hex code of the color.<br><br>Input: An integer representing the number of actions performed. For example:<br><br>15<br><br>Output: The hex code of the background color after the actions have been performed.',
    answer: 'IzY2RkY2Ng=='
  }
];

// Load Progress
function loadProgress() {
  const savedIndex = localStorage.getItem('hallway5Progress');
  if (savedIndex !== null) {
    currentQuestionIndex = parseInt(savedIndex);
  } else {
    currentQuestionIndex = 0;
  }
}

// Save Progress
function saveProgress() {
  localStorage.setItem('hallway5Progress', currentQuestionIndex);
}
window.addEventListener("load", function () {

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

});

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

    const doorPanel = document.createElement("div");
    doorPanel.classList.add("door-panel");
    doorPanel.textContent = i + 1;

    door.appendChild(doorPanel);

    door.addEventListener("click", function () {
      if (door.classList.contains("unlocked")) {
        doorPanel.style.transform = "rotateY(-120deg)";
        setTimeout(() => enterRoom(i), 1000); // Delay entering the room until animation finishes
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
function dc(str) {
  return decodeURIComponent(atob(str).split('').map(function(c) { return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); }).join('')); 
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
