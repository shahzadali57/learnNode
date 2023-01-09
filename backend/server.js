const app = require("./app");

const dotenv = require("dotenv")
const connectDatabase = require('./config/database')
//config

dotenv.config({path:"backend/config/config.env"})

connectDatabase();

// handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log("shutting down the server due to uncaught exception");
    process.exit(1);
})


const server = app.listen(process.env.PORT, ()=> {
    console.log(`server is working on http://localhost:${process.env.PORT}`)
});

//Unhandled Promise Rejection

process.on("unhandledRejection", err=>{
    console.log(`Erro: ${err.message}`)
    console.log("shutting down the server due to Unhandled Promise Rejection")
    
    server.close(()=>{
        process.exit(1)
    })
})