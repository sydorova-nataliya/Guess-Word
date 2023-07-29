const btn_guess = document.querySelector(".btn_guess");
const form__letter = document.querySelector(".form__letter");
const placeholder = document.querySelector(".placeholder");
const message = document.querySelector(".message");

const word = "test";
const quessedLetter = [];

const placeholderHtml=word=>{
    let str = '';
    for(let letter of word){
        str+='*';
    }
    placeholder.innerHTML=str;
}

placeholderHtml(word);

btn_guess.addEventListener('click', function(e){
    e.preventDefault();
    if (form__letter.value.length === 0) {
        message.innerText = "Please enter a letter.";
      } else if (form__letter.value.length > 1) {
        message.innerText = "Please enter one letter.";
      }else if (!form__letter.value.match(/[a-zA-Z]/)) {
        message.innerText = "Please enter a letter from A to Z.";
      }else{
        if(quessedLetter.includes(form__letter.value.toUpperCase())){
            message.innerText = "You have already guessed this letter. Try again!";
        } else{
            quessedLetter.push(form__letter.value.toUpperCase());
            message.innerText = "";
        }
      } 
      console.log(quessedLetter);
    form__letter.value= '';
})