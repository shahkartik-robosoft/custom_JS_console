const input = document.getElementById("consoleInput");
const output = document.getElementById("consoleOutput");
const updateOutputContent = (value, color='green') => {
    output.innerHTML = value;
    output.style.color = color;
}

export {
    input,
    output,
    updateOutputContent
};