import { lensProp, lensIndex, view } from "ramda";
import { parserTypes, variableTypes } from './constants';

const validateScript = (type, name, kind, scriptsExecuted) => {
    if (type === parserTypes.FUNCTION_DECLARATION) {
        return true;
    } else {
        if (!kind) {
            return scriptsExecuted.map(script => script.name).indexOf(name) > -1
                    && !scriptsExecuted.some(script => script.kind ===  variableTypes.CONST);
        }
        if (kind === variableTypes.CONST) {
            return !scriptsExecuted.some(script => script.name === name)
        }
        return scriptsExecuted.filter(script => script.name === name
                && script.kind !== kind).length === 0;
    }
};

const getRequiredParams = parsedData => {
    const dataLens = view(lensProp('body'), parsedData);
    const body = view(lensIndex(0), dataLens);
    const type = view(lensProp('type'), body);
    return { body, type};
};

export {
    validateScript,
    getRequiredParams
};