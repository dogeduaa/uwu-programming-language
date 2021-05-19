function forLoop(line, uwu, file) {
    let conditions = [];

    line.substring(line.indexOf("("), line.indexOf(")")+1).split(";").forEach(char => {
        conditions.push(char.split("").filter(letter => letter !== "(" && letter !== ")").join("").replace("var", "let").trim())
    })

    let cod = [];
    let kod = [];

    for (let c = 1; true; c++) {
        if (file.split("\n")[file.split("\n").indexOf(line)+c].includes("}")) {
            break;
        } else {
            cod.push(file.split("\n")[file.split("\n").indexOf(line)+c].trim())
        }
    }

    cod.forEach(b => {
        if (b.split(" ")[0] === "write") {
            kod.push(`console.log(${b.split(" ")[1]})`)
        }
    })

    eval(`
    ${conditions[0]}
    while(${conditions[1]}) {
        ${kod.join("\n")}
        ${conditions[2]}
    }
    `)
}

export default forLoop;