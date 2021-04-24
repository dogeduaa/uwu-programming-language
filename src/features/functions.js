function functions(file, line, uwu, fetch, keywords, dataTypes) {
    const code = [];
    const functionName = line.split(" ")[1].substring(0, line.split(" ")[1].indexOf("("));
    const params = line.substring(line.indexOf("("), line.indexOf(")")+1);
    if (line.split(" ")[2].substring(0, line.split(" ")[2].length-1) === "{") {
        for (let c = 1; true; c++) {
            if (file.split("\n")[file.split("\n").indexOf(line)+c].includes("}")) {
                eval(`uwu.${functionName} = ${params} => {${code.join("\n")}}`)
                break;
            } else {
                const cond = file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[0];
                const message = file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[1];
                if (cond === "write") {
                    code.push(`console.log(${message})`);
                } else if (cond === "get") {
                    code.push(`fetch(${file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[1]}).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err));`);
                } else if (cond === "return") {
                    code.push(`return ${message}`);
                } else if (cond === "repeat") {
                    code.push(`
                        for (let i = 0; i < parseInt(${file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[1]}); i++) {
                            if ("${file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[2]}" === "write") {
                                console.log(${file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[3]});
                            }
                        }`);
                } else if (cond === "--") {
                    
                } else if (cond === "var") {
                    const nam = file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[1];
                    const value = file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[3];
                    keywords.forEach(keyword => {
                        if (nam === keyword) {
                            throw "Syntax Error: you cannot name a variable using a keyword.";
                        } 
                    })
                    code.push(`let ${nam} = ${value}`)
                } else if (cond === "for") {
                    let cod = [];
                    let kod = [];

                    for (let c = 1; true; c++) {
                        if (file.split("\n")[file.split("\n").indexOf(line)+c].includes("}")) {
                            break;
                        } else {
                            cod.push(file.split("\n")[file.split("\n").indexOf(line)+c].trim().replace("var", "let"))
                        }
                    }

                    let lyne = file.split("\n")[file.split("\n").indexOf(line)+c].trim();
                    let conditions = []
                    
                    lyne.substring(lyne.indexOf("("), lyne.indexOf(")")+1).split(";").forEach(char => {
                        conditions.push(char.split("").filter(letter => letter !== "(" && letter !== ")").join("").replace("var", "let").trim())
                    })

                    cod.forEach(b => {
                        if (b.split(" ")[0] === "write") {
                            kod.push(`console.log(${b.split(" ")[1]})`)
                        } 
                    })

                    code.push(`
                    ${conditions[0]}
                    while(${conditions[1]}) {
                        ${kod.join("\n")}
                        ${conditions[2]}
                    }
                    `)
                } else if (cond === "if") {
                    const statement = file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ");

                    if (file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[1].startsWith("(")) {
                        let conditios = [];

                        console.log(conditios)
                        let g = 0;
                        for (let c = 1; true; c++) {
                            if (file.split("\n")[file.split("\n").indexOf(line)+c].includes("}")) {
                                g = c;
                                break;
                            } 
                        }
                
                        if (conditios.join("")) {
                            if (eval(conditios.join(""))) {
                                for (let c = 1; true; c++) {
                                    if (file.split("\n")[file.split("\n").indexOf(line)+c].includes("}")) {
                                        break;
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
                            } else {
                                let curLine = file.split("\n")[file.split("\n").indexOf(line)+g];
                                if (curLine.replace("}", "").trim().split(" ")[0] === "else") {
                                    for (let a = 1; true; a++) {
                                        if (file.split("\n")[file.split("\n").indexOf(curLine)+a].includes("}")) {
                                            break;
                                        } else {
                                            // console.log(file.split("\n")[file.split("\n").indexOf(curLine)+a].trim())
                                            if (file.split("\n")[file.split("\n").indexOf(curLine)+a].trim().split(" ")[0] === "write") {
                                                const message = file.split("\n")[file.split("\n").indexOf(curLine)+a].trim().split(" ")[1];
                                                if (message.startsWith("\"")) {
                                                    console.log(message.split("").filter(char => char !== "\"").join(""));
                                                } else {
                                                    console.log(eval(message));
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            return;
                        }
                    }

                    if (eval(statement[1])) {
                        if (statement[2] === "then") {
                            if (statement[3] === "write") {
                                if (file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[4].startsWith("\"")) {
                                    code.push(`\nconsole.log(${file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[4]}.split("").filter(char => char !== '"').join(""))`);
                                } else {
                                    code.push(`console.log(${file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[4]})`);
                                }
                            } else if (statement[3] === "var") {
                                const nam = file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[4];
                                const value = file.split("\n")[file.split("\n").indexOf(line)+c].trim().split(" ")[6];
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
}

export default functions;