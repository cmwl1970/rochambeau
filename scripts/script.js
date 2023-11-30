document.addEventListener("DOMContentLoaded", function () {
  // UI elements
  const rockButton = document.querySelector(".hand-rock");
  const paperButton = document.querySelector(".hand-paper");
  const scissorsButton = document.querySelector(".hand-scissors");
  const letsGoButton = document.querySelector(".letsGo");
  const textWrapper = document.querySelector('.text-wrapper');
  const choiceElements = document.querySelectorAll('.hand-paper, .hand-rock, .hand-scissors');
  console.log('Choice Elements:', choiceElements);
  
  let selectedChoice = null;
  
  // apply selected effect color to choice
  function playerChoice(choice) { 
    selectedChoice = choice;
    rockButton.classList.remove("selected");
    paperButton.classList.remove("selected");
    scissorsButton.classList.remove("selected");

    // console.log(`Applying selected style to .hand-${choice}`);

    if (selectedChoice) {
      document.querySelector(`.hand-${choice}`).classList.add("selected");
    }
  }
  
  // Element has been clicked, de-select if already chosen
  function handleChoiceClick(event) {
    // console.log('Clicked:', event.target);
    const choice = event.target.dataset.choice;
    
    if (selectedChoice === choice) {
      event.target.classList.remove("selected");
      selectedChoice = null;

    } else {
      playerChoice(choice);
    }
  }

  // Add click listeners from choiceElements
  choiceElements.forEach(elem => {
    // console.log('Adding click listener to:', elem);
    elem.addEventListener('click', handleChoiceClick);
  });

  // play "letsGo" button listener
  letsGoButton.addEventListener("click", function () {
    if (letsGoButton.textContent === "Play Again?") {
      clearChoices();
      addChoiceEventListeners(); // Re-enable choice listeners for a new game
    } else {
      if (selectedChoice) {
        playGame(selectedChoice);
        removeChoiceEventListeners(); // Disable choices after game starts
      } else {
        console.log("No choice selected"); // null choice
      }
    }
  });

  // add listeners after game end
  function addChoiceEventListeners() {
    choiceElements.forEach(elem => {
      elem.addEventListener('click', handleChoiceClick);
    });
  }
  
  // remove listeners after game start
  function removeChoiceEventListeners() {
    choiceElements.forEach(elem => {
      elem.removeEventListener('click', handleChoiceClick);
    });
  }

  // transform letsGo playbutton
  function updatePlayButton() {
    letsGoButton.textContent = "Play Again?";
    letsGoButton.classList.add("play-again");

  }

  // clear the board
  function clearChoices() {
    // console.log("Clearing Choices");
    choiceElements.forEach(button => {
      button.classList.remove('selected', 'computer-selected', `hand-${selectedChoice}-draw`);
    });
    textWrapper.textContent = "";
    selectedChoice = null;
    letsGoButton.textContent = "Let's Go!";
    letsGoButton.classList.remove("play-again");
  }

  // game start + computer choice
  function playGame(playerChoice) {
    // console.log("Playing the game with move:", playerChoice);
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    // console.log("Computer picks:", computerChoice);
    

    textWrapper.textContent = "Ready? Here we go!";
    
    let count = 0;
    const countdown = ['Rock!', 'Paper!', 'Scissors!'];
    const countdownInterval = setInterval(() => {
      textWrapper.textContent = countdown[count];
      count++;
      if (count === countdown.length) {
        clearInterval(countdownInterval);
        whoWon(computerChoice);
      }
    }, 1000);
  }

  // determine winner + display computer selection
  function whoWon(computerChoice) {
    let computerChoiceElement = document.querySelector(`.hand-${computerChoice}`);
    let playerChoiceElement = document.querySelector(`.hand-${selectedChoice}`);
    
    let result;
    //  console.log("Player Choice: ", selectedChoice, "Computer Choice: ", computerChoice)
    if (selectedChoice === computerChoice) {
      playerChoiceElement.classList.remove('selected', 'computer-selected');
      playerChoiceElement.classList.add(`hand-${selectedChoice}-draw`);

      result = "It's a tie!";
      
    } else if (
      (selectedChoice === "rock" && computerChoice === "scissors") ||
      (selectedChoice === "paper" && computerChoice === "rock") ||
      (selectedChoice === "scissors" && computerChoice === "paper")
    ) {
      computerChoiceElement.classList.add('computer-selected'); // Style computer Choice
      result = "You win!";
      
    } else {
      computerChoiceElement.classList.add('computer-selected'); 
      result = "Computer wins!";
      
    }

    setTimeout(() => {
      textWrapper.textContent = result;
      updatePlayButton();
    }, 1000);
  }


});

