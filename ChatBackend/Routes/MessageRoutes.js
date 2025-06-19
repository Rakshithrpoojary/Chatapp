const { Router } = require("express");

const {
  SendMessage,
  GetAllMessgae,
} = require("../Controller/MessageController");

const msgRouter = Router();

msgRouter.post("/sendmsg", SendMessage);
msgRouter.post("/getallmessage/:senderid/:reciverid", GetAllMessgae);

module.exports = { msgRouter };
