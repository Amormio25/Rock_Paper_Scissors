// In our UI, the player should be able to play the game by clicking 
// on buttons rather than typing their answer in a prompt.

// For now, remove the logic that plays exactly five rounds.

// Create three buttons, one for each selection. 

// Add an event listener to the buttons that call your playRound function 
// with the correct playerSelection every time a button is clicked. 
// (you can keep the console.logs for this step)

// Add a div for displaying results and change all of your console.logs into DOM methods.

// Display the running score, and announce a winner of the game once one player reaches 5 points.

// You will likely have to refactor (rework/rewrite) your original code to make it work for this. 
// That’s OK! Reworking old code is an important part of a programmer’s life.




// Plan

// Upper UI
    // player and cpu 5 health bars
    // health bars are surrounded by black border, gray padding, red bars that fade out when player or cpu loses

// Game UI
    // Ippo (player) on left, Miyata (cpu) on right
    // Display round n, fight with slight time interval before every fight

    // 10 second timer
    // choose rps with the images as hover buttons below the upper UI
    // depending on who wins, make event listener change the fighters (ippo down if player loses, miyata punch)
    // Display KO! followed by You Lose or You win, etc, with time interval
    // reset timer


// Look at Canva design
// The three main divs are the 
    // header (health bar, timer, Round)
        // design health bar on stylesheet
        // create timer on script.js
        // update round (could simply display text and change that text upon each round on js file)
    // choice rectangle
        // make white box turn slightly gray on hover, and rps img larger on hover
        // make green box if win, red if lose, white if tie
    // game UI
        // using event listeners on the buttons, change ippo pic and coordinates depending on the result
// let gameDiv = document.querySelector('#game')
// let bg = document.querySelector('#bg')


// gameDiv.append(bg)
// let par = document.createElement('p')
// par.style.cssText = 'font-family: "Pixel"; color: white;'
// par.textContent = 'FIGHT!'
// bg.body.append(par)








//  GAME PLAN
//  To start and restart a game, have middle text clickable, then change it back to text for ('you lost/win')

//  create all variables
let headerElements = document.querySelector('#header');
let round = document.querySelector('#round');
let roundTimer = document.querySelector('#timer');
let rpsChoice = document.querySelector('#choices');
let imgChoice = document.querySelectorAll('img');
let gameResponses = document.querySelector('#gameText');
let gameButton = document.querySelector('#gameCtrl')
let fightDisplay = document.querySelector('#game');


function startGame() {
    const startEvent = new CustomEvent('gameStarted', {
        detail: {message: 'The game has started!'},
        // bubbles: true
        capture: true
    });
    // gameButton.dispatchEvent(startEvent);
    document.dispatchEvent(startEvent);
};

gameButton.addEventListener('click', () => {
// if i dispatch event to game btn and set bubbles true, this listener below should be on game btn
    document.addEventListener('gameStarted', (startEvent) => {
        console.log(startEvent.detail.message);
        gameResponses.removeChild(gameButton);
        setTimeout(() => {
            gameResponses.textContent = 'Choose your Character!';
        }, 350);
    });
    startGame();
});

function timer() {
    let seconds = 10;
    const countdown = setInterval(() => {
        seconds -= 1;
        roundTimer.textContent = seconds.toString();
        if (seconds <= 0) {
            clearInterval(countdown);
            timerExpired();
        }
    }, 1000);
    document.addEventListener('choiceClicked', () => {
        clearInterval(countdown);
    });
};

function timerExpired() {
    rpsChoice.removeEventListener('mouseover', hoverToggleOn);
    rpsChoice.removeEventListener('mouseout', hoverToggleOff);
    imgChoice.forEach((img) => {
        img.classList.remove('imgHover');
    });
    rpsChoice.removeEventListener('click', removeChoiceListeners);
    matchEnd();
}

document.addEventListener('gameStarted', timer);

function hoverToggleOn(event) {
    if (event.target.matches('img')) {
        event.target.classList.add('imgHover');
    };
};

function hoverToggleOff(event) {
    if (event.target.matches('img')) {
        event.target.classList.remove('imgHover');
    };
};

function addChoiceListeners() {
    rpsChoice.addEventListener('mouseover', hoverToggleOn);
    rpsChoice.addEventListener('mouseout', hoverToggleOff);
//  implement a listener for each round so that this occurs again, not just once
    rpsChoice.addEventListener('click', removeChoiceListeners, {once: true});
};

