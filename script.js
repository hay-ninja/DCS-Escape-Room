window.addEventListener("load", function() {
    const logoContainer = document.getElementById("logo-container");
    
    // Set a timeout to hide the logo and show the title screen after 2 seconds
    setTimeout(() => {
      logoContainer.style.display = "none";
      document.getElementById("title-screen").style.display = "block";
    }, 2000); // Adjust the time as needed for your logo animation length
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
  
  
  function startGame() {
    document.getElementById("title-screen").style.display = "none";
    document.getElementById("door-screen").style.display = "block";
    setupDoors();
  
  }
  
  function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("puzzle-question").innerHTML = question.question;
    document.getElementById("answer").value = "";
    document.getElementById("result").textContent = "";
  }
  
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
    },
    {
      question: `Challenge: Calculate the factorial of 4 and enter the answer.`,
      answer: '24'
    },
    {
      question: `Write and run your own Java code to determine: What will <pre>(int) Math.pow(2, 5)</pre> output?`,
      answer: '32'
    },
    {
      question: `Write a loop to sum all integers from 1 to 10, then enter the result here.`,
      answer: '55'
    },
    {
      question: `Given an array <pre>int[] nums = {2, 4, 6, 8};</pre> calculate the sum of all elements.`,
      answer: '20'
    },
    {
      question: `What is the output of the following code? <pre>public class TrickyBitwise {
      public static void main(String[] args) {
          int a = 7, b = 10, c = 13;
          int result = (a & b) ^ (b | c) & (a ^ c) | (~(a | b) & c);
          System.out.println(result);
      }
  } </pre>
  `,
      answer: '5'
    },
    {
      question: `What does this code output? <pre>public class StringTrick {
      public static void main(String[] args) {
          String str = "Hello";
          str += " World";
          str = str.substring(6, 11) + str.charAt(0);
          System.out.println(str);
      }
  } </pre>
  `,
      answer: 'WorldH'
    },
    {
      question: `What is the output? <pre> public class RecursionMystery {
      public static int mystery(int n) {
          if (n <= 1) return n;
          return mystery(n - 1) + mystery(n - 2);
      }
      
      public static void main(String[] args) {
          System.out.println(mystery(5));
      }
  } </pre>
  `,
      answer: '5'
    },
    {
      question: `What is the output? <pre>public class ModulusArray {
      public static void main(String[] args) {
          int[] nums = {2, 4, 6, 8, 10};
          int result = 0;
          for (int i = 0; i < nums.length; i++) {
              result += nums[i] % (i + 1);
          }
          System.out.println(result);
      }
  }
  </pre>`,
      answer: '4'
    },
    {
      question: `In this code, what would the result be? <pre>public class StringBuilderTrick {
      public static void main(String[] args) {
          StringBuilder sb = new StringBuilder("12345");
          sb.append("6789").reverse().replace(2, 5, "XYZ");
          System.out.println(sb);
      }
  }
  </pre>`,
      answer: '3987XYZ21'
    },
    {
      question: `What is the output? <pre> public class CharArithmetic {
      public static void main(String[] args) {
          char ch = 'A';
          ch = (char) (ch + 5);
          ch += 3;
          System.out.println(ch);
      }
  }
  </pre>`,
      answer: '24'
    },
    {
      question: `What is the output of this code? <pre> public class LoopTrick {
      public static void main(String[] args) {
          int result = 0;
          for (int i = 1; i < 10; i += 2) {
              result += (i % 3 == 0) ? i * 2 : i - 1;
          }
          System.out.println(result);
      }
  } </pre>
  `,
      answer: '20'
    },
    {
      question: `What is the output of this code? <pre>public class ArrayStringTrick {
      public static void main(String[] args) {
          String[] arr = {"apple", "banana", "cherry", "date"};
          String result = "";
          for (int i = 0; i < arr.length; i++) {
              result += arr[i].charAt(i % arr[i].length());
          }
          System.out.println(result);
      }
  }
  </pre>`,
      answer: 'abcd'
    },
    {
      question: `What is the output of this code? <pre> public class TernaryTwist {
      public static void main(String[] args) {
          int a = 5, b = 3;
          a = (a > b) ? (a *= 2) : (b += 5);
          System.out.println(a + " " + b);
      }
  }
  </pre>`,
      answer: '10 3'
    },
    {
      question: `What is the output of this code? <pre> public class CastAndConcatenate {
      public static void main(String[] args) {
          int num = 65;
          String str = "The char is: " + (char) num + (int) 'B';
          System.out.println(str);
      }
  }
  </pre>`,
      answer: 'The char is: A66'
    },
    {
      question: `Who is the cool person who made this website?`,
      answer: 'John Fan'
    }
  ];
  
  let currentQuestionIndex = 0;
  let keyHeld = false;
  
  function setupDoors() {
    const doorContainer = document.querySelector(".door-container");
    doorContainer.innerHTML = ""; // Clear previous doors
    
    for (let i = 0; i < 20; i++) {
      const door = document.createElement("div");
      door.classList.add("door");
      if (i === 0) door.classList.add("unlocked"); // Unlock the first door
      door.textContent = i + 1;
      
      door.addEventListener("click", function() {
        if (door.classList.contains("unlocked")) {
          enterRoom(i);
        }
      });
      doorContainer.appendChild(door);
    }
  }
  
  function enterRoom(index) {
    document.getElementById("door-screen").style.display = "none";
    document.getElementById("puzzle-container").style.display = "block";
    currentQuestionIndex = index;
    displayQuestion();
  }
  
  function checkAnswer() {
    const answer = document.getElementById("answer").value.trim();
    if (answer === questions[currentQuestionIndex].answer) {
      result.textContent = "CORRECT";
      result.style.color = "rgb(87, 214, 87)"
      showKey();
      setTimeout(() => {
        // Check if the user has completed the last question
        
      }, 1000);
    } else {
      result.textContent = "INCORRECT";
      result.style.color = "red";
    }
  }
  
  document.addEventListener('keydown', function(event) {
    // Check if a specific key is pressed (e.g., Enter)
    if (event.key === 'Enter') {
      checkAnswer();
    }
  });
  function showKey() {
    const key = document.getElementById("key");
    key.style.display = "block";
    key.onclick = function() {
      keyHeld = true;
      key.style.display = "none";
      goBack();
    };
  }
  
  function goBack() {
    console.log(currentQuestionIndex);
    if (currentQuestionIndex + 1 < questions.length) {
      if (keyHeld === true) {
        keyHeld = false;
        document.getElementById("puzzle-container").style.display = "none";
        document.getElementById("door-screen").style.display = "block";
        const nextDoor = document.querySelector(`.door:nth-child(${currentQuestionIndex + 2})`);
        nextDoor.classList.add("unlocked");
      }
    } else {
      document.getElementById("puzzle-container").style.display = "none";
      document.getElementById("door-screen").style.display = "none";
      console.log("CONGRATS");
      const congratsMessage = document.getElementById("congrats-message");
      congratsMessage.style.display = "block";
      congratsMessage.style.animation = "fadeInEnlarge 0.2s ease forwards";
    }
    
  }
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
  