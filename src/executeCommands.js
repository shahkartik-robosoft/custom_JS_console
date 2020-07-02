import {parse} from "acorn";
import {curry, lensIndex, lensPath, lensProp, view} from "ramda";
import {errColors, functionTypes, parserTypes, variableTypes} from "./constants";
import {inputField, updateOutputContent} from "./fields";
import {getRequiredParams, validateScript} from "./utils";

export let variableAttributes = [];
export let variablesData = {};
export const scriptsExecuted = [];
export let cursorPosition = 0;

let errStr = '';
let outputString= '';

export const updateCursorPosition = val => cursorPosition = val;

const executeCommand = e => {
    try {
        const inputVal = e.target.value;
        scriptsExecuted.push(inputVal.trim("↵"));
        cursorPosition = 0;
        const parseDetails = parse(inputVal);
        const { body, type } = getRequiredParams(parseDetails);
        let name;
        if (view(lensProp('declarations'), body)) {
            const declaration = view(lensIndex(0), view(lensProp('declarations'), body));
            const nameLens = lensPath([
                'id',
                'name'
            ]);
            name = view(nameLens, declaration);
        }
        let splitInputValue = inputVal.split("=");
        let variableVal;
        if (parseDetails.body[0].declarations) {
            variableVal = splitInputValue.length === 2 ? splitInputValue[1] : splitInputValue.slice(1,3).join("=");
        }
        if (type === parserTypes.EXPRESSION_STATEMENT) {
            const operatorLens = lensPath(['expression', 'operator']);
            const operator = view(operatorLens, body);
            if (!operator) {
                const nameLens = lensPath(['expression', 'name']);
                name = view(nameLens, body);
                if(!variablesData[name]) {
                    updateOutputContent(`Uncaught ReferenceError: ${name} is not defined`, errColors.RED);
                    return;
                }
                outputString = variablesData[name];
                updateOutputContent(outputString);
                inputField.value = '';
                return;
            }
            const assignValLens = lensPath(['expression', 'right', 'value']);
            const assignVal = view(assignValLens, body);
            const nameLens = lensPath(['expression','left', 'name']);
            name = view(nameLens, body);
            if (operator === '==' || operator === '===') {
                outputString = variablesData[name] == assignVal;
                updateOutputContent(outputString);
                inputField.value = '';
                return;
            }
            variableVal = assignVal;
        }
        const indexOfSemiColn = `${variableVal}`.indexOf(';');
        variableVal = indexOfSemiColn > -1 ? variableVal.substr(0, indexOfSemiColn) : variableVal;
        let kind = view(lensProp('kind'), body);
        if(curry(validateScript)(type)(name)(kind)(variableAttributes)) {
            const scriptDetails = {};
            scriptDetails.type = type;
            scriptDetails.varType = splitInputValue.length === 2 ? variableTypes.VAR : functionTypes.EXPRESSION_FUNCTION;
            scriptDetails.name = name;
            scriptDetails.kind = kind;
            variableAttributes = [...variableAttributes].filter(script => script.name !== name).concat(scriptDetails);
            if (type === parserTypes.VARIABLE_DECLARATION || type === parserTypes.EXPRESSION_STATEMENT) {
                variablesData[name] = `${variableVal}`.trim("↵");
            }
        } else {
            errStr = `Uncaught SyntaxError: Identifier ${name} has already been declared.`;
            updateOutputContent(errStr, errColors.RED);
        }
        inputField.value = '';
    }
    catch(e) {
        updateOutputContent(e, errColors.RED);
        console.log('error   ', e);
    }
}

export const clearData = () => variablesData = {};

export default { executeCommand, clearData };
