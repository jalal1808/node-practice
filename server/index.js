const express = require("express");

const app = express();

app.get("/", (req, res)=> {
    return res.send("home page")
})
app.get("/about", (req, res)=> {
    return res.send(`hello ${req.query.name}`)
})

function myHandler(req, res) {
    if (req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.url} New Req Recieved\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl)
    
    fs.appendFile("log.txt", log, (err, data) =>{
        switch (myUrl.pathname) {
            case "/":
                if (req.method==="Get")res.end("homepage");             
                break;
            case "/about":
                const username = myUrl.query.myname;
                res.end(`hi ${username}`);
                break;
            case "/search":
                const search = myUrl.query.search_query;
                res.end("your results for"+ search);
                break;
            case "/signup":
                if (req.method==="Get") res.end("signup form"); 
                else if (req.method==="Post") res.end("success");               
                break;
            default:
                res.end("404")
                break;
        }
        
    });
}
app.listen("8000", () => console.log("server satrted"));
