import { inputSubscriber } from './src/subscribers';

document.getElementById("clearInputConsole").addEventListener("click", () => {
    scriptsExecuted.length = 0;
    variablesData = {};
});
document.getElementById("clearOutputConsole").addEventListener("click", () => output.innerHTML = '');
