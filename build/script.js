import { Word } from "./Word.js";
import { Game } from "./Game.js";
import { LetterChecker } from "./LetterChecker.js";
import { UIChanger } from "./UIChanger.js";
const wordsCollection = new Word(["JUEGO", "TALAR", "BAILE", "ANDAR", "MONTE", "PLAYA", "PLATA", "ARBOL", "QUESO"]);
const pickedWord = wordsCollection.getRandomWord();
console.log(pickedWord);
const userInterface = new UIChanger();
const game = new Game(pickedWord);
const letterChecker = new LetterChecker(game, userInterface);
Array.from(document.getElementsByClassName("key")).forEach(element => element.addEventListener("click", (e) => {
    letterChecker.newKeyPressed(e.target.value);
}));
document.addEventListener("keydown", (e) => {
    letterChecker.newKeyPressed(e.code);
});
