function get(line, fetch) {
    const link = line.split(" ")[1].split("").filter(char => char !== "\"").join("");
    fetch(link).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err));
}

export default get;