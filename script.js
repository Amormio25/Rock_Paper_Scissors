//  create all variables
let playerScore = 0, 
    cpuScore = 0,
    playerName = document.querySelector('#playerName'),
    playerHealth = document.querySelector('#playerBarOrange'),
    cpuName = document.querySelector('#cpuName'),
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

    let playerHealthStyle
    let playerWidth
    let playerParentWidth
    let playerPercentWidth
    let playerNewPercentWidth = 100

    let cpuHealthStyle
    let cpuWidth
    let cpuParentWidth
    let cpuPercentWidth 
    let cpuNewPercentWidth = 100

function resetParameters() {
    console.log("reset working")
    playerHealth.style.width = '100%'
    cpuHealth.style.width = '100%'
    displayIds.forEach(img => img.style.opacity = 0)
    displayIds
        .filter(img => img.id === 'playerNA' || img.id === 'cpuNA')
        .forEach(img => img.style.opacity = 1)
}

function startGame() {
    resetParameters()
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
    playerHealthStyle = getComputedStyle(playerHealth);
    playerWidth = parseFloat(playerHealthStyle.width); 
    playerParentWidth = playerHealth.parentElement.offsetWidth;
    playerPercentWidth = playerWidth / playerParentWidth * 100;
    playerNewPercentWidth = playerPercentWidth - 100;
    console.log(playerNewPercentWidth)
    playerHealth.style.width = `${playerNewPercentWidth}%`
    if (playerNewPercentWidth < 1) { // health bars act as listeners for ending game
        setTimeout(() => {
            endGame('cpu')
        }, 2000)
    }
    return playerNewPercentWidth
}

function reduceCpuHealth() {
    cpuHealthStyle = getComputedStyle(cpuHealth);
    cpuWidth = parseFloat(cpuHealthStyle.width); 
    cpuParentWidth = cpuHealth.parentElement.offsetWidth;
    cpuPercentWidth = cpuWidth / cpuParentWidth * 100;
    cpuNewPercentWidth = cpuPercentWidth - 100;
    cpuHealth.style.width = `${cpuNewPercentWidth}%`
    cpuHealth.style.left = '499px';
    if (cpuNewPercentWidth < 1) { // health bars act as listeners for ending game
        setTimeout(() => {
            endGame('player')
        }, 2000)
    }
    return cpuNewPercentWidth
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


function roundResult(playerPick, cpuPick) {
    console.log('roundresult')
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

function playerChoice(event) {
    if (event.target.matches('img')) {
        event.target.classList.add('imgHover');
        removeChoiceListeners();
        let picked = document.getElementById(event.target.id)        
        let playerPick = event.target.id
        let cpuPick = cpuChoice()
        
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

        console.log('starting next round, should be after roundresult')
        setTimeout(() => {
            console.log('working..')
            picked.parentElement.style.backgroundColor = 'white';
            // cant do that with quote
            console.log(cpuNewPercentWidth)
            console.log(playerNewPercentWidth)
            if (cpuNewPercentWidth > 1 && playerNewPercentWidth > 1) {
                startNextRound();
            }
        }, 2000);

    };
};

function endGame(winner) {
    removeChoiceListeners()
    console.log('working')
    if (winner === 'player') {
        playerName.textContent = 'Champion'
        cpuName.textContent = 'Former Champion'
        gameResponses.textContent = 'You are the new champion!'
        // remove listeners
        // append start game again but with dif text
    } else {
        gameResponses.textContent = 'You fought hard! Keep training!'
    }
    setTimeout(() => {
        console.log('bragh')
        gameResponses.textContent = ''
        gameResponses.appendChild(gameButton)
        gameButton.textContent = 'Rematch?'
        gameButton.addEventListener('click', startGame)
    }, 2000)
}

// make everything more clear, and put function for resetting parameters