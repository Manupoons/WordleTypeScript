import {MAX_WORD_SIZE, MAX_ATTEMPTS} from "./env.js";
import { Game } from "./Game";
import { UIChanger } from "./UIChanger";
import { ILetterCheckStrategy } from "./ILetterCheckStrategy";

export class MisplacedLetterChecker implements ILetterCheckStrategy {
    check(game: Game, userInterface: UIChanger): void {
        let actualLetter: string = "";
        let pattern: RegExp;
        let numberOfCoincidencesPickedWord: number = 0;
        let numberOfCoincidencesActualWord: number = 0;
        let differenceOfCoincidences: number = 0;
        let isMisplacedLetter: boolean = true;

        for (let i=0; i<MAX_WORD_SIZE; i++){
            isMisplacedLetter = true;
            actualLetter = game.actualWord[i];
            pattern = new RegExp(actualLetter,"g");
            numberOfCoincidencesPickedWord = (game.pickedWord.match(pattern)||[]).length;
            numberOfCoincidencesActualWord = (game.actualWord.match(pattern)||[]).length;
            differenceOfCoincidences = Math.abs(numberOfCoincidencesActualWord - numberOfCoincidencesPickedWord);
            
            if (differenceOfCoincidences==1){
                for (let j=0; j<MAX_WORD_SIZE; j++){
                    if(game.pickedWord[j]==actualLetter) {
                        isMisplacedLetter = false;
                        break;
                    }
                }
            }

            if (differenceOfCoincidences==0 && game.pickedWord[i] == game.actualWord[i]){
                isMisplacedLetter=false;
            }

            if (numberOfCoincidencesPickedWord>0 && isMisplacedLetter) {
                userInterface.changeBackgroundPosition(game.turn, i, "cell-orange");
            }   
        }
    }
}