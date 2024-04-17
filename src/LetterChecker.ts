import {MAX_WORD_SIZE, MAX_ATTEMPTS} from "./env.js";
import {Game} from "./Game.js";
import { ILetterCheckStrategy } from "./ILetterCheckStrategy.js";
import {UIChanger} from "./UIChanger.js";

export class LetterChecker{

    private strategy: ILetterCheckStrategy[];

    constructor(strategies: ILetterCheckStrategy[]){
        this.strategy = strategies;
    }

    checkLetters(game: Game, uiChanger: UIChanger): void {
        for (let position = 0; position < MAX_WORD_SIZE; position++) {
            this.strategy.forEach(strategy => {
                strategy.check(game, uiChanger);
            });
        }
    }
}
