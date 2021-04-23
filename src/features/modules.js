import ifStatement from "./conditionals";
import forLoop from "./for-loop";
import functions from "./functions";
import get from "./get";
import indexImport from "./index-import";
import repeat from "./repeat";
import test from "./test";
import variables from "./variables";
import whileLoop from "./while-loop";
import writeCommand from "./write-command";

export default function handleModule(mod, uwu, keywords, dataTypes, fs, fetch, line) {
    mod.split("\n").forEach(line => {
        const tokens = line.split("");
        const es = [];
        let file = mod;
        for (const char of tokens) {
            es.push(char);
            const tokn = es.join("");

            switch(tokn) {
                case "import":
                    indexImport(line, uwu, keywords, dataTypes, fs, fetch);
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
                    variables(line, dataTypes, keywords, uwu);
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
                    functions(file, line, uwu);
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
}
