// score values
let humanScore = 0,
    computerScore = 0;

// random computer choice code
let getComputerChoice = () => {
    let rand = Math.random();
    let cpu;
    if (rand <= 1/3) {
        cpu = 'rock'
    } else if (rand <= 2/3) {
        cpu = 'paper'
    } else {
        cpu = 'scissors'
    } 
    return cpu;
}

// human choice
let getHumanChoice = () => {
    let myChoice = prompt('Choose rock, paper, or scissors.');
    myChoice = myChoice.toLowerCase();
    if (myChoice !== 'rock' && myChoice !== 'paper' && myChoice !== 'scissors') {
        alert('Invalid option. Please try again.');
        return getHumanChoice();    
    } else {
        return myChoice;
    }
 }

 // one round
let playRound = (humanChoice, computerChoice) => {
    if (humanChoice === computerChoice) {
        alert(`It\'s a tie! Both chose ${humanChoice}!`)
    } else if (humanChoice === 'rock'  && computerChoice === 'paper') {
        alert('You lose! Paper beats rock!')
        computerScore++
    } else if (humanChoice === 'paper'  && computerChoice === 'scissors') {
        alert('You lose! Scissors beats paper!')
        computerScore++
    } else if (humanChoice === 'scissors'  && computerChoice === 'rock') {
        alert('You lose! Rock beats scissors!')
        computerScore++
    } else if (humanChoice === 'rock'  && computerChoice === 'scissors') {
        alert('You win! Rock beats scissors!')
        humanScore++
    } else if (humanChoice === 'paper'  && computerChoice === 'rock') {
        alert('You win! Paper beats rock!')
        humanScore++
    } else if (humanChoice === 'scissors'  && computerChoice === 'paper') {
        alert('You win! Scissors beats paper!')
        humanScore++
    }
}

let playGame = () => {
    for (i = 0; i < 5; i++) {
        humanSelection = getHumanChoice()
        computerSelection = getComputerChoice()
        playRound(humanSelection, computerSelection)
        alert(`Your score: ${humanScore}. Computer score: ${computerScore}.`)
    }   
    if (humanScore > computerScore) {
        alert(`You win! Final score is ${humanScore} to ${computerScore}.`)
    } else if (humanScore === computerScore) {
        alert( `Tie! Final score is ${humanScore} to ${computerScore}.`)
    } else {
        alert(`You lose! Final score is ${humanScore} to ${computerScore}.`)
    }
}

playGame()