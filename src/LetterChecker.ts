import {MAX_WORD_SIZE, MAX_ATTEMPTS} from "./env.js";
import {Game} from "./Game.js";
import { ILetterCheck } from "./ILetterCheck.js";
import {UIChanger} from "./UIChanger.js";

export class LetterChecker{

    private strategy: ILetterCheck[];
    
    constructor(strategies: ILetterCheck[]){
        this.strategy = strategies;
    }

    checkLetters(game: Game, userInterface: UIChanger): void {
        for (let position = 0; position < MAX_WORD_SIZE; position++) {
            this.strategy.forEach(strategy => {
                strategy.check(game, userInterface);
            });
        }
    }
}
