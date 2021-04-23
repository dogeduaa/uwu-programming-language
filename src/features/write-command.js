export default function writeCommand(line, uwu) {
    const message = line.substr("write".length, line.length);
    if (message.startsWith("\"")) {
        console.log(message.split("").filter(char => char !== "\"").join(""));
    } else {
        console.log(eval(message))
        return
    }
}