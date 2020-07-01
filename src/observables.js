import { fromEvent } from 'rxjs';
import { filter } from "rxjs/operators";
import { input } from './fields';
import { keySpaces } from './constants';

const inputStream = fromEvent(input, "keyup")
                    .pipe(filter((e) => e.keyCode === keySpaces.enterKey
                                            && !(e.keyCode == 13 && e.shiftKey)));

export {
    inputStream
};