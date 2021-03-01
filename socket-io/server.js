const server = require("http").createServer();
const io = require("socket.io")(server);
const { handleMessageEvent } = require("./utils/message");
const { v4: uuidv4 } = require("uuid");

const userObject = {};

const handleAvatar = () => {
  const width = Math.round(Math.random() * 200 + 100);
  const height = Math.round(Math.random() * 200 + 100);
  return `https://placeimg.com/${width}/${height}/any`;
};

const setOnlineUsers = () => {
  const values = Object.values(userObject);
  const checkIfUsername = values.filter((user) => user.username !== undefined);
  return checkIfUsername;
};

io.on("connection", (socket) => {
  console.log(socket.id, " connected!");
  userObject[socket.id] = { userId: uuidv4() };

  socket.on("disconnect", () => {
    console.log(socket.id, "disconnected");
    delete userObject[socket.id];
    io.emit("action", { type: "users_online", data: setOnlineUsers() });
  });
  socket.on("action", (action) => {
    switch (action.type) {
      case "server/join":
        console.log("Got join event", action.data);
        userObject[socket.id].username = action.data;
        userObject[socket.id].avatar = handleAvatar();
        io.emit("action", { type: "users_online", data: setOnlineUsers() });
        socket.emit("action", { type: "get_current_user", data: userObject[socket.id]})
        break;
      case "server/pm":
        console.log("pm: ", action.data);
        const { chatId } = action.data;
        const fromUser = userObject[socket.id].userId
        const userValues = Object.values(userObject);
        const userKeys = Object.keys(userObject)
        for (let i = 0; i < userValues.length; i++) {
          if (userValues[i].userId === chatId) {
            const socketId = userKeys[i];
            io.sockets.to(socketId).emit("action", { type: "pm", data: {
              ...action.data,
              chatId: fromUser
            }})
          }
        }
        break;
    }
  });
});

io.listen(3001);
