const keySpaces = Object.freeze({
    enterKey: 13,
    shiftEnter: 16,
    upArrow: 38,
    downArrow: 40,
});

const parserTypes = Object.freeze({
    FUNCTION_DECLARATION: 'FunctionDeclaration',
    VARIABLE_DECLARATION: 'VariableDeclaration',
    EXPRESSION_STATEMENT: 'ExpressionStatement',
});

const expressionTypes = Object.freeze({
    ASSIGNMENT_EXPRESSION: 'AssignmentExpression',
    BINARY_EXPRESSION: 'BinaryExpression',
    CALL_EXPRESSION: 'CallExpression',
})

const variableTypes = Object.freeze({
    CONST: 'const',
    VAR: 'var',
    LET: 'let'
});

const functionTypes = Object.freeze({
    EXPRESSION_FUNCTION: 'expressionFn',
    DECLARATION_FUNCTION: 'declarationFn',
});

const errColors = Object.freeze({
    RED: 'red',
});

export {
    keySpaces,
    parserTypes,
    variableTypes,
    expressionTypes,
    functionTypes,
    errColors,
 };