// Variables
let currentQuestionIndex = 0;
let keyHeld = false;

// Questions Array for Hallway 2



//IF YOU'RE LOOKING FOR THE ANSWERS THEN
// YOU'RE A VERY BAD PERSON. >:(
// DONT DO IT AND DO THE QUESTIONS PROPERLY!!!




const questions = [
  {
    question: '<pre>In order to make a\nstandard prefix sum of the array "[1,2,3,4]",\nwhat would the size of the\nresultant prefix sum array be?</pre>',
    answer: 'NQ=='
  },
  {
    question: '<pre>The resultant prefix sum array\n of "[1,2,3,4]" is stored in array "P".\nWhat would the value of P[3] equal?</pre>',
    answer: 'Ng=='
  },
  {
    question: '<pre>What is the technical acronym used to represent the graph traversal algorithm known as Depth _____ ______? (All caps)</pre>',
    answer: 'REZT'
  },
  {
    question: '<pre>What is the technical name for a solution idea that involves selecting the most optimal choice at each step? (All caps)</pre>',
    answer: 'R1JFRURZ'
  },
  {
    question: '<pre>Now for a harder problem!\nI recommend coding this one out.\n<a href="data:text/plain;base64,TXIuIEJhaWxleSBoYXMgdGhyZWUgcG9zaXRpdmUgaW50ZWdlcnMgQSxCLCBhbmQgQyAoQSA8PSBCIDw9IEMpLiBUaGVzZSBpbnRlZ2VycyBhcmUgc3VwcG9zZWQgdG8gYmUga2VwdCBzZWNyZXQsIHNvIGhlIG9ubHkgdGVsbHMgdGhlbSB0byBXaWxsaWFtIEJyaXR0b24gYW5kIGRvZXMgbm90IHJldmVhbCB0aGVtIHRvIHRoZSByZXN0IG9mIHRoZSBjbGFzcy4gSW5zdGVhZCwgaGUgZ2l2ZXMgdGhlIGNsYXNzIHNldmVuIChub3QgbmVjZXNzYXJpbHkgZGlzdGluY3QpIGludGVnZXJzIGluIHRoZSByYW5nZSAxLi4uMTBeOSwgc3RhdGluZyB0aGF0IHRoZXkgYXJlIEEsIEIsIEMsIEEgKyBCLCBCICsgQywgQyArIEEsIGFuZCBBICsgQiArIEMgaW4gc29tZSBvcmRlci4gCgpHaXZlbiBhIGxpc3Qgb2YgdGhlc2Ugc2V2ZW4gbnVtYmVycywgcGxlYXNlIGhlbHAgdGhlIGNsYXNzIGRldGVybWluZSBBLCBCLCBhbmQgQy4KCkdpdmVuIHRoaXMgaW5wdXQ6CjE0ODM4NTI0NyA4MTkzNjU4MjAgNzkzMzIwMzcyIDI2MDQ1NDQ4IDEyMjMzOTc5OSA2NzA5ODA1NzMgNjk3MDI2MDIxCgpXaGF0IGFyZSB0aGUgdmFsdWVzIG9mIEEsIEIsIGFuZCBDPwoKV2hlbiB5b3UgaGF2ZSBhbiBhbnN3ZXIsIHBsZWFzZSBzdWJtaXQgaXQgaW50byB0aGUgZG9vciBpbiB0aGUgZm9ybWF0ICJBIEIgQyIuIEV4OiAxIDIgMwo=">Open me in a new tab for the question data!</a></pre>',
    answer: 'MjYwNDU0NDggMTIyMzM5Nzk5IDY3MDk4MDU3Mw'
  }
];

// Load Progress
function loadProgress() {
  const savedIndex = localStorage.getItem('hallway2Progress');
  if (savedIndex !== null) {
    currentQuestionIndex = parseInt(savedIndex);
  } else {
    currentQuestionIndex = 0;
  }
}

// Save Progress
function saveProgress() {
  localStorage.setItem('hallway2Progress', currentQuestionIndex);
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
