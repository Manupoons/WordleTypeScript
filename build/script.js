import { Word } from "./Word.js";
import { Game } from "./Game.js";
import { LetterChecker } from "./LetterChecker.js";
import { CorrectLetterChecker } from "./CorrectLetterChecker.js";
import { MisplacedLetterChecker } from "./MisplacedLetterChecker.js";
import { WrongLetterChecker } from "./WrongLetterChecker.js";
import { UIChanger } from "./UIChanger.js";
import { Letter } from "./Letter.js";
const wordsCollection = new Word(["JUEGO", "TALAR", "BAILE", "ANDAR", "MONTE", "PLAYA", "PLATA", "ARBOL", "QUESO"]);
const pickedWord = wordsCollection.getRandomWord();
console.log(pickedWord);
const strategies = [
    new CorrectLetterChecker(),
    new MisplacedLetterChecker(),
    new WrongLetterChecker()
];
const userInterface = new UIChanger();
const game = new Game(pickedWord);
const letterChecker = new LetterChecker(strategies);
const letter = new Letter(letterChecker, userInterface, game);
Array.from(document.getElementsByClassName("key")).forEach(element => element.addEventListener("click", (e) => {
    letter.newKeyPressed(e.target.value);
}));
document.addEventListener("keydown", (e) => {
    letter.newKeyPressed(e.code);
});
