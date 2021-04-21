//FUNCTION THAT RUNS FROM THE GAME STARTS TILL THE GAME ENDS
const game = () => {
  //GLOBAL VARIABLES
  //SCORES VARIABLE
  let pScore = 0;
  let cScore = 0;

  //SCORE CONTAINER AND TEXTS INSIDE IT
  let pScoreContainer = document.querySelector(".score div:first-child");
  let cScoreContainer = document.querySelector(".score div:nth-child(2)");
  let pScoretext = document.querySelector(".player-score");
  let cScoretext = document.querySelector(".computer-score");

  //FUNCTION TO START THE GAME AND TO INTIALIZE THE GAME
  const startGame = () => {
    //INTRO
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");

    //MATCH
    const match = document.querySelector(".match");
    const winner = document.querySelector(".winner");

    //HANDS
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");

    //SCORES
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");

    //start the game
    playBtn.addEventListener("click", () => {
      //console.log("game starts");
      // console.log(pScore);
      // console.log(cScore);

      //INITIALIZE THE TEXT TO 0
      playerScore.textContent = 0;
      computerScore.textContent = 0;

      //INITIALIZE THE COLOR OF THE TEXT INSIDE THE SCORE CONTAINER
      pScoretext.style.color = "rgb(216, 216, 216)";
      cScoretext.style.color = "rgb(216, 216, 216)";

      //INTIALIZE THE BACKGROUND OF THE SCORE CONTAINER
      pScoreContainer.style.background = "rgb(70, 87, 82)";
      cScoreContainer.style.background = "rgb(70, 87, 82)";

      //INITIALIZE THE TEXT OF THE CLASS WINNER
      winner.textContent = "Choose an option";

      //INTIALIZE THE IMAGE OF THE HANDS TO BE ROCK / FISTS
      playerHand.src = `./assets/rock.png`;
      computerHand.src = `./assets/rock.png`;

      //REMOVE THE fadeIn AND fadeOut CLASSES ADDED IN gameEnd().
      introScreen.classList.remove("fadeIn");
      match.classList.remove("fadeOut");

      //ADD fadeIn AND fadeOut CLASSES TO INTRO AND MATCH
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };

  //play match
  const playMatch = () => {
    //OPTIONS FOR THE PLAYER TO CHOOSE
    const options = document.querySelectorAll(".options button");
    //PLAYER HAND AND COMPUTER HAND
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    //THE IMAGE OF THE HANDS
    const hands = document.querySelectorAll(".hands img");

    //FUNCTION TO EMPTY THE ANIMATION AFTER THE ANIMATION ENDS SO IT CAN BE USED AGAIN
    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    //computer options, random generated number for the computer hand
    //THIS ARRAY IS FOR THE COMPUTER
    const computerOptions = ["rock", "paper", "scissor"];

    //FUNCTION FOR EVERY TIME OPTION BUTTON IS CLICKED
    options.forEach((option) => {
      //if you only have one parameter, you can remove the parentheses (option), in this case i won't
      //EVERY TIME THE OPTION IS CLICKED, THIS FUNCITON EXECUTES
      option.addEventListener("click", function () {
        //the reason we use regular function is so that keyword "this" will always go to window object
        //while if you use the arrow function, it's going to bound to options object.
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        //INITIALIZE THE ROCK/FIST IMAGE SO THE IMAGE WOULD BE FISTS BEFORE THE REAL IMAGE SHOW UP
        playerHand.src = `./assets/rock.png`;
        computerHand.src = `./assets/rock.png`;

        setTimeout(() => {
          //CALL compareHands(x1,x2) TO DECIDE WHO WINS
          compareHands(this.textContent, computerChoice);

          //UPDATE THE IMAGES TO THE REAL IMAGE
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
        }, 2000);

        //THE ANIMATION CREATED IN CSS IS BEING CALLED HERE
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  //FUNCTION TO UPDATE THE SCORE EVERY ROUND
  const updateScore = () => {
    //SCORE TEXT IN SCORE CONTAINER
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");

    //INSERT THE pScore INTO THE TEXT
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;

    // console.log(pScore);
    // console.log(cScore);

    //IF THE pScore or the cScore is 5, the game will end
    if (pScore === 5 || cScore === 5) {
      //CALL THE gameEnd() function to end the game
      gameEnd();

      //initialize the value 0 to the pScore and cScore
      pScore = 0;
      cScore = 0;
    }
  };

  //COMPARING THE HANDS TO SEE WHO WINS EVERY ROUND
  const compareHands = (playerChoice, computerChoice) => {
    //SELECT THE .winner CLASS
    const winner = document.querySelector(".winner");

    //CHECK WHO WINS THE ROUND WITH THE IF STATEMENT
    if (playerChoice === computerChoice) {
      winner.textContent = "It's a tie";
      return;
    }

    if (playerChoice === "rock") {
      if (computerChoice === "scissor") {
        winner.textContent = "Player Wins";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      }
    }

    if (playerChoice === "paper") {
      if (computerChoice === "rock") {
        winner.textContent = "Player Wins";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      }
    }

    if (playerChoice === "scissor") {
      if (computerChoice === "paper") {
        winner.textContent = "Player Wins";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      }
    }
  };

  //END THE GAME WITH THIS FUNCTION
  const gameEnd = () => {
    //SELECT CLASS .intro
    const introScreen = document.querySelector(".intro");
    //SELECT CLASS .match
    const match = document.querySelector(".match");
    //SELECT h1 IN THE CLASS .intro
    const introHeader = document.querySelector(".intro h1");

    // console.log("game ends");
    // console.log(pScore);
    // console.log(cScore);

    //CHECK WHO WINS THE GAME (NOT THE ROUND)
    if (pScore > cScore) {
      //CHANGE THE INTRO HEADER
      introHeader.textContent = "Player Wins!";
      //CHANGE THE BACKGROUND OF SCORE CONTAINER
      pScoreContainer.style.background = "rgb(0, 228, 0)";
      cScoreContainer.style.background = "red";
      //CHANGE THE COLOR OF THE TEXT OF THE WINNING CONTAINER
      pScoretext.style.color = "#000";
    } else {
      introHeader.textContent = "Computer Wins!";
      cScoreContainer.style.background = "rgb(0, 228, 0)";
      pScoreContainer.style.background = "red";
      cScoretext.style.color = "#000";
    }

    //REMOVE THE CLASS fadeOut and fadeIn ADDED AT THE START OF THE GAME
    introScreen.classList.remove("fadeOut");
    match.classList.remove("fadeIn");

    //ADD A NEW fadeIn and fadeOut AT THE END OF THE GAME
    introScreen.classList.add("fadeIn");
    match.classList.add("fadeOut");
  };

  //call all the inner function
  startGame();
  playMatch();
};

//start the game function
game();
