import handleModule from "./modules";

function indexImport(line, uwu, keywords, dataTypes, fs, fetch, args) {
    const mod = line.split(" ")[1].substring(0, line.split(" ")[1].length-1).split("").filter(char => char !== "\"").join("")
    let pas;
    try {pas = fs.readFileSync(mod, "utf8")} catch(err) {throw "Module Error: File not found"}
    handleModule(pas, uwu, keywords, dataTypes, fs, fetch, line)
}

export default indexImport;