import { MAX_WORD_SIZE } from "./env.js";
export class CorrectLetterChecker {
    check(game, userInterface) {
        for (let i = 0; i < MAX_WORD_SIZE; i++) {
            if (game.pickedWord[i] == game.actualWord[i]) {
                userInterface.changeBackgroundPosition(game.turn, i, "cell-green");
            }
        }
    }
}
