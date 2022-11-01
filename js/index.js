/**
 För att toggla SVG:en
 document.querySelector('figure').classList.add('scaffold')
 document.querySelector('figure').classList.add('head')
 document.querySelector('figure').classList.add('body')
 document.querySelector('figure').classList.add('arms')
 document.querySelector('figure').classList.add('legs')

 */
let hangMan =['scaffold','head','body', 'arms', 'legs' ];
let wordList = ["apple", "camel", "sweden"];
let randomWord = wordList[Math.floor(Math.random()*wordList.length)];
let display = Array(randomWord.length).fill("_");
let lives = 0;
let wrongLetter = [];
//let userGuess = '';
let displayHTML = document.querySelector("#display");
displayHTML.innerHTML = display.join(" ");
let inputHTML = document.querySelector('#user-guess');
let wrongLetterHTML = document.querySelector("#wrong-letters");
let playButton = document.querySelector("#play");
let interval;
playButton.addEventListener('click', () => {
    playButton.style.display = "none";
    document.querySelector('.game-container').style.display ="block";
    let count = 20;
    interval = setInterval(function(){
    document.getElementById('count').innerHTML=count;
    if (count === 0){
        // clearInterval(interval);
        gameover('loss');
        // document.getElementById('count').innerHTML='Done';
        // or...
        // alert("You're out of time!");
    }
    count--;
    }, 1000);
})

function getKeyboardKey(){
    inputHTML.addEventListener('keydown', (event) => {
        if(event.key === "Enter") {
            letterChecker(inputHTML.value);
        }
    })
}
//console.log(userGuess);
console.log(randomWord);

function letterChecker(character){

    inputHTML.value = "";
    let userGuess = character;
    console.log(userGuess);
    if(userGuess.length === 1){
        for (let i =0; i < randomWord.length; i++){
            let letter = randomWord[i]
            if(userGuess === letter){
                display.splice(i, 1, letter);
            }
        }

    } else {
        alert("Enter 1 letter at a time")
    }
    if(randomWord.includes(userGuess) === false){
        wrongLetter.push(userGuess);
        document.querySelector('figure').classList.add(hangMan[lives]);
        lives ++;
        if(lives === 5) {
            gameover('loss')
        }
    }
    else if(display.includes("_") === false){
        gameover("win");
    }
    displayHTML.innerHTML = display.join(" ");
    wrongLetterHTML.innerHTML = wrongLetter.join(" ");
}

getKeyboardKey();

function gameover(text) {
    clearInterval(interval);
    let gameoverHTML = document.querySelector("#gameover");
    let playAgainButton = document.querySelector("#play-again");
    playAgainButton.style.display = 'block'
    playAgainButton.addEventListener('click', () => {
        location.reload();
    })
    if(text === 'loss'){
        gameoverHTML.innerHTML = `Game Over, you lost... The word was: ${randomWord}`;
        inputHTML.style.display = "none";
        // playButton.style.display = "block"
    }
    else if (text === "win"){
        gameoverHTML.innerHTML = "You guessed the word, Congratz!";
        inputHTML.style.display = "none";

    }
}

