"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diagnostics_1 = require("../lib/diagnostics");
const constants_1 = require("../utils/constants");
const parser = require('csv-string');
exports.parseCSV = (csv) => {
    let results;
    results = parser.parse(csv);
    results.shift();
    const map = new Map();
    results.forEach((result) => {
        const problem = diagnostics_1.createDiagnostic(result);
        if (!problem) {
            return;
        }
        if (map.has(result[constants_1.FILE])) {
            map.get(result[constants_1.FILE]).push(problem);
        }
        else {
            map.set(result[constants_1.FILE], [problem]);
        }
    });
    return map;
};
//# sourceMappingURL=parse.js.map