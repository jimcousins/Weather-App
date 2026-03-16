async function loadWeather(){
    try{
        const res = await fetch("/api/weather")
        const weather = await res.json()

        document.getElementById("weather").innerHTML = `
            <h2>${weather.name}</h2>
            <p>Temperature: ${weather.main.temp} C</p>
            <p>Condition: ${weather.weather[0].description}</p>
        `
    }catch(err){
        document.getElementById("weather").innerHTML = "<p>Failed to load weather data</p>"
        console.error(err)
    }
}

async function loadChart(){
    try{
        const res = await fetch("/api/weather-log")
        const { timeStamps, temps } = await res.json()

        const trace = {
            x: timeStamps,
            y: temps,
            type: "scatter",
            mode: "lines+markers",
            line: {
                color: "purple"
            }
        }

        const layout = {
            title:"Temperature over Time",
            xaxis:{title:"Date", type: "date"},
            yaxis:{title:"Temperature (C)"},
            legened:{orientation: "h", x: 0, y: 1.1}
        }

        Plotly.newPlot("chart", [trace], layout)
    }catch(err){
        console.error("Failed to load char:" + err)
    }
}

loadWeather()
loadChart()