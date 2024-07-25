const fs = require("fs");
const axios = require("axios");
async function webCat(data) {
    try {
        let info = await axios.get(data);
        return info.data
    }
    catch(e) {
        console.error("Error: Request failed with status code", e.request.res.statusCode);
    }
}
function cat(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}
if (process.argv[2] === "--out") {
    let path = process.argv[3];
    let outfile = process.argv[4];
    if (path.includes("http")) {
        webCat(path).then( s => {
            fs.writeFile(outfile, s, 'utf-8', err => {
                console.error(err);
            })
        })
       
    }
    else {
        cat(path).then( s => {
            fs.writeFile(outfile, s, 'utf-8', err => {
                console.log(err);
            })
        })
    }
    // fs.writeFile(path, '')
} else {
    let path = process.argv[2];
    if (path.includes("http")) {
        (async function() {
            let text = await webCat(path) 
            console.log(text)
        })();
    }
    else{
        (async function() {
            try {
                let text = await cat(path) 
                console.log(text)
            }
            catch(e) {
                console.error("Error:", e.code + ": no such file or directory, open", e.path);
                process.exit(1);      
            }

        })();


    }
}