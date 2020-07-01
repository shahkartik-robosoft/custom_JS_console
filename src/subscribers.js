import { parse } from "acorn";
import { curry } from "ramda";
import { inputStream } from './observables';
import { input, output, updateOutputContent } from './fields';
import { parserTypes,variableTypes, functionTypes, errColors } from './constants';
import { validateScript } from './utils';


let scriptsExecuted = [];
let variablesData = {};

let errStr = '';
let outputString= '';

const inputSubscriber = inputStream.subscribe(e => {
    try {
        const inputVal = e.target.value;
        const parseDetails = parse(inputVal);
        const type = parseDetails.body[0].type;
        let name = parseDetails.body[0].declarations && parseDetails.body[0].declarations[0].id.name;
        let splitInputValue = inputVal.split("=");
        let variableVal;
        if (parseDetails.body[0].declarations) {
            variableVal = splitInputValue.length === 2 ? splitInputValue[1] : splitInputValue.slice(1,3).join("=");
        }
        if (type === parserTypes.EXPRESSION_STATEMENT) {
            const operator = parseDetails.body[0].expression.operator;
            if (!operator) {
                name = parseDetails.body[0].expression.name;
                if(!variablesData[name]) {
                    updateOutputContent(`Uncaught ReferenceError: ${name} is not defined`, errColors.RED);
                    return;
                }
                outputString = variablesData[name];
                updateOutputContent(outputString);
                input.value = '';
                return;
            }
            const assignVal = parseDetails.body[0].expression.right.value;
            name = parseDetails.body[0].expression.left.name;
            if (operator === '==' || operator === '===') {
                outputString = variablesData[name] === assignVal;
                input.value = '';
                return;
            }
            variableVal = parseDetails.body[0].expression.right.value;
        }
        let kind = parseDetails.body[0].kind && parseDetails.body[0].kind;
        if(curry(validateScript)(type)(name)(kind)(scriptsExecuted)) {
            const scriptDetails = {};
            scriptDetails.type = type;
            scriptDetails.varType = splitInputValue.length === 2 ? variableTypes.VAR : functionTypes.EXPRESSION_FUNCTION;
            scriptDetails.name = name;
            scriptDetails.kind = kind;
            scriptsExecuted = [...scriptsExecuted].filter(script => script.name !== name).concat(scriptDetails);
            if (type === parserTypes.VARIABLE_DECLARATION || type === parserTypes.EXPRESSION_STATEMENT) {
                variablesData[name] = variableVal;
            }
        } else {
            errStr = `Uncaught SyntaxError: Identifier ${name} has already been declared.`;
            updateOutputContent(errStr, errColors.RED);
        }
        input.value = '';
    }
    catch(e) {
        updateOutputContent(e, errColors.RED);
        console.log('error   ', e);
    }
});

export {
    inputSubscriber
};