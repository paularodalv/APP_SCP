const express = require("express")
const bcrypt = require("bcrypt")
const db = require("../database/db")

const router = express.Router()

router.post("/register", async (req,res)=>{

    const { username, password } = req.body

    if(!username || !password){
        return res.send("Formulario incompleto")
    }

    const hash = await bcrypt.hash(password,10)

    db.run(
        "INSERT INTO users(username,password) VALUES(?,?)",
        [username,hash],
        function(err){

            if(err){
                return res.send("Usuario ya existe")
            }

            res.redirect("/login.html")
        }
    )
})

router.post("/login",(req,res)=>{

    const { username, password } = req.body

    db.get(
        "SELECT * FROM users WHERE username=?",
        [username],
        async (err,user)=>{

            if(!user){
                return res.send("Usuario incorrecto")
            }

            const valid = await bcrypt.compare(password,user.password)

            if(!valid){
                return res.send("Contraseña incorrecta")
            }

            req.session.userId = user.id

            res.redirect("/wall.html")
        }
    )
})

module.exports = router