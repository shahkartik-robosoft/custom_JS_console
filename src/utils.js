import {lensProp, lensIndex, view, lensPath, curry} from "ramda";
import {errColors, functionTypes, parserTypes, variableTypes} from './constants';
import {parse} from "acorn";
import {input, updateOutputContent} from "./fields";
import {variableAttributes} from "./subscribers";

const validateScript = (type, name, kind, variableAttributes) => {
    if (type === parserTypes.FUNCTION_DECLARATION) {
        return true;
    } else {
        if (!kind) {
            return variableAttributes.map(script => script.name).indexOf(name) > -1
                    && !variableAttributes.some(script => script.kind ===  variableTypes.CONST);
        }
        if (kind === variableTypes.CONST) {
            return !variableAttributes.some(script => script.name === name)
        }
        return variableAttributes.filter(script => script.name === name
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