let hangMan = ['scaffold', 'head', 'body', 'arms', 'legs'];
let randomWord = wordList[Math.floor(Math.random() * wordList.length)];
console.log(randomWord);
let display = Array(randomWord.length).fill("_");
let lives = 0;
let wrongLetter = [];
let interval;
// get HTML elements:
let playButton = document.querySelector("#play");
let inputHTML = document.querySelector('#user-guess');
let displayHTML = document.querySelector("#display");
let wrongLetterHTML = document.querySelector("#wrong-letters");
let gameoverHTML = document.querySelector("#gameover");
let playAgainButton = document.querySelector("#play-again");
displayHTML.innerHTML = display.join(" ");
// add eventlisteners:
playButton.addEventListener('click', function playListener() {
    playButton.style.display = "none";
    document.querySelector('.game-container').style.display = "block";
    inputHTML.focus();
    let count = 60;
    interval = setInterval(function () {
        document.getElementById('count').innerHTML = count;
        if (count === 0) {
            gameover('timeout');
        }
        count--;
    }, 1000);
})

playAgainButton.addEventListener('click', () => {
    //nollställl spelet:
    inputHTML.style.display = "inline";
    document.querySelector("figure").classList.remove("legs", "head", "scaffold", "arms", "body");
    playAgainButton.style.display = 'none'
    wrongLetterHTML.innerHTML = "";
    randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(randomWord);
    display = Array(randomWord.length).fill("_");
    displayHTML.innerHTML = display.join(" ");
    lives = 0;
    wrongLetter = [];
    gameoverHTML.innerHTML = "";
    playButton.click(); // simulera ett klick på play för att starta nytt spel
})

inputHTML.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        let character = inputHTML.value;
        inputHTML.value = "";
        let userGuess = character.toLowerCase();
        if (userGuess.length === 1) {
            for (let i = 0; i < randomWord.length; i++) {
                let letter = randomWord[i]
                if (userGuess === letter) {
                    display.splice(i, 1, letter);
                }
            }
        } else {
            alert("Enter 1 letter at a time");
            return
        }
        if (randomWord.includes(userGuess) === false) {
            if (!wrongLetter.includes(userGuess)) {
                wrongLetter.push(userGuess);
                document.querySelector('figure').classList.add(hangMan[lives]);
                lives++;
            }
            if (lives === 5) {
                gameover('loss')
            }
        } else if (display.includes("_") === false) {
            gameover("win");
        }
        displayHTML.innerHTML = display.join(" ");
        wrongLetterHTML.innerHTML = wrongLetter.join(" ");
    }
})

function gameover(text) {
    clearInterval(interval);
    inputHTML.style.display = "none";
    playAgainButton.style.display = 'block'
    if (text === 'loss') {
        gameoverHTML.innerHTML = `Game Over, you lost... The word was: ${randomWord}`;
    } else if (text === "win") {
        gameoverHTML.innerHTML = "You guessed the word, Congratz!";
    } else {
        gameoverHTML.innerHTML = `Game over! You ran out of time... The word was: ${randomWord}`;

    }
}
