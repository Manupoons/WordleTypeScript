import {Word} from "./Word.js";
import {Game} from "./Game.js";
import {LetterChecker} from "./LetterChecker.js";


const wordsCollection: Word = new Word(["JUEGO", "TALAR", "BAILE", "ANDAR", "MONTE", "PLAYA", "PLATA", "ARBOL", "QUESO"]);
const pickedWord: string = wordsCollection.getRandomWord();
console.log(pickedWord);

const game: Game = new Game(pickedWord);
const letterChecker: LetterChecker = new LetterChecker(game);


Array.from(document.getElementsByClassName("key")).forEach(element => element.addEventListener("click", (e)=>{
    letterChecker.newKeyPressed((<HTMLButtonElement>e.target).value);
}));

document.addEventListener("keydown", (e) =>{
    letterChecker.newKeyPressed(e.code);
});