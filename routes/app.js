const express = require("express")
const fs = require("fs")
const path = require("path")

const app = express()

app.use(express.static(path.resolve(__dirname, "../dist")))

app.get("*", (req, res) => {
    let html = fs.readFileSync(path.resolve(__dirname, "../dist/index.html"))
    res.send(html)
})

app.listen(8888, () => {
    console.log("start server")
})
