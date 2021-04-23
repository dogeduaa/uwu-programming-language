function variables(line, dataTypes, keywords, uwu) {
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
                    throw `Type error: can't assign a variable of type ${type} to a ${typeof eval(statment[4])}`
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
}

export default variables;