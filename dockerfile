#Installs a small version of node
FROM node:22-slim

#Sets up as a working directory inside the container. Keeps all app files organised in container
WORKDIR /app

#Copies only the package files into the container
#Used ti install node dependencies before copying the rest of the code
COPY package*.json ./

#Installs the dependencies exactly as listen on the package.json
#Need clean and reproducable installs. ci is the command for a clean install (remove all then install all)
RUN npm ci

#Copies all the projects files into the container
COPY . .

#Default environment variables
ENV PORT=5000

#Defines the commands to run the app
#Entry point to dataops pipelines
CMD ["node", "app.js"]
