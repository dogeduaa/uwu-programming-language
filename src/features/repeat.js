function repeat(line, uwu) {
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
}

export default repeat;