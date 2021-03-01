let currentMessageObjectId = 1;

const createMessageObject = (user, messageText) => {
    return {
      _id: currentMessageObjectId++,
      text: messageText,
      createdAt: new Date(),
      user: {
        _id: user.userId,
        name: user.username,
        avatar: user.avatar,
      }
    };
  }

const handleMessageEvent = (socket, users) => {
    socket.on("message", messageText => {
        const userObject = users[socket.id];
        const message = createMessageObject(userObject, messageText);
        console.log(message)
        socket.broadcast.emit("message", message);
      });
}

module.exports = { handleMessageEvent }