const fs = require("fs");
const fetch = require("node-fetch");
const args = process.argv;

try {
    const file = args[2].includes(".uwu") ? fs.readFileSync(args[2], 'utf8') : fs.readFileSync(args[2] + ".uwu", 'utf8');

    const keywords = ["if", "else", "then", "var", "repeat", "get", "fun", "write", "return", "while", "do", "uwu"];
    const uwu = { 
        random: () => Math.floor(Math.random() * 100)
    };

    file.split("\n").forEach(line => {
        const tokens = line.split("");
        const res = [];

        for (const char of tokens) {
            res.push(char);
            const token = res.join("");

            switch(token) {
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
                        if (line.split(" ")[line.split(" ").indexOf("else")] === "else") {
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
                    const name = statment[1];
                    const value = statment[3];
                    keywords.forEach(keyword => {
                        if (name === keyword) {
                            throw "Syntax Error: you cannot name a variable using a keyword.";
                        } 
                    })
                    eval(`uwu.${name} = ${value}`)
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
                case "fun":
                    const functionName = line.split(" ")[1].substring(0, line.split(" ")[1].indexOf("("));
                    const params = line.substring(line.indexOf("("), line.indexOf(")")+1);
                    if (line.split(" ")[2] !== "=>") {
                        throw "Syntax error: '=>' missing in function expression."
                    } 

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