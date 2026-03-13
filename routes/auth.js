const express = require("express")
const router = express.Router()
const db = require("../database/db")

// Registro
router.post("/register", (req, res) => {
    const { username, password } = req.body

    db.run(
        `INSERT INTO users (username, password) VALUES (?, ?)`,
        [username, password],
        function (err) {
            if (err) {
                return res.send("Error: el usuario ya existe")
            }
            res.redirect("/login.html")
        }
    )
})

// Login
router.post("/login", (req, res) => {
    const { username, password } = req.body

    db.get(
        `SELECT * FROM users WHERE username = ? AND password = ?`,
        [username, password],
        (err, user) => {
            if (err) return res.send("Error en la base de datos")
            if (!user) return res.send("Credenciales incorrectas")

            req.session.userId = user.id
            req.session.username = user.username

            res.redirect("/posts")
        }
    )
})

// Logout
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login.html")
    })
})

module.exports = router
