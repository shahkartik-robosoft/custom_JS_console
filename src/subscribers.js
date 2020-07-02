import { inputStream } from './observables';
import { keySpaces } from './constants';
import execute, { scriptsExecuted, cursorPosition, updateCursorPosition } from './executeCommands';
import {inputField} from "./fields";

const inputSubscriber = inputStream.subscribe(e => {
    if (e.keyCode === keySpaces.upArrow && scriptsExecuted.length > 0 && scriptsExecuted[scriptsExecuted.length - 1 - cursorPosition]) {
        inputField.value = scriptsExecuted[scriptsExecuted.length - 1 - cursorPosition];
        updateCursorPosition(cursorPosition+1);
    } else if (e.keyCode === keySpaces.downArrow && scriptsExecuted.length > 0 && scriptsExecuted[scriptsExecuted.length- 1 - cursorPosition]) {
        inputField.value = scriptsExecuted[scriptsExecuted.length - 1 - cursorPosition];
        updateCursorPosition(cursorPosition-1);
    } else if (e.keyCode === keySpaces.enterKey) {
        execute.executeCommand(e);
    }
});

export {
    inputSubscriber
};