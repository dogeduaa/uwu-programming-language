const fs = require("fs");
const args = process.argv;

try {
    const file = args[2].includes(".uwu") ? fs.readFileSync(args[2], 'utf8') : fs.readFileSync(args[2] + ".uwu", 'utf8');

    file.split("\n").forEach(line => {
        const token = line.split(" ")[0];
        switch(token) {
            case "print":
                const message = line.split(" ")[line.indexOf("print") + 1];
                if (message.startsWith("\"")) {
                    console.log(message.split("").filter(char => char !== "\"").join(""));
                } else {
                    console.log(eval(message))
                }
                break;
            case "if":
                const statement = line.split(" ");
                if (eval(statement[1])) {
                    if (statement[2] === "then") {
                        if (statement[3] === "print") {
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
                        if (statement[6] === "print") {
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
                const isInit = statment[2] === "=" ? true : false;
                const value = statment[3];
                console.log(`Variable syntax detected, Name: ${name}, Initialized: ${isInit}, Value: ${value}`)
                break;
            case "repeat":
                const stament = line.split(" ");
                for (let i = 0; i < parseInt(stament[1]); i++) {
                    if (stament[2] === "print") {
                        const message = stament[3];
                            if (message.startsWith("\"")) {
                                console.log(message.split("").filter(char => char !== "\"").join(""));
                            } else {
                                console.log(eval(message));
                            }
                    }
                } 
        }
    });
} catch(err) {
    console.log(err);
}