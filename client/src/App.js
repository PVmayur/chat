import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";
// import logo from "./image/buttre.jpeg";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);


  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
      <div className="joineChatContainer">
      <h3>Join Chat</h3>
      <input
        type="text"
        placeholder="John..."
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room ID..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      {/* <img src={logo} className="logo"/> */}
      <button onClick={joinRoom}> Join A Room </button>
        </div>
      )
        : (
      <Chat socket={socket} username={username} room={room} />
        )}
      </div>
  );
}

export default App;
