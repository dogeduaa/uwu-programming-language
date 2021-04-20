const fs = require("fs");
const fetch = require("node-fetch");
const args = process.argv;

const keywords = ["if", "else", "then", "var", "repeat", "get", "fun", "write", "return", "while", "do", "uwu"];
const uwu = { 
    random: () => Math.floor(Math.random() * 100)
};
const dataTypes = ['str', 'num', 'bool'];


function handleModule(mod) {
    mod.split("\n").forEach(line => {
        const tokens = line.split("");
        const es = [];
        let file = mod;
        for (const char of tokens) {
            es.push(char);
            const tokn = es.join("");

            switch(tokn) {
                case "import":
                    const mod = line.split(" ")[1].substring(0, line.split(" ")[1].length-1).split("").filter(char => char !== "\"").join("")
                    let pas;
                    try { pas = fs.readFileSync(mod, "utf8"); } catch(err) { throw "Module error: file not found" }
                    handleModule(pas)
                    break;
                    case "write":
                    const message = line.substr("write".length, line.length);
                    if (message.startsWith("\"")) {
                        console.log(message.split("").filter(char => char !== "\"").join(""));
                    } else {
                        console.log(eval(message))
                        return
                    }
                    break;
                case "if":
                    const statement = line.split(" ");
                    if (eval(statement[1])) {
                        if (statement[2] === "then") {
                            if (statement[3] === "write") {
                                const message = statement[4];
                                if (message.startsWith("\"")) {
                                    console.log(message.split("").filter(char => char !== "\"").join(""));
                                } else {
                                    console.log(eval(message));
                                }
                            } else if (statement[3] === "var") {
                                const name = statement[4];
                                const value = statement[6];
                                keywords.forEach(keyword => {
                                    if (name === keyword) {
                                        throw "Syntax Error: you cannot name a variable using a keyword.";
                                    } 
                                })
                                eval(`uwu.${name} = ${value}`)
                            } else if (statement[3] === "repeat") {
                                for (let i = 0; i < parseInt(statement[4]); i++) {
                                    if (statement[5] === "write") {
                                        const message = statement[6];
                                            if (message.startsWith("\"")) {
                                                console.log(message.split("").filter(char => char !== "\"").join(""));
                                            } else {
                                                console.log(eval(message));
                                            }
                                    }
                                }
                            } else if (statement[3] === "get") {
                                const link = statement[4].split("").filter(char => char !== "\"").join("");
                                fetch(link).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err));
                            }
                        } 
                    } else { 
                        if (line.split(" ")[line.split(" ").indexOf("elseif")] === "elseif") {
                            if (eval(line.split(" ")[line.split(" ").indexOf("elseif")+1])) {
                                if (line.split(" ")[line.split(" ").indexOf("elseif")+2] === "write") {
                                    const message = line.split(" ")[line.split(" ").indexOf("elseif")+3];
                                        if (message.startsWith("\"")) {
                                            console.log(message.split("").filter(char => char !== "\"").join(""));
                                        } else {
                                            console.log(eval(message));
                                        }
                                }
                            }
                        } else if (line.split(" ")[line.split(" ").indexOf("else")] === "else") {
                            if (line.split(" ")[line.split(" ").indexOf("else")+1] === "write") {
                                const message = line.split(" ")[line.split(" ").indexOf("else")+2];
                                if (message.startsWith("\"")) {
                                    console.log(message.split("").filter(char => char !== "\"").join(""));
                                } else {
                                    console.log(eval(message));
                                }
                            } else if (line.split(" ")[line.split(" ").indexOf("else")+1] === "var") {
                                const name = line.split(" ")[line.split(" ").indexOf("else")+2];
                                const value = line.split(" ")[line.split(" ").indexOf("else")+4];
                                keywords.forEach(keyword => {
                                    if (name === keyword) {
                                        throw "Syntax Error: you cannot name a variable using a keyword.";
                                    } 
                                })
                                eval(`uwu.${name} = ${value}`)
                            } else if (line.split(" ")[line.split(" ").indexOf("else")+1] === "repeat") {
                                for (let i = 0; i < parseInt(line.split(" ")[line.split(" ").indexOf("else")+2]); i++) {
                                    if (line.split(" ")[line.split(" ").indexOf("else")+3] === "write") {
                                        const message = line.split(" ")[line.split(" ").indexOf("else")+4];
                                            if (message.startsWith("\"")) {
                                                console.log(message.split("").filter(char => char !== "\"").join(""));
                                            } else {
                                                console.log(eval(message));
                                            }
                                    }
                                }
                            } else if (line.split(" ")[line.split(" ").indexOf("else")+1] === "get") {
                                const link = line.split(" ")[line.split(" ").indexOf("else")+2].split("").filter(char => char !== "\"").join("");
                                fetch(link).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err));
                            }
                        } 
                    }
                    break;
                case "--":
                    break;
                case "var":
                    const statment = line.split(" ");
                    let strongtyped = false;
                    dataTypes.forEach(type => {
                        if (statment[1] === type) {
                            // console.log(type)
                            strongtyped = true;
                            if (type === "str") {
                                if (typeof eval(statment[4]) !== "string") {
                                    throw `Type error: can't assign a variable of type ${type} to a ${typeof eval(statment[4])}`
                                }
                            } else if (type === "num") {
                                if (typeof eval(statment[4]) !== "number") {
                                    throw `>> ${args[2].includes(".uwu") ? args[2] : args[2] + ".uwu"}:${file.split("\n").indexOf(line)+1} >> Type error: can't assign a variable of type ${type} to a ${typeof eval(statment[4])}`
                                }
                            } else if (type === "bool") {
                                if (typeof eval(statment[4]) !== "boolean") {
                                    throw `Type error: can't assign a variable of type ${type} to a ${typeof eval(statment[4])}`
                                }
                            }

                            const name = statment[2];
                            const value = statment[4];
                            keywords.forEach(keyword => {
                                if (name === keyword) {
                                    throw "Syntax Error: you cannot name a variable using a keyword.";
                                } 
                            })
                            eval(`uwu.${name} = ${value}`)

                        }
                    })

                    if (strongtyped) {
                        return
                    } else {
                        const name = statment[1];
                        const value = statment[3];
                        keywords.forEach(keyword => {
                            if (name === keyword) {
                                throw "Syntax Error: you cannot name a variable using a keyword.";
                            } 
                        })
                        eval(`uwu.${name} = ${value}`)
                    }
                    break;
                case "repeat":
                    const stament = line.split(" ");
                    for (let i = 0; i < parseInt(stament[1]); i++) {
                        if (stament[2] === "write") {
                            const message = stament[3];
                                if (message.startsWith("\"")) {
                                    console.log(message.split("").filter(char => char !== "\"").join(""));
                                } else {
                                    console.log(eval(message));
                                }
                        }
                    } 
                    break;
                case "get": 
                    const link = line.split(" ")[1].split("").filter(char => char !== "\"").join("");
                    fetch(link).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err));
                    break;
                case "sex":
                    for (let c = 1; true; c++) {
                        if (file.split("\n")[file.split("\n").indexOf(line)+c].includes("}")) {
                            break;   
                            // file.split("\n")[file.split("\n").indexOf(line)+c].trim()
                        } else {
                            if (file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[0] === "write") {
                                const message = file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[1];
                                if (message.startsWith("\"")) {
                                    console.log(message.split("").filter(char => char !== "\"").join(""));
                                } else {
                                    console.log(eval(message));
                                }
                            }
                        }  
                    }
                    break;
                case "fun":
                    const code = [];
                    const functionName = line.split(" ")[1].substring(0, line.split(" ")[1].indexOf("("));
                    const params = line.substring(line.indexOf("("), line.indexOf(")")+1);
                    let url = "";
                    let lyne = "";
                    if (line.split(" ")[2].substring(0, line.split(" ")[2].length-1) === "{") {
                        for (let c = 1; true; c++) {
                            if (file.split("\n")[file.split("\n").indexOf(line)+c].includes("}")) {
                                eval(`uwu.${functionName} = ${params} => {${code.join("\n")}}`)
                                break;
                            } else {
                                const lne = file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" "); 
                                const cond = file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[0];
                                const message = file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[1];
                                if (cond === "write") {
                                    code.push(`console.log(${message})`);
                                } else if (cond === "get") {
                                    url = file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[1].split("").filter(char => char !== "\"").join("");
                                    code.push("fetch(url).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err));")
                                } else if (cond === "return") {
                                    code.push(`return ${message}`);
                                } else if (cond === "repeat") {
                                    lyne = lne;
                                    code.push(`
                                        for (let i = 0; i < parseInt(lyne[1]); i++) {
                                            if (lyne[2] === "write") {
                                                if (lyne[3].startsWith('"')) {
                                                    console.log(lyne[3].split("").filter(char => char !== '"').join(""));
                                                } else {
                                                    console.log(eval(lyne[3]));
                                                }
                                            }
                                        }`);
                                } else if (cond === "--") {
                                    
                                } else if (cond === "var") {
                                    const nam = lne[1];
                                    const value = lne[3];
                                    keywords.forEach(keyword => {
                                        if (nam === keyword) {
                                            throw "Syntax Error: you cannot name a variable using a keyword.";
                                        } 
                                    })
                                    code.push(`let ${nam} = ${value}`)
                                } else if (cond === "if") {
                                    const statement = lne;
                                    if (eval(statement[1])) {
                                        if (statement[2] === "then") {
                                            if (statement[3] === "write") {
                                                lyne = lne
                                                if (lne[4].startsWith("\"")) {
                                                    code.push(`\nconsole.log(lyne[4].split("").filter(char => char !== '"').join(""))`);
                                                } else {
                                                    code.push(`console.log(lyne[4])`);
                                                }
                                            } else if (statement[3] === "var") {
                                                const nam = lne[4];
                                                const value = lne[6];
                                                keywords.forEach(keyword => {
                                                    if (nam === keyword) {
                                                        throw "Syntax Error: you cannot name a variable using a keyword.";
                                                    } 
                                                })
                                                code.push(`let ${nam} = ${value}`)
                                            } else if (statement[3] === "repeat") {
                                                for (let i = 0; i < parseInt(statement[4]); i++) {
                                                    if (statement[5] === "write") {
                                                        const message = statement[6];
                                                            if (message.startsWith("\"")) {
                                                                console.log(message.split("").filter(char => char !== "\"").join(""));
                                                            } else {
                                                                console.log(eval(message));
                                                            }
                                                    }
                                                }
                                            } else if (statement[3] === "get") {
                                                const link = statement[4].split("").filter(char => char !== "\"").join("");
                                                fetch(link).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err));
                                            }
                                        } 
                                    } else { 
                                        if (line.split(" ")[line.split(" ").indexOf("elseif")] === "elseif") {
                                            if (eval(line.split(" ")[line.split(" ").indexOf("elseif")+1])) {
                                                if (line.split(" ")[line.split(" ").indexOf("elseif")+2] === "write") {
                                                    const message = line.split(" ")[line.split(" ").indexOf("elseif")+3];
                                                        if (message.startsWith("\"")) {
                                                            console.log(message.split("").filter(char => char !== "\"").join(""));
                                                        } else {
                                                            console.log(eval(message));
                                                        }
                                                }
                                            }
                                        } else if (line.split(" ")[line.split(" ").indexOf("else")] === "else") {
                                            if (line.split(" ")[line.split(" ").indexOf("else")+1] === "write") {
                                                const message = line.split(" ")[line.split(" ").indexOf("else")+2];
                                                if (message.startsWith("\"")) {
                                                    console.log(message.split("").filter(char => char !== "\"").join(""));
                                                } else {
                                                    console.log(eval(message));
                                                }
                                            } else if (line.split(" ")[line.split(" ").indexOf("else")+1] === "var") {
                                                const name = line.split(" ")[line.split(" ").indexOf("else")+2];
                                                const value = line.split(" ")[line.split(" ").indexOf("else")+4];
                                                keywords.forEach(keyword => {
                                                    if (name === keyword) {
                                                        throw "Syntax Error: you cannot name a variable using a keyword.";
                                                    } 
                                                })
                                                eval(`uwu.${name} = ${value}`)
                                            } else if (line.split(" ")[line.split(" ").indexOf("else")+1] === "repeat") {
                                                for (let i = 0; i < parseInt(line.split(" ")[line.split(" ").indexOf("else")+2]); i++) {
                                                    if (line.split(" ")[line.split(" ").indexOf("else")+3] === "write") {
                                                        const message = line.split(" ")[line.split(" ").indexOf("else")+4];
                                                            if (message.startsWith("\"")) {
                                                                console.log(message.split("").filter(char => char !== "\"").join(""));
                                                            } else {
                                                                console.log(eval(message));
                                                            }
                                                    }
                                                }
                                            } else if (line.split(" ")[line.split(" ").indexOf("else")+1] === "get") {
                                                const link = line.split(" ")[line.split(" ").indexOf("else")+2].split("").filter(char => char !== "\"").join("");
                                                fetch(link).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err));
                                            }
                                        } 
                                    }
                                }
                            }  
                        }
                    } else if (line.split(" ")[2] !== "=>") {
                        throw "Syntax error: '=>' missing in function expression."
                    } else {
                        if (line.split(" ")[3] === "write") {
                            const message = line.split(" ")[4]
                            eval(`uwu.${functionName} = ${params} => console.log(${message})`);
                        } else if (line.split(" ")[3] === "return") {
                            const message = line.split(" ")[4]
                            eval(`uwu.${functionName} = ${params} => ${message}`)
                        } else if (line.split(" ")[3] === "if") {
                            if (eval(line.split(" ")[4])) {
                                if (line.split(" ")[5] === "then") {
                                    if (line.split(" ")[6] === "write") {
                                        const message = line.split(" ")[7];
                                        if (message.startsWith("\"")) {
                                            eval(`uwu.${functionName} = ${params} => console.log(${message})`);
                                        } else {
                                            eval(`uwu.${functionName} = ${params} => console.log(${message})`)
                                        }
                                    } else if (line.split(" ")[6] === "return") {
                                        const message = line.split(" ")[7];
                                        eval(`uwu.${functionName} = ${params} => ${message}`);
                                    } else if (line.split(" ")[6] === 'repeat') {
                                        const message = line.split(" ")[9].split("").filter(char => char !== "\"").join("");
                                        eval(`uwu.${functionName} = ${params} => {
                                            for (let i = 0; i < parseInt(line.split(" ")[7]); i++) {
                                                if (line.split(" ")[8] === "write") {
                                                    console.log(message)
                                                }
                                            }
                                        }`);
                                    }
                                }
                            } else {
                                if (line.split(" ")[line.split(" ").indexOf("else")] === "else") {
                                    if (line.split(" ")[line.split(" ").indexOf("else")+1] === "write") {
                                        const message = line.split(" ")[line.split(" ").indexOf("else")+2];
                                        if (message.startsWith("\"")) {
                                            eval(`uwu.${functionName} = ${params} => console.log(${message})`);
                                        } else {
                                            eval(`uwu.${functionName} = ${params} => console.log(${message})`);
                                        }
                                    } else if (line.split(" ")[line.split(" ").indexOf("else")+1] === "return") {
                                        const message = line.split(" ")[line.split(" ").indexOf("else")+2];
                                        eval(`uwu.${functionName} = ${params} => ${message}`);
                                    } else if (line.split(" ")[line.split(" ").indexOf("else")+1] === "repeat") {
                                        if (line.split(" ")[line.split(" ").indexOf("else")+3] === "write") {
                                            const message = line.split(" ")[line.split(" ").indexOf("else")+1+3].split("").filter(char => char !== "\"").join("");
                                            eval(`uwu.${functionName} = ${params} => {
                                                let ppp = 0;
                                                while(ppp < ${line.split(" ")[line.split(" ").indexOf("else")+2]}) {
                                                    console.log(message)
                                                    ppp += 1;
                                                }
                                            }`)
                                        }
                                    }
                                }
                            }
                        } else if (line.split(" ")[3] === "get") {
                            const link = line.split(" ")[4].split("").filter(char => char !== "\"").join("");
                            eval(`uwu.${functionName} = ${params} => fetch(link).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err))`)
                        } 
                    }
                    break;
                case "uwu":
                    eval(line)
                    break;
                case "while": 
                    while(eval(line.split(" ")[1])) {
                        if (line.split(" ")[2] === "do") {
                            if (line.split(" ")[3] === "write") {
                                const message = line.split(" ")[4];
                                if (message.startsWith("\"")) {
                                    console.log(message.split("").filter(char => char !== "\"").join(""));
                                } else {
                                    console.log(eval(message))
                                    return
                                }
                                if (line.split(" ")[5]) {
                                    eval(line.split(" ")[5]);
                                }
                            } else if (line.split(" ")[3] === "get") {
                                const link = line.split(" ")[4].split("").filter(char => char !== "\"").join("");
                                fetch(link).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err));
                                if (line.split(" ")[5]) {
                                    eval(line.split(" ")[5]);
                                }
                            }
                        } else {
                            throw "Syntax Error: missing 'do' keyword";
                        }
                    }
                    break;
            }
        }
    }); 
}

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
                    const mod = line.split(" ")[1].substring(0, line.split(" ")[1].length-1).split("").filter(char => char !== "\"").join("")
                    let pas;
                    try {pas = fs.readFileSync(mod, "utf8")} catch(err) {throw args[2].includes(".uwu") ? args[2] : args[2] + ".uwu" + ", Module Error: File not found"}
                    handleModule(pas)
                    break;
                case "write":
                    const message = line.substr("write".length, line.length);
                    if (message.startsWith("\"")) {
                        console.log(message.split("").filter(char => char !== "\"").join(""));
                    } else {
                        console.log(eval(message))
                        return
                    }
                    break;
                case "if":
                    const statement = line.split(" ");
                    if (eval(statement[1])) {
                        if (statement[2] === "then") {
                            if (statement[3] === "write") {
                                const message = statement[4];
                                if (message.startsWith("\"")) {
                                    console.log(message.split("").filter(char => char !== "\"").join(""));
                                } else {
                                    console.log(eval(message));
                                }
                            } else if (statement[3] === "var") {
                                const name = statement[4];
                                const value = statement[6];
                                keywords.forEach(keyword => {
                                    if (name === keyword) {
                                        throw "Syntax Error: you cannot name a variable using a keyword.";
                                    } 
                                })
                                eval(`uwu.${name} = ${value}`)
                            } else if (statement[3] === "repeat") {
                                for (let i = 0; i < parseInt(statement[4]); i++) {
                                    if (statement[5] === "write") {
                                        const message = statement[6];
                                            if (message.startsWith("\"")) {
                                                console.log(message.split("").filter(char => char !== "\"").join(""));
                                            } else {
                                                console.log(eval(message));
                                            }
                                    }
                                }
                            } else if (statement[3] === "get") {
                                const link = statement[4].split("").filter(char => char !== "\"").join("");
                                fetch(link).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err));
                            }
                        } 
                    } else { 
                        if (line.split(" ")[line.split(" ").indexOf("elseif")] === "elseif") {
                            if (eval(line.split(" ")[line.split(" ").indexOf("elseif")+1])) {
                                if (line.split(" ")[line.split(" ").indexOf("elseif")+2] === "write") {
                                    const message = line.split(" ")[line.split(" ").indexOf("elseif")+3];
                                        if (message.startsWith("\"")) {
                                            console.log(message.split("").filter(char => char !== "\"").join(""));
                                        } else {
                                            console.log(eval(message));
                                        }
                                }
                            }
                        } else if (line.split(" ")[line.split(" ").indexOf("else")] === "else") {
                            if (line.split(" ")[line.split(" ").indexOf("else")+1] === "write") {
                                const message = line.split(" ")[line.split(" ").indexOf("else")+2];
                                if (message.startsWith("\"")) {
                                    console.log(message.split("").filter(char => char !== "\"").join(""));
                                } else {
                                    console.log(eval(message));
                                }
                            } else if (line.split(" ")[line.split(" ").indexOf("else")+1] === "var") {
                                const name = line.split(" ")[line.split(" ").indexOf("else")+2];
                                const value = line.split(" ")[line.split(" ").indexOf("else")+4];
                                keywords.forEach(keyword => {
                                    if (name === keyword) {
                                        throw "Syntax Error: you cannot name a variable using a keyword.";
                                    } 
                                })
                                eval(`uwu.${name} = ${value}`)
                            } else if (line.split(" ")[line.split(" ").indexOf("else")+1] === "repeat") {
                                for (let i = 0; i < parseInt(line.split(" ")[line.split(" ").indexOf("else")+2]); i++) {
                                    if (line.split(" ")[line.split(" ").indexOf("else")+3] === "write") {
                                        const message = line.split(" ")[line.split(" ").indexOf("else")+4];
                                            if (message.startsWith("\"")) {
                                                console.log(message.split("").filter(char => char !== "\"").join(""));
                                            } else {
                                                console.log(eval(message));
                                            }
                                    }
                                }
                            } else if (line.split(" ")[line.split(" ").indexOf("else")+1] === "get") {
                                const link = line.split(" ")[line.split(" ").indexOf("else")+2].split("").filter(char => char !== "\"").join("");
                                fetch(link).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err));
                            }
                        } 
                    }
                    break;
                case "--":
                    break;
                case "var":
                    const statment = line.split(" ");
                    let strongtyped = false;
                    dataTypes.forEach(type => {
                        if (statment[1] === type) {
                            // console.log(type)
                            strongtyped = true;
                            if (type === "str") {
                                if (typeof eval(statment[4]) !== "string") {
                                    throw `Type error: can't assign a variable of type ${type} to a ${typeof eval(statment[4])}`
                                }
                            } else if (type === "num") {
                                if (typeof eval(statment[4]) !== "number") {
                                    throw `>> ${args[2].includes(".uwu") ? args[2] : args[2] + ".uwu"}:${file.split("\n").indexOf(line)+1} >> Type error: can't assign a variable of type ${type} to a ${typeof eval(statment[4])}`
                                }
                            } else if (type === "bool") {
                                if (typeof eval(statment[4]) !== "boolean") {
                                    throw `Type error: can't assign a variable of type ${type} to a ${typeof eval(statment[4])}`
                                }
                            }

                            const name = statment[2];
                            const value = statment[4];
                            keywords.forEach(keyword => {
                                if (name === keyword) {
                                    throw "Syntax Error: you cannot name a variable using a keyword.";
                                } 
                            })
                            eval(`uwu.${name} = ${value}`)

                        }
                    })

                    if (strongtyped) {
                        return
                    } else {
                        const name = statment[1];
                        const value = statment[3];
                        keywords.forEach(keyword => {
                            if (name === keyword) {
                                throw "Syntax Error: you cannot name a variable using a keyword.";
                            } 
                        })
                        eval(`uwu.${name} = ${value}`)
                    }
                    break;
                case "repeat":
                    const stament = line.split(" ");
                    for (let i = 0; i < parseInt(stament[1]); i++) {
                        if (stament[2] === "write") {
                            const message = stament[3];
                                if (message.startsWith("\"")) {
                                    console.log(message.split("").filter(char => char !== "\"").join(""));
                                } else {
                                    console.log(eval(message));
                                }
                        }
                    } 
                    break;
                case "get": 
                    const link = line.split(" ")[1].split("").filter(char => char !== "\"").join("");
                    fetch(link).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err));
                    break;
                case "sex":
                    for (let c = 1; true; c++) {
                        if (file.split("\n")[file.split("\n").indexOf(line)+c].includes("}")) {
                            break;   
                            // file.split("\n")[file.split("\n").indexOf(line)+c].trim()
                        } else {
                            if (file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[0] === "write") {
                                const message = file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[1];
                                if (message.startsWith("\"")) {
                                    console.log(message.split("").filter(char => char !== "\"").join(""));
                                } else {
                                    console.log(eval(message));
                                }
                            }
                        }  
                    }
                    break;
                case "fun":
                    const code = [];
                    const functionName = line.split(" ")[1].substring(0, line.split(" ")[1].indexOf("("));
                    const params = line.substring(line.indexOf("("), line.indexOf(")")+1);
                    let url = "";
                    let lyne = "";
                    if (line.split(" ")[2].substring(0, line.split(" ")[2].length-1) === "{") {
                        for (let c = 1; true; c++) {
                            if (file.split("\n")[file.split("\n").indexOf(line)+c].includes("}")) {
                                eval(`uwu.${functionName} = ${params} => {${code.join("\n")}}`)
                                break;
                            } else {
                                const lne = file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" "); 
                                const cond = file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[0];
                                const message = file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[1];
                                if (cond === "write") {
                                    code.push(`console.log(${message})`);
                                } else if (cond === "get") {
                                    url = file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[1].split("").filter(char => char !== "\"").join("");
                                    code.push("fetch(url).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err));")
                                } else if (cond === "return") {
                                    code.push(`return ${message}`);
                                } else if (cond === "repeat") {
                                    lyne = lne;
                                    code.push(`
                                        for (let i = 0; i < parseInt(lyne[1]); i++) {
                                            if (lyne[2] === "write") {
                                                if (lyne[3].startsWith('"')) {
                                                    console.log(lyne[3].split("").filter(char => char !== '"').join(""));
                                                } else {
                                                    console.log(eval(lyne[3]));
                                                }
                                            }
                                        }`);
                                } else if (cond === "--") {
                                    
                                } else if (cond === "var") {
                                    const nam = lne[1];
                                    const value = lne[3];
                                    keywords.forEach(keyword => {
                                        if (nam === keyword) {
                                            throw "Syntax Error: you cannot name a variable using a keyword.";
                                        } 
                                    })
                                    code.push(`let ${nam} = ${value}`)
                                } else if (cond === "if") {
                                    const statement = lne;
                                    if (eval(statement[1])) {
                                        if (statement[2] === "then") {
                                            if (statement[3] === "write") {
                                                lyne = lne
                                                if (lne[4].startsWith("\"")) {
                                                    code.push(`\nconsole.log(lyne[4].split("").filter(char => char !== '"').join(""))`);
                                                } else {
                                                    code.push(`console.log(lyne[4])`);
                                                }
                                            } else if (statement[3] === "var") {
                                                const nam = lne[4];
                                                const value = lne[6];
                                                keywords.forEach(keyword => {
                                                    if (nam === keyword) {
                                                        throw "Syntax Error: you cannot name a variable using a keyword.";
                                                    } 
                                                })
                                                code.push(`let ${nam} = ${value}`)
                                            } else if (statement[3] === "repeat") {
                                                for (let i = 0; i < parseInt(statement[4]); i++) {
                                                    if (statement[5] === "write") {
                                                        const message = statement[6];
                                                            if (message.startsWith("\"")) {
                                                                console.log(message.split("").filter(char => char !== "\"").join(""));
                                                            } else {
                                                                console.log(eval(message));
                                                            }
                                                    }
                                                }
                                            } else if (statement[3] === "get") {
                                                const link = statement[4].split("").filter(char => char !== "\"").join("");
                                                fetch(link).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err));
                                            }
                                        } 
                                    } else { 
                                        if (line.split(" ")[line.split(" ").indexOf("elseif")] === "elseif") {
                                            if (eval(line.split(" ")[line.split(" ").indexOf("elseif")+1])) {
                                                if (line.split(" ")[line.split(" ").indexOf("elseif")+2] === "write") {
                                                    const message = line.split(" ")[line.split(" ").indexOf("elseif")+3];
                                                        if (message.startsWith("\"")) {
                                                            console.log(message.split("").filter(char => char !== "\"").join(""));
                                                        } else {
                                                            console.log(eval(message));
                                                        }
                                                }
                                            }
                                        } else if (line.split(" ")[line.split(" ").indexOf("else")] === "else") {
                                            if (line.split(" ")[line.split(" ").indexOf("else")+1] === "write") {
                                                const message = line.split(" ")[line.split(" ").indexOf("else")+2];
                                                if (message.startsWith("\"")) {
                                                    console.log(message.split("").filter(char => char !== "\"").join(""));
                                                } else {
                                                    console.log(eval(message));
                                                }
                                            } else if (line.split(" ")[line.split(" ").indexOf("else")+1] === "var") {
                                                const name = line.split(" ")[line.split(" ").indexOf("else")+2];
                                                const value = line.split(" ")[line.split(" ").indexOf("else")+4];
                                                keywords.forEach(keyword => {
                                                    if (name === keyword) {
                                                        throw "Syntax Error: you cannot name a variable using a keyword.";
                                                    } 
                                                })
                                                eval(`uwu.${name} = ${value}`)
                                            } else if (line.split(" ")[line.split(" ").indexOf("else")+1] === "repeat") {
                                                for (let i = 0; i < parseInt(line.split(" ")[line.split(" ").indexOf("else")+2]); i++) {
                                                    if (line.split(" ")[line.split(" ").indexOf("else")+3] === "write") {
                                                        const message = line.split(" ")[line.split(" ").indexOf("else")+4];
                                                            if (message.startsWith("\"")) {
                                                                console.log(message.split("").filter(char => char !== "\"").join(""));
                                                            } else {
                                                                console.log(eval(message));
                                                            }
                                                    }
                                                }
                                            } else if (line.split(" ")[line.split(" ").indexOf("else")+1] === "get") {
                                                const link = line.split(" ")[line.split(" ").indexOf("else")+2].split("").filter(char => char !== "\"").join("");
                                                fetch(link).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err));
                                            }
                                        } 
                                    }
                                }
                            }  
                        }
                    } else if (line.split(" ")[2] !== "=>") {
                        throw "Syntax error: '=>' missing in function expression."
                    } else {
                        if (line.split(" ")[3] === "write") {
                            const message = line.split(" ")[4]
                            eval(`uwu.${functionName} = ${params} => console.log(${message})`);
                        } else if (line.split(" ")[3] === "return") {
                            const message = line.split(" ")[4]
                            eval(`uwu.${functionName} = ${params} => ${message}`)
                        } else if (line.split(" ")[3] === "if") {
                            if (eval(line.split(" ")[4])) {
                                if (line.split(" ")[5] === "then") {
                                    if (line.split(" ")[6] === "write") {
                                        const message = line.split(" ")[7];
                                        if (message.startsWith("\"")) {
                                            eval(`uwu.${functionName} = ${params} => console.log(${message})`);
                                        } else {
                                            eval(`uwu.${functionName} = ${params} => console.log(${message})`)
                                        }
                                    } else if (line.split(" ")[6] === "return") {
                                        const message = line.split(" ")[7];
                                        eval(`uwu.${functionName} = ${params} => ${message}`);
                                    } else if (line.split(" ")[6] === 'repeat') {
                                        const message = line.split(" ")[9].split("").filter(char => char !== "\"").join("");
                                        eval(`uwu.${functionName} = ${params} => {
                                            for (let i = 0; i < parseInt(line.split(" ")[7]); i++) {
                                                if (line.split(" ")[8] === "write") {
                                                    console.log(message)
                                                }
                                            }
                                        }`);
                                    }
                                }
                            } else {
                                if (line.split(" ")[line.split(" ").indexOf("else")] === "else") {
                                    if (line.split(" ")[line.split(" ").indexOf("else")+1] === "write") {
                                        const message = line.split(" ")[line.split(" ").indexOf("else")+2];
                                        if (message.startsWith("\"")) {
                                            eval(`uwu.${functionName} = ${params} => console.log(${message})`);
                                        } else {
                                            eval(`uwu.${functionName} = ${params} => console.log(${message})`);
                                        }
                                    } else if (line.split(" ")[line.split(" ").indexOf("else")+1] === "return") {
                                        const message = line.split(" ")[line.split(" ").indexOf("else")+2];
                                        eval(`uwu.${functionName} = ${params} => ${message}`);
                                    } else if (line.split(" ")[line.split(" ").indexOf("else")+1] === "repeat") {
                                        if (line.split(" ")[line.split(" ").indexOf("else")+3] === "write") {
                                            const message = line.split(" ")[line.split(" ").indexOf("else")+1+3].split("").filter(char => char !== "\"").join("");
                                            eval(`uwu.${functionName} = ${params} => {
                                                let ppp = 0;
                                                while(ppp < ${line.split(" ")[line.split(" ").indexOf("else")+2]}) {
                                                    console.log(message)
                                                    ppp += 1;
                                                }
                                            }`)
                                        }
                                    }
                                }
                            }
                        } else if (line.split(" ")[3] === "get") {
                            const link = line.split(" ")[4].split("").filter(char => char !== "\"").join("");
                            eval(`uwu.${functionName} = ${params} => fetch(link).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err))`)
                        } 
                    }
                    break;
                case "uwu":
                    eval(line)
                    break;
                case "while": 
                    while(eval(line.split(" ")[1])) {
                        if (line.split(" ")[2] === "do") {
                            if (line.split(" ")[3] === "write") {
                                const message = line.split(" ")[4];
                                if (message.startsWith("\"")) {
                                    console.log(message.split("").filter(char => char !== "\"").join(""));
                                } else {
                                    console.log(eval(message))
                                    return
                                }
                                if (line.split(" ")[5]) {
                                    eval(line.split(" ")[5]);
                                }
                            } else if (line.split(" ")[3] === "get") {
                                const link = line.split(" ")[4].split("").filter(char => char !== "\"").join("");
                                fetch(link).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err));
                                if (line.split(" ")[5]) {
                                    eval(line.split(" ")[5]);
                                }
                            }
                        } else {
                            throw "Syntax Error: missing 'do' keyword";
                        }
                    }
                    break;
            }
        }
    });    
} catch(err) {
    console.log(err);
}