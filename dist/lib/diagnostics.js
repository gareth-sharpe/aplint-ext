"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("../utils/constants");
exports.createDiagnostic = (result) => {
    const line = parseInt(result[constants_1.LINE]) - 1;
    if (isNaN(line)) {
        return null;
    }
    const description = result[constants_1.DESCRIPTION];
    const priority = parseInt(result[constants_1.PRIORITY]);
    let level;
    switch (priority) {
        case 1 || 2:
            level = vscode_1.DiagnosticSeverity.Error;
            break;
        case 3:
            level = vscode_1.DiagnosticSeverity.Warning;
            break;
        case 4:
            level = vscode_1.DiagnosticSeverity.Information;
            break;
        default:
            level = vscode_1.DiagnosticSeverity.Hint;
            break;
    }
    const problem = new vscode_1.Diagnostic(new vscode_1.Range(new vscode_1.Position(line, 0), new vscode_1.Position(line, 100)), description, level);
    problem.source = 'APLint';
    return problem;
};
//# sourceMappingURL=diagnostics.js.map