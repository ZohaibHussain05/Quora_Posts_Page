const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static( path.join(__dirname,"public")));

let posts = [
    {
        username : "zohaib05",
        content: "I love coding"
    },
    {
        username: "Ali Ahmed",
        content: "I got my first job",
    },
    {
        username: "AbdurRehman",
        content: "check my new project"
    }
];

const port = 8080;
app.listen(port , () => {
    console.log(`App is listening on port ${port}`);

});

app.get("/posts", (req, res) =>{
    res.render("index.ejs" , {posts});
});

app.get("/posts/new" , (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req , res) => {
    let {username, content} = req.body;
    posts.push({username , content});
    res.redirect("/posts");
})
