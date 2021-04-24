const fs = require("fs");
const fetch = require("node-fetch");
const args = process.argv;
const keywords = ["if", "else", "then", "var", "repeat", "get", "fun", "write", "return", "while", "do", "uwu", "import", "for", "async", "await", "promise", "class"];
const uwu = { random: () => Math.floor(Math.random() * 100) };
const dataTypes = ['str', 'num', 'bool', 'null'];

import writeCommand from "./features/write-command";
import ifStatement from "./features/conditionals";
import variables from "./features/variables";
import functions from "./features/functions";
import repeat from "./features/repeat";
import get from "./features/get";
import forLoop from "./features/for-loop";
import whileLoop from "./features/while-loop";
import test from "./features/test";
import indexImport from "./features/index-import";

try {
    let filename = args[2].includes(".uwu") ? args[2] : args[2] + ".uwu";
    let file;
    
    try { file = fs.readFileSync(filename, 'utf8'); } catch(err) { throw "Error: file not found" }

    file.split("\n").forEach(line => {
        const tokens = line.split("");
        const res = [];

        for (const char of tokens) {
            res.push(char);
            const token = res.join("");

            switch(token) {
                case "import":
                    indexImport(line, uwu, keywords, dataTypes, fs, fetch, args);
                    break;
                case "write":
                    writeCommand(line, uwu);
                    break;
                case "if":
                    ifStatement(file, line, uwu);
                    break;
                case "--":
                    break;
                case "var":
                    variables(line, dataTypes, keywords, uwu)
                    break;
                case "repeat":
                    repeat(line, uwu);
                    break;
                case "get": 
                    get(line, fetch);
                    break;
                case "sex":
                    test(file, line, uwu);   
                    break;
                case "for":
                    forLoop(line, uwu);
                    break;
                case "fun":
                    functions(file, line, uwu, fetch, keywords, dataTypes);
                    break;
                case "uwu":
                    eval(line);
                    break;
                case "while": 
                    whileLoop(line, uwu);
                    break;
            }
        }
    });    
} catch(err) {
    console.log(err);
}