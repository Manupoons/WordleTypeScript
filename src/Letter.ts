import {MAX_WORD_SIZE, MAX_ATTEMPTS} from "./env.js";
import {LetterChecker} from "./LetterChecker.js";
import {Game} from "./Game.js";
import {UIChanger} from "./UIChanger.js";

const validLetterCodes = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Semicolon"]

export class Letter{

    #actualPosition: number;
    #letterChecker: LetterChecker;
    #validLetterCodes: string[];
    #userInterface: UIChanger;
    #game: Game;

    constructor(letterChecker: LetterChecker, userInterface: UIChanger, game: Game){
        this.#actualPosition = 0;
        this.#validLetterCodes = validLetterCodes;
        this.#letterChecker = letterChecker;
        this.#userInterface = userInterface;
        this.#game = game;
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

    isValidLetter(code: string, actualPosition: number): boolean{ 
        return this.#validLetterCodes.includes(code) && actualPosition < MAX_WORD_SIZE;
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

    newLetter(code: string): string{
        let letter: string = this.transformCodeToLetter(code);
        return letter;
    }

    newLetterColor(letter: string): void{
        this.#userInterface.setNewLetterInUI(this.#game.turn, this.actualPosition, letter);
        this.actualPosition = this.actualPosition + 1;
        this.#game.actualWord += letter;
    }

    backspacePressed(): void{
        if (this.actualPosition > 0) {
            this.actualPosition -= 1;
            this.#game.actualWord = this.#game.actualWord.slice(0, this.actualPosition);
            this.#userInterface.deleteLetterInUI(this.#game.turn, this.actualPosition);
        }
    }

    enterPressed(): void{
        if (this.#game.actualWord.length == MAX_WORD_SIZE){
            this.#game.checkGameIsOver();
            this.#letterChecker.checkLetters(this.#game, this.#userInterface)
            this.#game.turn = this.#game.turn + 1;
            this.actualPosition = 0;
            this.#game.actualWord = "";
        }
    }

    newKeyPressed(code: string): void{ 
        if (this.#game.actualWord.length < MAX_WORD_SIZE) {
            if (this.isValidLetter(code, this.actualPosition)){ 
                this.newLetter(code);
                this.newLetterColor(this.newLetter(code));
            }
            this.#userInterface.changeBackgroundKey(code);
        }
        
        if (this.isEnterKey(code)) {
            this.enterPressed();
        }

        if (this.isBackspaceKey(code)) {
            this.backspacePressed();
        }
    }
}