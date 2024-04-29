import { MAX_WORD_SIZE } from "./env.js";
//checkear primero las verdes y luego las naranjas con dos bucles for
export class MisplacedLetterChecker {
    check(game, userInterface) {
        const misplacedLetters = new Set();
        for (let i = 0; i < MAX_WORD_SIZE; i++) {
            const guessedLetter = game.pickedWord[i];
            const actualLetter = game.actualWord[i];
            if (guessedLetter === actualLetter) {
                userInterface.changeBackgroundPosition(game.turn, i, "cell-green");
            }
            else {
                if (!misplacedLetters.has(guessedLetter) && game.actualWord.includes(guessedLetter)) {
                    userInterface.changeBackgroundPosition(game.turn, i, "cell-orange");
                    misplacedLetters.add(guessedLetter);
                }
                else {
                    userInterface.changeBackgroundPosition(game.turn, i, "cell-grey");
                }
            }
        }
    }
}
