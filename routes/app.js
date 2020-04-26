const express = require("express")
const fs = require("fs")
const path = require("path")
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

let arduinoPort = '/dev/tty.usbmodem14201'  // for MacOS
// let arduinoPort = 'COM3' // for Windows
// let arduinoPort = '/dev/tty.ACM0'    // for Linux
const port = new SerialPort(
    arduinoPort , {
        baudRate: 115200
    }
)

global.sernsorData = {}

const parser = port.pipe(new Readline({ delimiter: '\n' }))
parser.on('data', (data) => {
    global.sensorData = JSON.parse(data)
})

const webPort = 8888
const app = express()

app.use(express.static(path.resolve(__dirname, "../dist")))

app.get("/", (req, res) => {
    let html = fs.readFileSync(path.resolve(__dirname, "../dist/index.html"))
    res.send(html)
})

app.post("/data", (req, res) => {
    res.send(global.sensorData)
})

app.listen(webPort, () => {
    console.log(`start server on ${webPort}`)
})
