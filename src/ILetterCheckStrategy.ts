import { Game } from "./Game";
import { UIChanger } from "./UIChanger";

export interface ILetterCheckStrategy {
    check(game: Game, userInterface: UIChanger): void;
}