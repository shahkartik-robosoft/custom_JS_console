import { inputSubscriber, scriptsExecuted, clearData } from './src/subscribers';
import { clearInputConsole, clearOutputConsole, output } from './src/fields';

clearInputConsole.addEventListener("click", () => {
    scriptsExecuted.length = 0;
    clearData();
});
clearOutputConsole.addEventListener("click", () => output.innerHTML = '');
