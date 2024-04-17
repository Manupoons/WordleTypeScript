export class UIChanger {
    
    setNewLetterInUI(turn: number, position: number, letter: string) {
        Array.from(document.getElementById(`row_${turn}`)!.children)[position].textContent = letter;
    }

    deleteLetterInUI(turn: number, position: number) {
        Array.from(document.getElementById(`row_${turn}`)!.children)[position].textContent = "";
    }
    
    changeBackgroundPosition(turn: number, position: number, state: string){
        Array.from(document.getElementById(`row_${turn}`)!.children)[position].classList.add(state);
    }
    
    changeBackgroundKey(code: string){
        const keys: any = document.getElementsByClassName("key");
        for (let key of keys) {
            if (key.value == code && code !== "Enter" && code !== "Backspace"){
                key.classList.add("keyPressed");
            }
        }
    }
}