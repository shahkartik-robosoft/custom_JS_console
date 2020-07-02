import { fromEvent } from 'rxjs';
import { filter } from "rxjs/operators";
import { inputField } from './fields';
import { keySpaces } from './constants';

const validateEnterKey = e => e.keyCode === keySpaces.enterKey  && !(e.keyCode === keySpaces.enterKey && e.shiftKey);

const validateCursorPosition = () => inputField.selectionStart - inputField.textLength <= 0;

const validateUpDownKey = e => {
    return (e.keyCode === keySpaces.upArrow || e.keyCode === keySpaces.downArrow) && validateCursorPosition();
}

const inputStream = fromEvent(inputField, "keyup")
    .pipe(filter((e) => validateEnterKey(e) || validateUpDownKey(e)));

export {
    inputStream
};