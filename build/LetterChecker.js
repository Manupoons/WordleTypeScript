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
var _LetterChecker_game, _LetterChecker_userInterface, _LetterChecker_actualPosition, _LetterChecker_validLetterCodes;
import { MAX_WORD_SIZE } from "./env.js";
import { UIChanger } from "./UIChanger.js";
export class LetterChecker {
    constructor(game) {
        _LetterChecker_game.set(this, void 0);
        _LetterChecker_userInterface.set(this, void 0);
        _LetterChecker_actualPosition.set(this, void 0);
        _LetterChecker_validLetterCodes.set(this, void 0);
        this.checkLetterStatus = () => {
            let actualLetter = "";
            let pattern;
            let numberOfCoincidencesPickedWord = 0;
            let numberOfCoincidencesActualWord = 0;
            let differenceOfCoincidences = 0;
            let isMisplacedLetter = true;
            let isLetterChecked = false;
            for (let i = 0; i < MAX_WORD_SIZE; i++) {
                isMisplacedLetter = true;
                isLetterChecked = false;
                actualLetter = __classPrivateFieldGet(this, _LetterChecker_game, "f").actualWord[i];
                pattern = new RegExp(actualLetter, "g");
                numberOfCoincidencesPickedWord = (__classPrivateFieldGet(this, _LetterChecker_game, "f").pickedWord.match(pattern) || []).length;
                numberOfCoincidencesActualWord = (__classPrivateFieldGet(this, _LetterChecker_game, "f").actualWord.match(pattern) || []).length;
                differenceOfCoincidences = Math.abs(numberOfCoincidencesActualWord - numberOfCoincidencesPickedWord);
                if (__classPrivateFieldGet(this, _LetterChecker_game, "f").pickedWord[i] == __classPrivateFieldGet(this, _LetterChecker_game, "f").actualWord[i]) {
                    __classPrivateFieldGet(this, _LetterChecker_userInterface, "f").changeBackgroundPosition(__classPrivateFieldGet(this, _LetterChecker_game, "f").turn, i, "rightLetter");
                    isLetterChecked = true;
                }
                if (differenceOfCoincidences == 1) {
                    for (let j = 0; j < MAX_WORD_SIZE; j++) {
                        if (__classPrivateFieldGet(this, _LetterChecker_game, "f").pickedWord[j] == actualLetter) {
                            isMisplacedLetter = false;
                            break;
                        }
                    }
                }
                if (differenceOfCoincidences == 0 && __classPrivateFieldGet(this, _LetterChecker_game, "f").pickedWord[i] == __classPrivateFieldGet(this, _LetterChecker_game, "f").actualWord[i]) {
                    isMisplacedLetter = false;
                }
                if (numberOfCoincidencesPickedWord > 0 && isMisplacedLetter && !isLetterChecked) {
                    __classPrivateFieldGet(this, _LetterChecker_userInterface, "f").changeBackgroundPosition(__classPrivateFieldGet(this, _LetterChecker_game, "f").turn, i, "misplacedLetter");
                }
                if (numberOfCoincidencesPickedWord == 0) {
                    __classPrivateFieldGet(this, _LetterChecker_userInterface, "f").changeBackgroundPosition(__classPrivateFieldGet(this, _LetterChecker_game, "f").turn, i, "wrongLetter");
                }
            }
        };
        __classPrivateFieldSet(this, _LetterChecker_game, game, "f");
        __classPrivateFieldSet(this, _LetterChecker_actualPosition, 0, "f");
        __classPrivateFieldSet(this, _LetterChecker_validLetterCodes, ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Semicolon"], "f");
        __classPrivateFieldSet(this, _LetterChecker_userInterface, new UIChanger(), "f");
    }
    get actualPosition() {
        return __classPrivateFieldGet(this, _LetterChecker_actualPosition, "f");
    }
    set actualPosition(num) {
        __classPrivateFieldSet(this, _LetterChecker_actualPosition, num, "f");
    }
    get validLetterCodes() {
        return __classPrivateFieldGet(this, _LetterChecker_validLetterCodes, "f");
    }
    set validLetterCodes(letters) {
        __classPrivateFieldSet(this, _LetterChecker_validLetterCodes, letters, "f");
    }
    get userInterface() {
        return __classPrivateFieldGet(this, _LetterChecker_userInterface, "f");
    }
    set userInterface(i) {
        __classPrivateFieldSet(this, _LetterChecker_userInterface, i, "f");
    }
    isValidLetter(code) {
        return __classPrivateFieldGet(this, _LetterChecker_validLetterCodes, "f").includes(code) && __classPrivateFieldGet(this, _LetterChecker_actualPosition, "f") < MAX_WORD_SIZE;
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
        __classPrivateFieldGet(this, _LetterChecker_userInterface, "f").setNewLetter(__classPrivateFieldGet(this, _LetterChecker_game, "f").turn, this.actualPosition, letter);
        this.actualPosition = this.actualPosition + 1;
        __classPrivateFieldGet(this, _LetterChecker_game, "f").actualWord += letter;
    }
    enterPressed() {
        if (__classPrivateFieldGet(this, _LetterChecker_game, "f").actualWord.length == MAX_WORD_SIZE) {
            __classPrivateFieldGet(this, _LetterChecker_game, "f").checkGameIsOver();
            this.checkLetterStatus();
            __classPrivateFieldGet(this, _LetterChecker_game, "f").turn = __classPrivateFieldGet(this, _LetterChecker_game, "f").turn + 1;
            this.actualPosition = 0;
            __classPrivateFieldGet(this, _LetterChecker_game, "f").actualWord = "";
        }
    }
    backspacePressed() {
        if (this.actualPosition > 0) {
            this.actualPosition -= 1;
            __classPrivateFieldGet(this, _LetterChecker_game, "f").actualWord = __classPrivateFieldGet(this, _LetterChecker_game, "f").actualWord.slice(0, this.actualPosition);
            __classPrivateFieldGet(this, _LetterChecker_userInterface, "f").deleteLetter(__classPrivateFieldGet(this, _LetterChecker_game, "f").turn, this.actualPosition);
        }
    }
    newKeyPressed(code) {
        if (__classPrivateFieldGet(this, _LetterChecker_game, "f").actualWord.length < MAX_WORD_SIZE) {
            if (this.isValidLetter(code))
                this.newLetter(code);
            __classPrivateFieldGet(this, _LetterChecker_userInterface, "f").changeBackgroundKey(code);
        }
        if (this.isEnterKey(code))
            this.enterPressed();
        if (this.isBackspaceKey(code))
            this.backspacePressed();
    }
}
_LetterChecker_game = new WeakMap(), _LetterChecker_userInterface = new WeakMap(), _LetterChecker_actualPosition = new WeakMap(), _LetterChecker_validLetterCodes = new WeakMap();
