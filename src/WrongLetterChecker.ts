import {MAX_WORD_SIZE, MAX_ATTEMPTS} from "./env.js";
import { Game } from "./Game";
import { UIChanger } from "./UIChanger";
import { ILetterCheckStrategy } from "./ILetterCheckStrategy";

export class WrongLetterChecker implements ILetterCheckStrategy {
    check(game: Game, userInterface: UIChanger): void {
        let actualLetter = "";
        let pattern:RegExp;
        let numberOfCoincidencesPickedWord = 0;

        for (let i=0; i<MAX_WORD_SIZE; i++){
            actualLetter = game.actualWord[i];
            pattern = new RegExp(actualLetter,"g");
            numberOfCoincidencesPickedWord = (game.pickedWord.match(pattern)||[]).length;
            if (numberOfCoincidencesPickedWord==0) {
                userInterface.changeBackgroundPosition(game.turn, i, "cell-grey");
            }
        }
    }
}