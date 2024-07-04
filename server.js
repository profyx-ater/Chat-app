//hier geef je mee wat nodig is om zo een server te maken
const express = require("express");
const path = require("path")
const http = require("http")
const {Server} = require("socket.io")

//hier gaan we de server aanmaken
const app = express();
const server= http.createServer(app)
const io = new Server(server,{
    //cors kan alleen in de IO functie staan en nergens anders ik had eerst geprobeerd om in server.listen te zetten maar lukte niet
    cors:{
        origin:["http://localhost:8080"]
    }
});

//hier kan je zien welke bestanden er gebruikt worden bij de hosting (de getoonde pagina's)
app.use(express.static(path.join(__dirname+"/publiek")));

//hier geef je mee welke poort de server moet staan
server.listen(5000, () => {
    console.log("De server staat aan op poort 5000 | link: localhost:5000")
})

//we zetten de server aan
io.on('connection', (socket) => {
    // hier print die af wie er is gejoined dus het ID
    console.log('een gebruiker in aangekoppeld: ', socket.id);
    socket.on('send-message',message =>{
        io.emit('receive-message',message)
        console.log(message)
    })
});

