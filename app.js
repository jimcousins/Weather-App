import express from "express"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"
import csv from "csv-parser"

const app = express()
dotenv.config()

const PORT = process.env.PORT || 3000

const DATA_DIR = path.join(import.meta.dirname, "data")
const WEATHER_FILE = path.join(DATA_DIR, "weather.json")
const LOG_FILE = path.join(DATA_DIR, "weather_log.csv")

app.use(express.static(path.join(import.meta.dirname, "public")))

app.get("/api/weather", (req, res) => {
    if (!fs.existsSync(WEATHER_FILE)){
        return res.status(404).json({error: "No weather available"})
    }

    try{
        const weatherData = JSON.parse(fs.readFileSync(WEATHER_FILE, "utf8"))
        res.json(weatherData)
    }catch(err){
        console.log(`Error reading weather.json`);
        res.status(500).json({error: "Failed to read weather data"})
    }
})

app.get("/api/weather-log", (req, res) => {
    if(!fs.existsSync(LOG_FILE)){
        return res.status(404).json({error: "No weather available"})
    }

    const timeStamps = []
    const temps = []

    fs.createReadStream(LOG_FILE)
        .pipe(csv())
        .on("data", row => {
            if (row.timeStamp && row.temperature) {
                timeStamps.push(row.timeStamp)
                temps.push(parseFloat(row.temperature))
            }
        })
        .on("end", () => res.json({timeStamps, temps}))
        .on("error", err => {
            console.log("Error reading csv: " + err)
            res.status(500).json({error: "Failed to read log"})
        })
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})