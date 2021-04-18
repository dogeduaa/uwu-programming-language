const fs = require("fs");
const fetch = require("node-fetch");
const args = process.argv;

try {
    const file = args[2].includes(".uwu") ? fs.readFileSync(args[2], 'utf8') : fs.readFileSync(args[2] + ".uwu", 'utf8');

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
                            }
                        } 
                    } else {
                        if (statement[5] === "else") {
                            if (statement[6] === "write") {
                                const message = statement[7];
                                if (message.startsWith("\"")) {
                                    console.log(message.split("").filter(char => char !== "\"").join(""));
                                } else {
                                    console.log(eval(message));
                                }
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
                    const link = line.split(" ")[1];
                    fetch(link).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err));
                    break;
                case "fun":
                    const functionName = line.split(" ")[1].substring(0, line.split(" ")[1].indexOf("("));
                    const params = line.substring(line.indexOf("("), line.indexOf(")")+1);
                    if (line.split(" ")[2] !== "=>") {
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
                                    }
                                }
                            } else {
                                if (line.split(" ")[8] === "else") {
                                    if (line.split(" ")[9] === "write") {
                                        const message = line.split(" ")[10];
                                        if (message.startsWith("\"")) {
                                            eval(`uwu.${functionName} = ${params} => console.log(${message})`);
                                        } else {
                                            eval(`uwu.${functionName} = ${params} => console.log(${message})`)
                                        }
                                    }
                                }
                            }
                        }
                    }
                    break;
                case "uwu":
                    eval(line)
            }
        }
    });    
} catch(err) {
    console.log(err);
}