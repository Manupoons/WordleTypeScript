import { MAX_WORD_SIZE, MAX_ATTEMPTS } from "./env.js";
import { Game } from "./Game.js";
import {UIChanger} from "./UIChanger.js";

export class LetterChecker{
    #actualPosition: number;
    #validLetterCodes: string[];
    #game: Game;
    #userInterface: UIChanger;

    constructor(game: Game, userInterface: UIChanger){
        this.#actualPosition = 0;
        this.#validLetterCodes = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Semicolon"];
        this.#game = game;
        this.#userInterface = userInterface;
    }
    
    get actualPosition(){
        return this.#actualPosition;
    }

    set actualPosition(num){
        this.#actualPosition = num;
    }
    
    get validLetterCodes() {
        return this.#validLetterCodes
    }

    set validLetterCodes(letters) {
        this.#validLetterCodes = letters;
    }

    get userInterface() {
        return this.#userInterface;
    }

    set userInterface(i) {
        this.#userInterface = i;
    }

    isValidLetter(code: string): boolean{ 
        return this.#validLetterCodes.includes(code) && this.#actualPosition < MAX_WORD_SIZE;
    }

    isEnterKey(code: string): boolean{
        return code == "Enter";
    }

    isBackspaceKey(code: string): boolean{
        return code == "Backspace";
    }

    transformCodeToLetter(code: string): string{
        let letter: string = "";
        if (code == "Semicolon") letter = "Ñ";
        else letter = code.split("y")[1];
        return letter;
    }

    newLetter(code: string): void{
        let letter: string = this.transformCodeToLetter(code);
        this.#userInterface.setNewLetter(this.#game.turn, this.#actualPosition, letter);
        this.#actualPosition = this.#actualPosition + 1;
        this.#game.actualWord += letter;
    }

    checkLetterStatus = (): void =>{
        let actualLetter: string = "";
        let pattern: RegExp;
        let numberOfCoincidencesPickedWord: number = 0;
        let numberOfCoincidencesActualWord: number = 0;
        let differenceOfCoincidences: number = 0;
        let isMisplacedLetter: boolean = true;

        for (let i = 0; i < MAX_WORD_SIZE; i++) {
            isMisplacedLetter = true;
            actualLetter = this.#game.actualWord[i];
            pattern = new RegExp(actualLetter, "g");
            numberOfCoincidencesPickedWord = (this.#game.pickedWord.match(pattern) || []).length;
            numberOfCoincidencesActualWord = (this.#game.actualWord.match(pattern) || []).length;
            differenceOfCoincidences = Math.abs(numberOfCoincidencesActualWord - numberOfCoincidencesPickedWord);

            if (this.#game.pickedWord[i] == this.#game.actualWord[i]){
                this.#userInterface.changeBackgroundPosition(this.#game.turn, i, "cell-green");
            }
            
            if (differenceOfCoincidences == 1){
                for (let j = 0; j < MAX_WORD_SIZE; j++){
                    if(this.#game.pickedWord[j] == actualLetter) {
                        isMisplacedLetter = false;
                        break;
                    }
                }
            }
            
            if (differenceOfCoincidences == 0 && this.#game.pickedWord[i] == this.#game.actualWord[i]){
                isMisplacedLetter = false;
            }

            if (numberOfCoincidencesPickedWord > 0 && isMisplacedLetter) { 
                
                this.#userInterface.changeBackgroundPosition(this.#game.turn, i, "cell-orange");
            }

            if (numberOfCoincidencesPickedWord == 0){
                this.#userInterface.changeBackgroundPosition(this.#game.turn, i, "cell-grey");
            }
        }
    }

    enterPressed(): void{
        if (this.#game.actualWord.length == MAX_WORD_SIZE){
            this.#game.checkGameIsOver();
            this.checkLetterStatus();
            this.#game.turn = this.#game.turn + 1;
            this.#actualPosition = 0;
            this.#game.actualWord = "";
        }
    }

    backspacePressed(): void{
        if (this.#actualPosition > 0) {
            this.#actualPosition -= 1;
            this.#game.actualWord = this.#game.actualWord.slice(0, this.#actualPosition);
            this.#userInterface.deleteLetter(this.#game.turn, this.#actualPosition);
        }
    }
    
    newKeyPressed(code: string): void{ 
        if (this.#game.actualWord.length < MAX_WORD_SIZE) {
            if (this.isValidLetter(code)){ 
                this.newLetter(code);
            }
            this.#userInterface.changeBackgroundKey(code);
        }
        if (this.isEnterKey(code)) this.enterPressed();
        if (this.isBackspaceKey(code)) this.backspacePressed();
    }
}