function removeChoiceListeners(event) {
    if (event.target.matches('img')) {
        imgChoice.forEach((img) => {
            img.classList.remove('imgHover');
        });
    };
    event.target.classList.add('imgHover');
    // make later adjustment for green/red when it's win/lose
    event.target.parentElement.style.backgroundColor = 'limegreen';
    rpsChoice.removeEventListener('mouseover', hoverToggleOn);
    rpsChoice.removeEventListener('mouseout', hoverToggleOff);
    let clickEvent = new CustomEvent('choiceClicked', {
        detail: {message: 'Choice clicked!'},
        capture: true
    });
    document.dispatchEvent(clickEvent);
}

document.addEventListener('gameStarted', addChoiceListeners);

// function that listens for choice clicked to change health, characters, game text, etc


// function add(event) {
//     event.target.classList.add('imgHover');
// }

// function remove(event) {
//     event.target.classList.remove('imgHover');
// }

// function addChoiceListeners() {
//     console.log('setting up listeners')
//     createChoiceListener('mouseover', 'img', add)
//     createChoiceListener('mouseout', 'img', remove)
// };





// custom event for choice selection
// function getHumanChoice() {
//     console.log('working')
//     createChoiceListener('click', 'img', () => {
//         rpsChoice.removeEventListener('mouseover', add);
//         rpsChoice.removeEventListener('mouseout', remove);
//     });
// }

// getHumanChoice()





// when you click choice, remove the hover listeners and make choice hover as humanChoice

// // human choice
// let getHumanChoice = () => {
//     myChoice = myChoice.toLowerCase();
//     if (myChoice !== 'rock' && myChoice !== 'paper' && myChoice !== 'scissors') {
//         alert('Invalid option. Please try again.');
//         return getHumanChoice();    
//     } else {
//         return myChoice;
//     }
//  }
















//      Round, Timer, Health, Characters, Choices Display
//              choices



//          Timer, Constantly runs down until choice is selected
//      After Choice is selected, stop all events, display results
//          Based on results, change health, characters, game text if needed
//          Countdown with game text for next round
//          After 3 seconds, reset timer, change round, put neutral characters, etc
//      Keep doing this until player or cpu loses (health bar width = 0%)
//          Declare winner, show KO, stop all events until play again comes









// // score values
// let humanScore = 0,
//     computerScore = 0;

// // random computer choice code
// let getComputerChoice = () => {
//     let rand = Math.random();
//     let cpu;
//     if (rand <= 1/3) {
//         cpu = 'rock'
//     } else if (rand <= 2/3) {
//         cpu = 'paper'
//     } else {
//         cpu = 'scissors'
//     } 
//     return cpu;
// }

// // human choice
// let getHumanChoice = () => {
//     let myChoice = prompt('Choose rock, paper, or scissors.');
//     myChoice = myChoice.toLowerCase();
//     if (myChoice !== 'rock' && myChoice !== 'paper' && myChoice !== 'scissors') {
//         alert('Invalid option. Please try again.');
//         return getHumanChoice();    
//     } else {
//         return myChoice;
//     }
//  }

//  // one round
// let playRound = (humanChoice, computerChoice) => {
//     if (humanChoice === computerChoice) {
//         alert(`It\'s a tie! Both chose ${humanChoice}!`)
//     } else if (humanChoice === 'rock'  && computerChoice === 'paper') {
//         alert('You lose! Paper beats rock!')
//         computerScore++
//     } else if (humanChoice === 'paper'  && computerChoice === 'scissors') {
//         alert('You lose! Scissors beats paper!')
//         computerScore++
//     } else if (humanChoice === 'scissors'  && computerChoice === 'rock') {
//         alert('You lose! Rock beats scissors!')
//         computerScore++
//     } else if (humanChoice === 'rock'  && computerChoice === 'scissors') {
//         alert('You win! Rock beats scissors!')
//         humanScore++
//     } else if (humanChoice === 'paper'  && computerChoice === 'rock') {
//         alert('You win! Paper beats rock!')
//         humanScore++
//     } else if (humanChoice === 'scissors'  && computerChoice === 'paper') {
//         alert('You win! Scissors beats paper!')
//         humanScore++
//     }
// }

// let playGame = () => {
//     for (i = 0; i < 5; i++) {
//         humanSelection = getHumanChoice()
//         computerSelection = getComputerChoice()
//         playRound(humanSelection, computerSelection)
//         alert(`Your score: ${humanScore}. Computer score: ${computerScore}.`)
//     }   
//     if (humanScore > computerScore) {
//         alert(`You win! Final score is ${humanScore} to ${computerScore}.`)
//     } else if (humanScore === computerScore) {
//         alert( `Tie! Final score is ${humanScore} to ${computerScore}.`)
//     } else {
//         alert(`You lose! Final score is ${humanScore} to ${computerScore}.`)
//     }
// }

// playGame()