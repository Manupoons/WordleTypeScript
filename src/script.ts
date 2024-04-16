import {Word} from "./Word.js";
import {Game} from "./Game.js";
import {LetterChecker} from "./LetterChecker.js";
import {UIChanger} from "./UIChanger.js";
import {Letter} from "./Letter.js";

const wordsCollection: Word = new Word(["JUEGO", "TALAR", "BAILE", "ANDAR", "MONTE", "PLAYA", "PLATA", "ARBOL", "QUESO"]);
const pickedWord: string = wordsCollection.getRandomWord();
console.log(pickedWord);

const userInterface: UIChanger = new UIChanger();
const game: Game = new Game(pickedWord);
const letterChecker: LetterChecker = new LetterChecker(game, userInterface);
const letter: Letter = new Letter(letterChecker, userInterface, game);


Array.from(document.getElementsByClassName("key")).forEach(element => element.addEventListener("click", (e)=>{
    letter.newKeyPressed((<HTMLButtonElement>e.target).value);
}));

document.addEventListener("keydown", (e) =>{
    letter.newKeyPressed(e.code);
});