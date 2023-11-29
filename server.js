const express = require('express');  // express was giving a fn
const http = require("http");
const socketIoObj = require("socket.io"); // it gives me an obj


const {Server} = socketIoObj;// I am just destructuring Server out of my socketIoObj


// now this app is my expressServer
const app = express();

const PORT = 9000; // write any number



//to use sockets we need http to be
// integrated with my app that is expressServer

// creation of an http server
// we are integrating http and express server
const server = http.createServer(app);



// my io is instance of Server given
// to me by socket.io
const io = new Server(server);


// connection establish means
// a frontend is accessing my backend
io.on("connection", (socket) => {
    // we are catching the event
    // that's getting emitted in UI
    console.log(socket.id);
    socket.on("this is event name", (data) => {
      // echo123 is the name of the event
      io.emit("this is event name", data);
    });
      // so the IO is unique and it's associated
  // with my server
  // and sockets are multiple and are associated
  // with frontend
});



// app.use(middleware);

// using middleware I will send
// my public folder to browser
// the same way live sends
app.use(express.static("public"));
// express.static is a internal method of
// express used to send static html files
//  in a folder




server.listen(PORT, () => {
    console.log(`server is up and running on http://localhost:${PORT}/`);
  });
  
  // the moment my server is turned on
  // I should get an IO
  
  // fetch(URL)
  // io() -> this will give me access to socket in my frontend
  // I need socket io logic in frontend
  // either you can import from node modules or
  // access it through cdn
  
  // socket