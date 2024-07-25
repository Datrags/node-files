const fs = require("fs")

function cat(path) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            console.error("Error:", 
                err.code+": no such file or directory, open", 
                err.path);
            process.exit(1);
        }
        console.log(data);
    });
}
let path = process.argv[2];
cat(path);
