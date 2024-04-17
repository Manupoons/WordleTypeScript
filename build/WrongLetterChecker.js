import { MAX_WORD_SIZE } from "./env.js";
export class WrongLetterChecker {
    check(game, userInterface) {
        let actualLetter = "";
        let pattern;
        let numberOfCoincidencesPickedWord = 0;
        for (let i = 0; i < MAX_WORD_SIZE; i++) {
            actualLetter = game.actualWord[i];
            pattern = new RegExp(actualLetter, "g");
            numberOfCoincidencesPickedWord = (game.pickedWord.match(pattern) || []).length;
            if (numberOfCoincidencesPickedWord == 0) {
                userInterface.changeBackgroundPosition(game.turn, i, "cell-grey");
            }
        }
    }
}
