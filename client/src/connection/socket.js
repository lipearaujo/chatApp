//npm install sockei.io-client
import io from "socket.io-client"; //socket io library for react --> we need to install this library which allow us to estabilish a connection to socker.io

const URL = process.env.REACT_APP_BACKEND_URL; //passing the url from our back-end server
const socket = io.connect(URL);

//We also register a catch-all listener, so that any event received by the client will be printed in the console.
socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
