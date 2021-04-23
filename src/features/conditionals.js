export default function ifStatement(file, line, uwu) {
    const statement = line.split(" ");

    if (line.split(" ")[1].startsWith("(")) {
        let conditios = [];

        line.substring(line.indexOf("("), line.indexOf(")")+1).split(";").forEach(char => {
            conditios.push(char.split("").filter(letter => letter !== "(" && letter !== ")").join("").replace("var", "let").trim())
        })
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
}