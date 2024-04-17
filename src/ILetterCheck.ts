import { Game } from "./Game";
import { UIChanger } from "./UIChanger";

export interface ILetterCheck {
    check(game: Game, userInterface: UIChanger): void;
}