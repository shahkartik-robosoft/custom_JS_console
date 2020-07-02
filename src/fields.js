const inputField = document.getElementById("consoleInput");
const output = document.getElementById("consoleOutput");
const clearInputConsole = document.getElementById("clearInputConsole");
const clearOutputConsole = document.getElementById("clearOutputConsole");
const updateOutputContent = (value, color='green') => {
    output.innerHTML = value;
    output.style.color = color;
}

export {
    inputField,
    output,
    clearInputConsole,
    clearOutputConsole,
    updateOutputContent
};