# Weather App - DataOps

## Description

lorem ispum 


## Installation

### Native Installation

- Clone this repo
- On your terminal
    - `cd` to root folder
    - Delete data folder to start your own collection
    - Setup `.env` with:
        - `PORT` of your choosing
        - `CITY` of your choosing
        - `API_KEY` from openweather
    - `npm i` to install dependencies
    - `node fetchWeather.js` to create/update data folder
    - `node app.js` to start server
- Open browser on `PORT` to see weather and graph

### Using Docker

- Open your Docker Desktop
- On your terminal run:
    - `cd` to root folder
    - `docker build -t <image name>:<tag> .` or `docker build -t weather-app .`
        - To build an image based on Dockerfile
    - `docker run -p <local port>:<container port> <image name>` or `docker run -p 3000:5000 weather-app`
        - To run a container based on an image

## Tests

We have tests to check if the files inside the data folder are correct



