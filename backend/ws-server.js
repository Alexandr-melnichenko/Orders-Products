// import WebSocket from "ws";
// const wss = new WebSocket.Server({ port: 3001 });

// let connections = 0;
// wss.on("connection", (ws) => {
//   connections++;
//   broadcastCount();

//   ws.on("close", () => {
//     connections--;
//     broadcastCount();
//   });
// });

// function broadcastCount() {
//   wss.clients.forEach((client) => {
//     client.send(connections.toString());
//   });
// }
