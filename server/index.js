const http = require("http");
const fs = require("fs");
const url = require("url");


const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} New Req Recieved\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl)
    if (req.url === "/favicon.ico") return res.end();
    fs.appendFile("log.txt", log, (err, data) =>{
        switch (myUrl.pathname) {
            case "/":
                res.end("homepage");
                break;
            case "/about":
                const username = myUrl.query.myname;
                res.end(`hi ${username}`);
                break;
            case "/search":
                const search = myUrl.query.search_query;
                res.end("your results for"+ search);
                break;
            default:
                res.end("404")
                break;
        }
        
    });
});

myServer.listen(8000, () => console.log("server satrted"));
