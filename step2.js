const axios = require("axios");

async function webCat(data) {
    try {
        let info = await axios.get(data);
        console.log(info.data)
    }
    catch(e) {
        console.error("Error: Request failed with status code", e.request.res.statusCode);
    }
}
let path = process.argv[2];
webCat(path);
