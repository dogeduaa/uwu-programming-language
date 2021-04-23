function test(file, line, uwu) {
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
}

export default test;