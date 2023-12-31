const btn_guess = document.querySelector(".btn_guess");
const formLetter = document.querySelector(".form__letter");
const placeholder = document.querySelector(".placeholder");
const message = document.querySelector(".message");
const listOfLetters = document.querySelector(".list__letters");
const subtitle = document.querySelector(".main__subtitle-letters");
const formLabel = document.querySelector(".form__label");
const btnPlay = document.querySelector(".btn_again");
const attempts = document.querySelector(".attempts");

const rulesBtn = document.querySelector(".rules-btn");
const rules = document.querySelector(".rules");
const main = document.querySelector(".main");
const header = document.querySelector(".header");
const closeBtn = document.querySelector(".close");

let hiddenWord = "";
let guessedLetters = [];
let attemptsCount = 5;

const placeholderHtml=hiddenWord=>{
    let fullWord = [];
    for(let letter of hiddenWord){
        fullWord.push('*');
    }
    placeholder.innerText=fullWord.join('');
}

const getWord = ()=>{
    fetch("https://649c7b6e0480757192383bfc.mockapi.io/words")
        .then(res=> res.json())
        .then(data=>{
            const randomIndex = Math.floor(Math.random() * data.length);
            hiddenWord = data[randomIndex].trim();
            placeholderHtml(hiddenWord);
        }) 
}

getWord();

const addListLetters = (letters)=>{
    listOfLetters.innerHTML = "";
    subtitle.classList.add("active")
    for (const letter of letters) {
        let li = document.createElement('li');
        li.innerText = letter;
        li.classList.add('item__letters');
        listOfLetters.append(li);
    }
}

const playAgain = ()=>{
    btn_guess.classList.add('hidden');
    formLetter.classList.add('hidden');
    formLabel.classList.add('hidden');
    btnPlay.classList.remove('hidden');
}

const checkWin = ()=>{
    if(placeholder.innerText == hiddenWord.toUpperCase()){
        message.innerHTML=`<h6 class="victory" >YOU WON!!</h6> <br> Do you want to play again?`;
        playAgain();
    }else if(placeholder.innerText != hiddenWord.toUpperCase() && attemptsCount==1){
        attempts.innerHTML = "You don't have any attempts..."
        message.innerHTML=`<h6 class="victory" >You lose :(</h6> <br> Do you want to play again?`;
        playAgain();
    }
}

const addedGuessedLetter = (guessedLetters)=>{
    const hiddenWordArray =hiddenWord.toUpperCase().split('');
    const revealWord = [];
    for (const letter of hiddenWordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
          } else {
            revealWord.push("*");
          }
    }
    placeholder.innerHTML=revealWord.join('');
    checkWin();
}

btn_guess.addEventListener('click', function(e){
    e.preventDefault();
    if (formLetter.value.length === 0) { message.innerText = "Please enter a letter."; } 
    else if (formLetter.value.length > 1) { message.innerText = "Please enter one letter."; }
    else if (!formLetter.value.match(/[a-zA-Z]/)) { message.innerText = "Please enter a letter from A to Z."; }
    else{
        if(guessedLetters.includes(formLetter.value.toUpperCase())){
            message.innerText = "You have already guessed this letter. Try again!";
        } else{
            guessedLetters.push(formLetter.value.toUpperCase());
            message.innerText = "";
            addedGuessedLetter(guessedLetters);
            if (!hiddenWord.toUpperCase().includes(formLetter.value.toUpperCase())) {
                attemptsCount -= 1;
                attempts.innerHTML = `${attemptsCount} attempts left`;
            }
        }
    } 
    addListLetters(guessedLetters);
    formLetter.value= '';
})

btnPlay.addEventListener('click', function(e){
    e.preventDefault();

    btn_guess.classList.remove('hidden');
    btnPlay.classList.add('hidden');
    subtitle.classList.remove('active');
    formLabel.classList.remove('hidden');
    formLetter.classList.remove('hidden');

    listOfLetters.innerHTML ="";
    message.innerHTML = "";
    attempts.innerHTML = "You have 5 attempts!";
    guessedLetters = [];
    attemptsCount=5;

    getWord();
})

rulesBtn.addEventListener('click', function(){
   main.classList.add('blur');
   header.classList.add('blur');
   rules.classList.remove('hidden');
})

closeBtn.addEventListener('click', function(){
    main.classList.remove('blur');
    header.classList.remove('blur');
    rules.classList.add('hidden');
 })