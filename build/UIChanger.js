export class UIChanger {
    setNewLetterInUI(turn, position, letter) {
        Array.from(document.getElementById(`row_${turn}`).children)[position].textContent = letter;
    }
    deleteLetterInUI(turn, position) {
        Array.from(document.getElementById(`row_${turn}`).children)[position].textContent = "";
    }
    changeBackgroundPosition(turn, position, state) {
        Array.from(document.getElementById(`row_${turn}`).children)[position].classList.add(state);
    }
    changeBackgroundKey(code) {
        const keys = document.getElementsByClassName("key");
        for (let key of keys) {
            if (key.value == code && code !== "Enter" && code !== "Backspace") {
                key.classList.add("keyPressed");
            }
        }
    }
}
