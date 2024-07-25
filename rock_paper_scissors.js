// test for external link console.log('hello')

// random computer choice code
let getComputerChoice = () => {
    let rand = Math.random();
    let cpu;
    if (rand <= 0.333) {
        cpu = 'rock'
    } else if (rand > 0.333 && rand <= 0.666) {
        cpu = 'paper'
    } else if (rand > 0.666) {
        cpu = 'scissors'
    }
    console.log(cpu) 
}
getComputerChoice()

// human choice
let getHumanChoice = () => {
    let myChoice = prompt('Choose rock, paper, or scissors.');
    if (myChoice === undefined || myChoice === null || myChoice === '') {
        return getHumanChoice()
    } else if (myChoice.toLowerCase() === 'rock') {
        return myChoice = 'rock'
    } else if (myChoice.toLowerCase() === 'paper') {
        return myChoice = 'paper'
    } else if (myChoice.toLowerCase() === 'scissors') {
        return myChoice = 'scissors'
    }
}
getHumanChoice()
