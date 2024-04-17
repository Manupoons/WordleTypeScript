var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Letter_actualPosition, _Letter_letterChecker, _Letter_validLetterCodes, _Letter_userInterface, _Letter_game;
import { MAX_WORD_SIZE } from "./env.js";
const validLetterCodes = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Semicolon"];
export class Letter {
    constructor(letterChecker, userInterface, game) {
        _Letter_actualPosition.set(this, void 0);
        _Letter_letterChecker.set(this, void 0);
        _Letter_validLetterCodes.set(this, void 0);
        _Letter_userInterface.set(this, void 0);
        _Letter_game.set(this, void 0);
        __classPrivateFieldSet(this, _Letter_actualPosition, 0, "f");
        __classPrivateFieldSet(this, _Letter_validLetterCodes, validLetterCodes, "f");
        __classPrivateFieldSet(this, _Letter_letterChecker, letterChecker, "f");
        __classPrivateFieldSet(this, _Letter_userInterface, userInterface, "f");
        __classPrivateFieldSet(this, _Letter_game, game, "f");
    }
    get actualPosition() {
        return __classPrivateFieldGet(this, _Letter_actualPosition, "f");
    }
    set actualPosition(num) {
        __classPrivateFieldSet(this, _Letter_actualPosition, num, "f");
    }
    get validLetterCodes() {
        return __classPrivateFieldGet(this, _Letter_validLetterCodes, "f");
    }
    set validLetterCodes(letters) {
        __classPrivateFieldSet(this, _Letter_validLetterCodes, letters, "f");
    }
    isValidLetter(code, actualPosition) {
        return __classPrivateFieldGet(this, _Letter_validLetterCodes, "f").includes(code) && actualPosition < MAX_WORD_SIZE;
    }
    isEnterKey(code) {
        return code == "Enter";
    }
    isBackspaceKey(code) {
        return code == "Backspace";
    }
    transformCodeToLetter(code) {
        let letter = "";
        if (code == "Semicolon")
            letter = "Ñ";
        else
            letter = code.split("y")[1];
        return letter;
    }
    newLetter(code) {
        let letter = this.transformCodeToLetter(code);
        return letter;
    }
    newLetterColor(letter) {
        __classPrivateFieldGet(this, _Letter_userInterface, "f").setNewLetterInUI(__classPrivateFieldGet(this, _Letter_game, "f").turn, this.actualPosition, letter);
        this.actualPosition = this.actualPosition + 1;
        __classPrivateFieldGet(this, _Letter_game, "f").actualWord += letter;
    }
    backspacePressed() {
        if (this.actualPosition > 0) {
            this.actualPosition -= 1;
            __classPrivateFieldGet(this, _Letter_game, "f").actualWord = __classPrivateFieldGet(this, _Letter_game, "f").actualWord.slice(0, this.actualPosition);
            __classPrivateFieldGet(this, _Letter_userInterface, "f").deleteLetterInUI(__classPrivateFieldGet(this, _Letter_game, "f").turn, this.actualPosition);
        }
    }
    enterPressed() {
        if (__classPrivateFieldGet(this, _Letter_game, "f").actualWord.length == MAX_WORD_SIZE) {
            __classPrivateFieldGet(this, _Letter_game, "f").checkGameIsOver();
            //this.#letterChecker.checkLetterStatus();
            __classPrivateFieldGet(this, _Letter_letterChecker, "f").checkMisplacedLetters();
            __classPrivateFieldGet(this, _Letter_letterChecker, "f").checkLettersRight();
            __classPrivateFieldGet(this, _Letter_letterChecker, "f").checkWrongLetters();
            __classPrivateFieldGet(this, _Letter_game, "f").turn = __classPrivateFieldGet(this, _Letter_game, "f").turn + 1;
            this.actualPosition = 0;
            __classPrivateFieldGet(this, _Letter_game, "f").actualWord = "";
        }
    }
    newKeyPressed(code) {
        if (__classPrivateFieldGet(this, _Letter_game, "f").actualWord.length < MAX_WORD_SIZE) {
            if (this.isValidLetter(code, this.actualPosition)) {
                this.newLetter(code);
                this.newLetterColor(this.newLetter(code));
            }
            __classPrivateFieldGet(this, _Letter_userInterface, "f").changeBackgroundKey(code);
        }
        if (this.isEnterKey(code)) {
            this.enterPressed();
        }
        if (this.isBackspaceKey(code)) {
            this.backspacePressed();
        }
    }
}
_Letter_actualPosition = new WeakMap(), _Letter_letterChecker = new WeakMap(), _Letter_validLetterCodes = new WeakMap(), _Letter_userInterface = new WeakMap(), _Letter_game = new WeakMap();
