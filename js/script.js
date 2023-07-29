const btn_guess = document.querySelector(".btn_guess");
const form__letter = document.querySelector(".form__letter");
const placeholder = document.querySelector(".placeholder");
const message = document.querySelector(".message");
const listOfLetters = document.querySelector(".list__letters");
const subtitle = document.querySelector(".main__subtitle-letters");

const hiddenWord = "test";
const guessedLetters = [];

const placeholderHtml=hiddenWord=>{
    let fullWord = [];
    for(let letter of hiddenWord){
        fullWord.push('*');
    }
    placeholder.innerText=fullWord.join('');
}

placeholderHtml(hiddenWord);

btn_guess.addEventListener('click', function(e){
    e.preventDefault();
    if (form__letter.value.length === 0) { message.innerText = "Please enter a letter."; } 
    else if (form__letter.value.length > 1) { message.innerText = "Please enter one letter."; }
    else if (!form__letter.value.match(/[a-zA-Z]/)) { message.innerText = "Please enter a letter from A to Z."; }
    else{
        if(guessedLetters.includes(form__letter.value.toUpperCase())){
            message.innerText = "You have already guessed this letter. Try again!";
        } else{
            guessedLetters.push(form__letter.value.toUpperCase());
            message.innerText = "";
            addedGuessedLetter(guessedLetters);
            
        }
    } 
    addListLetters(guessedLetters);
    form__letter.value= '';
})

const addListLetters = (letters)=>{
    listOfLetters.innerHTML = "";
    subtitle.classList.add("active")
    for (const letter of letters) {
        let li = document.createElement('li');
        li.innerText = letter;
        li.classList.add('item__letters');
        listOfLetters.append(li)
    }
}
const addedGuessedLetter = (guessedLetters)=>{
    const wordArray =hiddenWord.toUpperCase().split('');
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
          } else {
            revealWord.push("*");
          }
    }
    placeholder.innerHTML=revealWord.join('');
    checkWin();
}

const checkWin = ()=>{
    if(placeholder.innerText == hiddenWord.toUpperCase()){
        message.innerText="you won!!";
    }
}