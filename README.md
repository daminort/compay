# Compay
Application for calculating and storing communal payments

# Set Up
## Clone repository
```
git clone https://daminort@bitbucket.org/daminort/compay.git .
```
## Install dependencies
```
cd client & npm install
cd server & npm install
```

## MongoDB
Download & install MongoDB from [official site](https://www.mongodb.com/download-center) 
(do not forget to set up MongoDB Compass: during MongoDB inslallation or independently from here: [MongoDB Compass](https://www.mongodb.com/download-center#compass))

Start MongoDB Server:
```
cd [MongoDB Instalation Path/bin]
mongod --dbpath [Path to Databases]
```

# Build and Start
```
cd client & npm build
```
Then you have to copy all content of folder `client/build` to `server/public`. After that you will be allowed to start application with command
```
cd server & npm start
```

# Run in development mode
```
cd server & npm start
cd client & npm start
```
