const express = require("express")
const router = express.Router()
const db = require("../database/db")

// Listar posts
router.get("/", (req, res) => {
    db.all(
        `SELECT posts.id, posts.content, posts.created_at, users.username
         FROM posts
         JOIN users ON posts.user_id = users.id
         ORDER BY posts.created_at DESC`,
        [],
        (err, rows) => {
            if (err) return res.send("Error al obtener posts")

            let html = "<h1>Posts</h1>"
            html += `<p>Bienvenido, ${req.session.username}</p>`
            html += `<a href="/logout">Cerrar sesión</a><br><br>`
            html += `<form method="POST" action="/posts/new">
                        <textarea name="content"></textarea>
                        <button type="submit">Publicar</button>
                     </form><hr>`

            rows.forEach(post => {
                html += `<p><strong>${post.username}</strong>: ${post.content} <br>
                         <small>${post.created_at}</small></p><hr>`
            })

            res.send(html)
        }
    )
})

// Crear post
router.post("/new", (req, res) => {
    const content = req.body.content
    const userId = req.session.userId

    db.run(
        `INSERT INTO posts (user_id, content) VALUES (?, ?)`,
        [userId, content],
        function (err) {
            if (err) return res.send("Error al crear post")
            res.redirect("/posts")
        }
    )
})

module.exports = router
