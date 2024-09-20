//  create all variables
let playerScore = 0, 
    cpuScore = 0,
    playerHealth = document.querySelector('#playerBarOrange'),
    cpuHealth = document.querySelector('#playerBarOrange2'),
    round = document.querySelector('#round'),
    roundTimer = document.querySelector('#timer'),
    rpsChoice = document.querySelector('#choices'),
    imgChoice = document.querySelectorAll('img'),
    gameResponses = document.querySelector('#gameText'),
    gameButton = document.querySelector('#gameCtrl'),
    fightDisplay = document.querySelectorAll('#game img'),
    displayIds = Array.from(fightDisplay);
    console.log(displayIds)
    // playerPunch = document.querySelector('#playerPunch')
    // playerBlock = document.querySelector('#playerBlock')
    // playerKO = document.querySelector('#playerKO')
    // playerNA = document.querySelector('#playerNA')
    // cpuPunch = document.querySelector('#cpuPunch')
    // cpuBlock = document.querySelector('#cpuBlock')
    // cpuKO = document.querySelector('#cpuKO')
    // cpuNA = document.querySelector('#cpuNA')


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
    let seconds = 10;
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
    startNextRound();
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
    rpsChoice.addEventListener('click', playerChoice);
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
        removeChoiceListeners();
        let picked = document.getElementById(event.target.id)        
        let playerPick = event.target.id
        let cpuPick = cpuChoice()
        setTimeout(() => {
            console.log('working..')
            picked.parentElement.style.backgroundColor = 'white';
            startNextRound();
        }, 2000);

        // result changes button color, health bar, and text
        const result = roundResult(playerPick, cpuPick)
        if (result === 'You lose!') {
            event.target.parentElement.style.backgroundColor = 'red';
            gameResponses.textContent = 'You lose!'
        } else if (result === 'You win!') {
            event.target.parentElement.style.backgroundColor = 'limegreen';
            gameResponses.textContent = 'You win!'
        } else {
            event.target.parentElement.style.backgroundColor = 'white';
            gameResponses.textContent = 'Tie!'
        }
        let clickEvent = new CustomEvent('choiceClicked', {
            detail: {message: 'Choice clicked!'},
            capture: true
        });
        document.dispatchEvent(clickEvent);
    };
};

function cpuChoice() {
    let rand = Math.random(),
        cpuPick;
    if (rand <= 1/3) {
        cpuPick = 'rock';
    } else if (rand <= 2/3) {
        cpuPick = 'paper';
    } else {
        cpuPick = 'scissors'
    };
    console.log(`cpu: ${cpuPick}`)
    return cpuPick
};

// function roundResult(playerPick, cpuPick) {
//     if (playerPick === cpuPick) {
//         console.log(`It\'s a tie! Both chose ${playerPick}!`)
//     } else if (playerPick === 'rock'  && cpuPick === 'paper') {
//         console.log('You lose! Paper beats rock!')
//         reducePlayerHealth();
//     } else if (playerPick === 'paper'  && cpuPick === 'scissors') {
//         console.log('You lose! Scissors beats paper!')
//         reducePlayerHealth();
//     } else if (playerPick === 'scissors'  && cpuPick === 'rock') {
//         console.log('You lose! Rock beats scissors!')
//         reducePlayerHealth();
//     } else if (playerPick === 'rock'  && cpuPick === 'scissors') {
//         console.log('You win! Rock beats scissors!')
//         reduceCpuHealth();
//     } else if (playerPick === 'paper'  && cpuPick === 'rock') {
//         console.log('You win! Paper beats rock!')
//         reduceCpuHealth();
//     } else if (playerPick === 'scissors'  && cpuPick === 'paper') {
//         console.log('You win! Scissors beats paper!')
//         reduceCpuHealth();
//     }
// };

function roundResult(playerPick, cpuPick) {
    let result;
    imgChoice.forEach((img) => {
        img.classList.remove('imgHover');
    });
    displayIds
        .filter(img => img.id === 'playerNA' || img.id === 'cpuNA')
        .forEach(img => img.style.opacity = 0)
    if (playerPick === cpuPick) {
        result = 'Tie!'
        let rand = Math.random()
        if (rand <= 0.5) {
            displayIds.find(img => img.id === 'playerPunch').style.opacity = 1
            displayIds.find(img => img.id === 'cpuBlock').style.opacity = 1
        } else {
            displayIds.find(img => img.id === 'playerBlock').style.opacity = 1
            displayIds.find(img => img.id === 'cpuPunch').style.opacity = 1
        }
    } else if (playerPick === 'rock'  && cpuPick === 'paper') {
        result = 'You lose!'
        displayIds.find(img => img.id === 'cpuPunch').style.opacity = 1
        displayIds.find(img => img.id === 'playerKO').style.opacity = 1
        reducePlayerHealth();
    } else if (playerPick === 'paper'  && cpuPick === 'scissors') {
        result = 'You lose!'
        displayIds.find(img => img.id === 'cpuPunch').style.opacity = 1
        displayIds.find(img => img.id === 'playerKO').style.opacity = 1
        reducePlayerHealth();
    } else if (playerPick === 'scissors'  && cpuPick === 'rock') {
        result = 'You lose!'
        displayIds.find(img => img.id === 'cpuPunch').style.opacity = 1
        displayIds.find(img => img.id === 'playerKO').style.opacity = 1
        reducePlayerHealth();
    } else if (playerPick === 'rock'  && cpuPick === 'scissors') {
        result = 'You win!'
        displayIds.find(img => img.id === 'playerPunch').style.opacity = 1
        displayIds.find(img => img.id === 'cpuKO').style.opacity = 1
        reduceCpuHealth();
    } else if (playerPick === 'paper'  && cpuPick === 'rock') {
        result = 'You win!'
        displayIds.find(img => img.id === 'playerPunch').style.opacity = 1
        displayIds.find(img => img.id === 'cpuKO').style.opacity = 1
        reduceCpuHealth();
    } else if (playerPick === 'scissors'  && cpuPick === 'paper') {
        result = 'You win!'
        displayIds.find(img => img.id === 'playerPunch').style.opacity = 1
        displayIds.find(img => img.id === 'cpuKO').style.opacity = 1
        reduceCpuHealth();
    }
    return result
};

function startNextRound() {
// call reduce function depending on loser
    let seconds = 3;
    const countdown = setInterval(() => {
        gameResponses.textContent = seconds.toString()
        seconds -= 1
        if (seconds < 0) {
            fightDisplay.forEach(img => img.style.opacity = 0);
            displayIds
                .filter(img => img.id === 'playerNA' || img.id === 'cpuNA')
                .forEach(img => img.style.opacity = 1);
            clearInterval(countdown);
            gameResponses.textContent = 'Fight!'
            addChoiceListeners();
            timer();
        }
    }, 1000);
};


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