const express = require("express")
const db = require("../database/db")
const requireLogin = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/create", requireLogin,(req,res)=>{

    const content = req.body.content

    if(!content){
        return res.send("Mensaje vacío")
    }

    db.run(
        "INSERT INTO posts(user_id,content) VALUES(?,?)",
        [req.session.userId,content],
        ()=>{
            res.redirect("/wall.html")
        }
    )
})

router.get("/all",(req,res)=>{

    db.all(`
        SELECT posts.content, users.username, posts.created_at
        FROM posts
        JOIN users ON posts.user_id = users.id
        ORDER BY posts.created_at DESC
    `,(err,rows)=>{

        res.json(rows)
    })
})

module.exports = router