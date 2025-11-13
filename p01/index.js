const express = require("express");
const users = require("./MOCK_DATA.json")
const fs = require("fs");

const app = express();
const PORT = 8000;
app.use(express.urlencoded({extended : false}));

//routes
app.get("/users", (req, res) =>{
    const html = `
        <ul>
            ${users.map((users)=> `<li>${users.first_name} </li>`).join("")}
        </ul>
    `;
    res.send(html);
});


//rest
app.get("/api/users", (req, res) =>{
    return res.json(users);
});

app
    .route("/api/users/:id")
    .get((req, res) =>{
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })

    .patch((req, res) =>{
        const id = Number(req.params.id);
        const updates = req.body; 
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex === -1) {
            return res.json({ status: "error", message: "User not found" });
        }
        users[userIndex] = { ...users[userIndex], ...updates };
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
            if (err) {
                return res.json({ status: "error", message: "Failed to update file" });
            }
            return res.json({status: "success",message: `User with id ${id} updated`,updated_user: users[userIndex]});
        });
    })

    .delete((req, res) =>{
        const id = Number(req.params.id);
        const userIndex = users.findIndex(u => u.id === id);
        users.splice(userIndex, 1);
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
            if (err) {
                return res.json({ status: "error", message: "Failed to update file" });
            }
            return res.json({status: "success", message: `User with id ${id} deleted`,remaining_users: users.length });
        });
});

app.post("/api/users", (req, res) =>{
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
        return res.json({status: "success", id: users.length});
    } );
    
});

app.listen(PORT, ()=> console.log(`SERVER STARTED AT PORT ${PORT}`));
