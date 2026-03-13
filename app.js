const express = require("express")
const session = require("express-session")
const bodyParser = require("body-parser")

const authRoutes = require("./routes/auth")
const postRoutes = require("./routes/posts")

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(express.static("views"))

app.use(session({
    secret: "foro-secret",
    resave: false,
    saveUninitialized: false
}))

app.use("/", authRoutes)
app.use("/posts", postRoutes)

app.get("/", (req,res)=>{
    res.redirect("/login.html")
})

app.listen(3000,()=>{
    console.log("Servidor en http://localhost:3000")
})