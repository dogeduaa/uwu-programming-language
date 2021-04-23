function whileLoop(line, uwu) {
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
}

export default whileLoop;