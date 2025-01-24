import "./App.css";
import socket from "./connection/socket";
import { useState } from "react";
import Chats from "./components/Chats";

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  
  return (
    <div className="App">
      {!showChat ? (
        <div className="user">
          <h1>Join a chat</h1>
          <input
            placeholder="Username"
            type="text"
            className="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            placeholder="Room ID"
            type="text"
            className="username"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join a room!</button>
        </div>
      ) : (
        <Chats socket={socket} username={userName} roomID={room} />
      )}
    </div>
  );
}

export default App;
