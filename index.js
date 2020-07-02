import execute, { scriptsExecuted, variableAttributes, clearData } from './src/executeCommands';
import { clearInputConsole, clearOutputConsole, output } from './src/fields';

clearInputConsole.addEventListener("click", () => {
    scriptsExecuted.length = 0;
    variableAttributes.length = 0;
    clearData();
});
clearOutputConsole.addEventListener("click", () => output.innerHTML = '');
