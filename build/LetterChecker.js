import { MAX_WORD_SIZE } from "./env.js";
export class LetterChecker {
    constructor(strategies) {
        this.strategy = strategies;
    }
    checkLetters(game, uiChanger) {
        for (let position = 0; position < MAX_WORD_SIZE; position++) {
            this.strategy.forEach(strategy => {
                strategy.check(game, uiChanger);
            });
        }
    }
}
