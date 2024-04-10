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
var _LetterChecker_game, _LetterChecker_userInterface;
import { MAX_WORD_SIZE } from "./env.js";
export class LetterChecker {
    constructor(game, userInterface) {
        _LetterChecker_game.set(this, void 0);
        _LetterChecker_userInterface.set(this, void 0);
        this.checkLetterStatus = () => {
            let actualLetter = "";
            let pattern;
            let numberOfCoincidencesPickedWord = 0;
            let numberOfCoincidencesActualWord = 0;
            let differenceOfCoincidences = 0;
            let isMisplacedLetter = true;
            for (let i = 0; i < MAX_WORD_SIZE; i++) {
                isMisplacedLetter = true;
                actualLetter = __classPrivateFieldGet(this, _LetterChecker_game, "f").actualWord[i];
                pattern = new RegExp(actualLetter, "g");
                numberOfCoincidencesPickedWord = (__classPrivateFieldGet(this, _LetterChecker_game, "f").pickedWord.match(pattern) || []).length;
                numberOfCoincidencesActualWord = (__classPrivateFieldGet(this, _LetterChecker_game, "f").actualWord.match(pattern) || []).length;
                differenceOfCoincidences = Math.abs(numberOfCoincidencesActualWord - numberOfCoincidencesPickedWord);
                if (__classPrivateFieldGet(this, _LetterChecker_game, "f").pickedWord[i] == __classPrivateFieldGet(this, _LetterChecker_game, "f").actualWord[i]) {
                    __classPrivateFieldGet(this, _LetterChecker_userInterface, "f").changeBackgroundPosition(__classPrivateFieldGet(this, _LetterChecker_game, "f").turn, i, "cell-green");
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
                if (numberOfCoincidencesPickedWord > 0 && isMisplacedLetter) {
                    __classPrivateFieldGet(this, _LetterChecker_userInterface, "f").changeBackgroundPosition(__classPrivateFieldGet(this, _LetterChecker_game, "f").turn, i, "cell-orange");
                }
                if (numberOfCoincidencesPickedWord == 0) {
                    __classPrivateFieldGet(this, _LetterChecker_userInterface, "f").changeBackgroundPosition(__classPrivateFieldGet(this, _LetterChecker_game, "f").turn, i, "cell-grey");
                }
            }
        };
        __classPrivateFieldSet(this, _LetterChecker_game, game, "f");
        __classPrivateFieldSet(this, _LetterChecker_userInterface, userInterface, "f");
    }
    get userInterface() {
        return __classPrivateFieldGet(this, _LetterChecker_userInterface, "f");
    }
    set userInterface(i) {
        __classPrivateFieldSet(this, _LetterChecker_userInterface, i, "f");
    }
}
_LetterChecker_game = new WeakMap(), _LetterChecker_userInterface = new WeakMap();
