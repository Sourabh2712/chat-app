const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const messageController = require("../controllers/message.controller");

module.exports = (io) => {
  router.post("/join", userController.joinChat);
  router.post("/message", messageController.sendMessage(io));
  return router;
};
