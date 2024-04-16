import {MAX_WORD_SIZE, MAX_ATTEMPTS} from "./env.js";
import {Game} from "./Game.js";
import {UIChanger} from "./UIChanger.js";

export class LetterChecker{
    #game: Game;
    #userInterface: UIChanger;

    constructor(game: Game, userInterface: UIChanger){
        this.#game = game;
        this.#userInterface = userInterface;
    }

    get userInterface() {
        return this.#userInterface;
    }

    set userInterface(i) {
        this.#userInterface = i;
    }
    
    checkLettersRight = ():void=>{
        for(let i=0; i<MAX_WORD_SIZE; i++){
            if (this.#game.pickedWord[i]==this.#game.actualWord[i]){
                this.#userInterface.changeBackgroundPosition(this.#game.turn, i, "cell-green");
            }
        }
    }

    checkMisplacedLetters = ():void=> {
        let actualLetter: string = "";
        let pattern: RegExp;
        let numberOfCoincidencesPickedWord: number = 0;
        let numberOfCoincidencesActualWord: number = 0;
        let differenceOfCoincidences: number = 0;
        let isMisplacedLetter: boolean = true;

        for (let i=0; i<MAX_WORD_SIZE; i++){
            isMisplacedLetter = true;
            actualLetter = this.#game.actualWord[i];
            pattern = new RegExp(actualLetter,"g");
            numberOfCoincidencesPickedWord = (this.#game.pickedWord.match(pattern)||[]).length;
            numberOfCoincidencesActualWord = (this.#game.actualWord.match(pattern)||[]).length;
            differenceOfCoincidences = Math.abs(numberOfCoincidencesActualWord - numberOfCoincidencesPickedWord);
            
            if (differenceOfCoincidences==1){
                for (let j=0; j<MAX_WORD_SIZE; j++){
                    if(this.#game.pickedWord[j]==actualLetter) {
                        isMisplacedLetter = false;
                        break;
                    }
                }
            }

            if (differenceOfCoincidences==0 && this.#game.pickedWord[i]==this.#game.actualWord[i]){
                isMisplacedLetter=false;
            }

            if (numberOfCoincidencesPickedWord>0 && isMisplacedLetter) {
                this.#userInterface.changeBackgroundPosition(this.#game.turn, i, "cell-orange");
            }   
        }
    }

    checkWrongLetters = ():void=>{
        let actualLetter = "";
        let pattern:RegExp;
        let numberOfCoincidencesPickedWord = 0;

        for (let i=0; i<MAX_WORD_SIZE; i++){
            actualLetter = this.#game.actualWord[i];
            pattern = new RegExp(actualLetter,"g");
            numberOfCoincidencesPickedWord = (this.#game.pickedWord.match(pattern)||[]).length;
            if (numberOfCoincidencesPickedWord==0) {
                this.#userInterface.changeBackgroundPosition(this.#game.turn, i, "cell-grey");
            }
        }
    }

    /*
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
            
            //if (differenceOfCoincidences == 0 && this.#game.pickedWord[i] == this.#game.actualWord[i]){
            //    isMisplacedLetter = false;
            //}

            if (numberOfCoincidencesPickedWord > 0 && isMisplacedLetter) { 
                
                this.#userInterface.changeBackgroundPosition(this.#game.turn, i, "cell-orange");
            }

            if (numberOfCoincidencesPickedWord == 0){
                this.#userInterface.changeBackgroundPosition(this.#game.turn, i, "cell-grey");
            }
        }
    }
    */
}