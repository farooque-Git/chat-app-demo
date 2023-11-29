var socket = io();
const SENT = "SENT";
const RECIEVED = "RECIEVED";

let inputMsg = document.getElementById("input-msg");
let enterbtn = document.getElementById("Login-btn");
let InputUserNameRef = document.getElementById("input-username");
let formbody = document.getElementById("form-body");
let Enterchatapp = document.getElementById("message-box");
let formContainer = document.getElementById("form-Container");
let sendbtn = document.getElementById("send-btn");
let MessageHoldingContainer = document.getElementById(
  "MessageHolding-container"
);

let username = "";

enterbtn.addEventListener("click", enterChatApp);

function enterChatApp(event) {
  event.preventDefault();
  username = InputUserNameRef.value;
  if (username) {
    formContainer.style.display = "none";
    Enterchatapp.style.display = "flex";
  } else {
    alert("Enter Username");
  }
}

sendbtn.addEventListener("click", (e) => {
  e.preventDefault();
  let data = {
    id: socket.id,
    username: username,
    message: inputMsg.value,
  };
  socket.emit("this is event name", data);
  renderMessage(data, SENT);
});

socket.on("this is event name", (data) => {
  if (data.id !== socket.id) {
    renderMessage(data, RECIEVED);
  }
});

function renderMessage(data, messageType) {
  const msgDiv = document.createElement("div");
  msgDiv.innerText = `${data.username} : ${data.message}`;
  if (messageType === SENT) {
    msgDiv.setAttribute("class", "message sent");
  } else {
    msgDiv.setAttribute("class", "message recive");
  }
  MessageHoldingContainer.appendChild(msgDiv);
  inputMsg.value = "";
}
