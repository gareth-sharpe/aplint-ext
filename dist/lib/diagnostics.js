"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("../utils/constants");
exports.createDiagnostic = (result) => {
    const line = parseInt(result[constants_1.LINE]) - 1;
    if (isNaN(line)) {
        return null;
    }
    const ruleset = result[constants_1.RULE_SET];
    const description = result[constants_1.DESCRIPTION];
    const message = `${ruleset}: ${description}`;
    const priority = parseInt(result[constants_1.PRIORITY]);
    let severity;
    switch (priority) {
        case 1 || 2:
            severity = vscode_1.DiagnosticSeverity.Error;
            break;
        case 3:
            severity = vscode_1.DiagnosticSeverity.Warning;
            break;
        case 4:
            severity = vscode_1.DiagnosticSeverity.Information;
            break;
        default:
            severity = vscode_1.DiagnosticSeverity.Hint;
            break;
    }
    const problem = new vscode_1.Diagnostic(new vscode_1.Range(new vscode_1.Position(line, 0), new vscode_1.Position(line, 100)), message, severity);
    problem.source = 'APLint';
    console.log('result', result);
    return problem;
};
//# sourceMappingURL=diagnostics.js.map