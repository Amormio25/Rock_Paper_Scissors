//  create all variables
let playerHealth = document.querySelector('#playerBarOrange');
let cpuHealth = document.querySelector('#playerBarOrange2');
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
    timer();
};

gameButton.addEventListener('click', () => {
// if i dispatch event to game btn and set bubbles true, this listener below should be on game btn
    document.addEventListener('gameStarted', (startEvent) => {
        console.log(startEvent.detail.message);
        gameResponses.removeChild(gameButton);
        setTimeout(() => {
            gameResponses.textContent = 'Fight!';
        }, 350);
    });
    startGame();
    addChoiceListeners();
});

function timer() {
    let seconds = 2;
    const countdown = setInterval(() => {
        roundTimer.textContent = seconds.toString();
        seconds -= 1;
        if (seconds < 0) {
            clearInterval(countdown);
            timerExpired();
        }
    }, 1000);
    //  stop activity if player makes a choice
    document.addEventListener('choiceClicked', () => {
        clearInterval(countdown);
    });
};

function timerExpired() {
    removeChoiceListeners();
    reducePlayerHealth();
    gameResponses.textContent = 'You ran out of time!'
    roundEnd();
};

function reducePlayerHealth() {
    let playerHealthStyle = getComputedStyle(playerHealth);
    let width = parseFloat(playerHealthStyle.width); 
    let parentWidth = playerHealth.parentElement.offsetWidth;
    let percentWidth = width / parentWidth * 100;
    let newPercentWidth = percentWidth - 20;
    playerHealth.style.width = `${newPercentWidth}%`
}

function reduceCpuHealth() {
    let cpuHealthStyle = getComputedStyle(cpuHealth);
    let width = parseFloat(cpuHealthStyle.width); 
    let parentWidth = cpuHealth.parentElement.offsetWidth;
    let percentWidth = width / parentWidth * 100;
    let newPercentWidth = percentWidth - 20;
    cpuHealth.style.width = `${newPercentWidth}%`
    cpuHealth.style.left = '499px';
}

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
    rpsChoice.addEventListener('click', playerChoice, {once: true});
};

function removeChoiceListeners() {
    imgChoice.forEach((img) => {
        img.classList.remove('imgHover');
    });
    // make later adjustment for green/red when it's win/lose
    rpsChoice.removeEventListener('mouseover', hoverToggleOn);
    rpsChoice.removeEventListener('mouseout', hoverToggleOff);
    rpsChoice.removeEventListener('click', playerChoice)
}

function playerChoice(event) {
    if (event.target.matches('img')) {
        event.target.classList.add('imgHover');
        event.target.parentElement.style.backgroundColor = 'limegreen';
        removeChoiceListeners(event);
        let clickEvent = new CustomEvent('choiceClicked', {
            detail: {message: 'Choice clicked!'},
            capture: true
        });
        document.dispatchEvent(clickEvent);
    };
    // event.target.classList.add('imgHover');
    // // make later adjustment for green/red when it's win/lose
    // event.target.parentElement.style.backgroundColor = 'limegreen';
    // rpsChoice.removeEventListener('mouseover', hoverToggleOn);
    // rpsChoice.removeEventListener('mouseout', hoverToggleOff);
    // let clickEvent = new CustomEvent('choiceClicked', {
    //     detail: {message: 'Choice clicked!'},
    //     capture: true
    // });
    // document.dispatchEvent(clickEvent);
};

function roundEnd() {
// call reduce function depending on loser
    let seconds = 3;
    const countdown = setInterval(() => {
        gameResponses.textContent = seconds.toString()
        seconds -= 1
        if (seconds < 0) {
            clearInterval(countdown);
            gameResponses.textContent = 'Fight!'
            startNextRound();
        }
    }, 1000);
};

function startNextRound() {
    addChoiceListeners();
    timer();
}

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