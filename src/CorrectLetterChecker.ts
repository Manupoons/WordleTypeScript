import {MAX_WORD_SIZE, MAX_ATTEMPTS} from "./env.js";
import { Game } from "./Game";
import { UIChanger } from "./UIChanger";
import { ILetterCheck } from "./ILetterCheck.js";

export class CorrectLetterChecker implements ILetterCheck {
    check(game: Game, userInterface: UIChanger): void {
        for(let i=0; i<MAX_WORD_SIZE; i++){
            if (game.pickedWord[i]==game.actualWord[i]){
                userInterface.changeBackgroundPosition(game.turn, i, "cell-green");
            }
        }
    }
}