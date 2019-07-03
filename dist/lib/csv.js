"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser = require("csv-string");
const COLUMNS = [
    'problem',
    'package',
    'file',
    'priority',
    'line',
    'description',
    'ruleSet',
    'rule'
];
exports.parseCSV = (csv) => {
    let results;
    let options = {
        columns: COLUMNS,
        relax_colmn_count: true,
    };
    results = parser.
    ;
};
//# sourceMappingURL=csv.js.map