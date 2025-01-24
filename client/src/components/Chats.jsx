import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Chats = ({ socket, username, roomID }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        id: uuidv4(),
        room: roomID,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat__window">
      <div className="display__messages">
        {messageList.map((messageContent, key) => {
          return (
            <div
              key={key}
              className="message"
              id={username === messageContent.author ? "you" : "other"}              
            >
              {console.log(key)}
              <div className="message__content">
                <p>{messageContent.message}</p>
              </div>
              <div className="message__meta">
                <p id="author">{messageContent.author}</p>
                <p>{messageContent.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="input">
        <input
          type="text"
          placeholder="Message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="btn__send__message">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chats;
