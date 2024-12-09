// Variables
let currentQuestionIndex = 0;
let keyHeld = false;

// Questions Array for Hallway 3
const questions = [
  {
    question: `What is the time complexity of the following code in Big O notation? (don't use spaces) <pre>for(int i=1; i<=n; i*=2) {
      for(int j=1; j<=n; j++) {
          for(int k=1; k<=n; j++) {
              //does some action here
        }
    }
} </pre>
  `,
    answer: 'O(n^2logn)'
  },
  {
    question: `<pre>Oh no! Bessie the Cow has unfortunately fallen into a hole, but luckily
there is a ladder of length N that leads to the top. If Bessie can climb only 
1 or 2 steps at a time, find the number of distinct ways that
Bessie could reach the top using 1 or 2 steps. (CODE the solution and find the answer)

input: N = 7
output: </pre>
  `,
    answer: '21'
  },
  {
    question: `<pre>Bessie has N haystacks, each with a certain height.
She can merge two haystacks into one stack with ONE move (where the cost of the move is the 
sum of their heights). Determine the minimum cost to merge all haystacks into one stack.

input: N = 3
heights = [4, 3, 2, 6]

output: </pre>
  `,
    answer: '29'
  },
  {
    question: `<pre> What is the time complexity of the following code in Big O notation? (do not include spaces)

    int binarySearch(int[] arr, int x) {
      int left = 0, right = arr.length - 1;
      while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == x) return mid;
          else if (arr[mid] < x) left = mid + 1;
          right = mid - 1;
      }
      return -1;
    } </pre>
  `,
    answer: 'O(logn)'
  },
  {
    question: `<pre>Farmer John wants to take a photo of his N cows that are lined up in a single
row from shortest to tallest, each with height h<sub>i</sub>. But unfortunately, Bessie 
(his most mischeivious cow) has sneakily repositioned herself somewhere else in the 
line! The only way Farmer John can move his cows is by swapping the locations of TWO 
cows at a time. What is the minimum number of swaps needed to have all the cows be 
properly lined up from shortest to tallest?
    
  input: N = 6
  heights = [3, 6, 9, 9, 13, 4]
    </pre>`,
    answer: '3'
  }
];

// Load Progress
function loadProgress() {
  const savedIndex = localStorage.getItem('hallway3Progress');
  if (savedIndex !== null) {
    currentQuestionIndex = parseInt(savedIndex);
  } else {
    currentQuestionIndex = 0;
  }
}

// Save Progress
function saveProgress() {
  localStorage.setItem('hallway3Progress', currentQuestionIndex);
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
