const express = require("express");
const app = express();
const path = require("path");
const {v4: uuidv4} = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static( path.join(__dirname,"public")));

let posts = [
    {
        id: uuidv4(),
        username : "zohaib05",
        content: "I love coding"
    },
    {
        id: uuidv4(),
        username: "Ali Ahmed",
        content: "I got my first job",
    },
    {
        id: uuidv4(),
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

app.get("/posts/:id", (req , res) => {
    let {id} = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("post.ejs", {post});
})

app.post("/posts", (req , res) => {
    let {username, content} = req.body;
    posts.push({id:uuidv4(),username , content});
    res.redirect("/posts");
});

app.patch("/posts/:id", (req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id == p.id);
    post.content = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit" , (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("edit.ejs", {post})
});