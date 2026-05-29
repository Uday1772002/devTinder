const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");
const connectionRequest = require("../models/connectionRequest");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: [
        "https://devtinder.space",
        "http://localhost:3000",
        "http://localhost:5173",
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      // create a unique chat room for this user and target user
      const chatRoom = getSecretRoomId(userId, targetUserId);
      socket.join(chatRoom);
      console.log(`Socket ${socket.id} joined room ${chatRoom}`);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, text, userId, targetUserId }) => {
        try {
          const connection = await connectionRequest.findOne({
            $or: [
              { sender: userId, receiver: targetUserId, status: "accepted" },
              { sender: targetUserId, receiver: userId, status: "accepted" },
            ],
          });

          if (!connection) {
            return res
              .status(403)
              .json({ error: "You are not connected with this user" });
          }
          const chatRoom = getSecretRoomId(userId, targetUserId);
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({ senderId: userId, text });
          await chat.save();
          // emit the message to everyone in the chat room except the sender
          socket.to(chatRoom).emit("receiveMessage", {
            firstName,
            text,
          });
        } catch (err) {
          console.error("Error emitting message:", err);
        }
      },
    );

    socket.on("disconnect", () => {
      // console.log("Client disconnected: " + socket.id);
    });
  });
};

module.exports = initializeSocket;
