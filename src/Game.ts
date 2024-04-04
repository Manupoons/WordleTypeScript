import {MAX_WORD_SIZE, MAX_ATTEMPTS} from "./env.js";

export class Game {

    #pickedWord: string;
    #actualWord: string;
    #turn: number;

    constructor(pickedWord: string){
        this.#pickedWord = pickedWord;
        this.#actualWord = "";
        this.#turn = 1;
    }

    get pickedWord(){
        return this.#pickedWord;
    }

    set pickedWord(word){
        this.#pickedWord = word;
    }

    get actualWord(){
        return this.#actualWord;
    }

    set actualWord(word){
        this.#actualWord = word;
    }

    get turn(){
        return this.#turn;
    }

    set turn(num){
        this.#turn = num;
    }
    
    checkGameIsOver(): void{
        if (this.#actualWord == this.#pickedWord){
            location.assign("/winner")
        } 
        else if (this.turn == MAX_ATTEMPTS && this.#actualWord != this.#pickedWord){
            location.assign("/loser");
        }
    }
}