const { ApiResponse } = require("../utils/ApiResponse");
const { Messagemodel } = require("../Models/Message.model");
const { ApiError } = require("../utils/ApiError");
const { io, GetSocketId } = require("../Socket/Socket");
const { Usermodel } = require("../Models/User.model");
const SendMessage = async (req, res) => {
  try {
    const { senderid, reciverid, message } = req.body;
    const messagesent = await Messagemodel.create({
      senderid,
      reciverid,
      message,
    });
    const reciver = await Usermodel.findById(reciverid);

    const socketid = GetSocketId(reciverid);
    const allMessages = await Messagemodel.find({
      $or: [
        { senderid, reciverid },
        { senderid: reciverid, reciverid: senderid },
      ],
    }).sort({ createdAt: 1 });
    if (socketid) {
      io.to(socketid).emit("Message", messagesent);
    }
    return res.json(
      new ApiResponse(
        202,
        { senderid, recivername: reciver.username, reciverid, allMessages },
        "Message sent succesfully"
      )
    );
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};

const GetAllMessgae = async (req, res) => {
  try {
    const { senderid, reciverid } = req.params;
    if (
      Object.values(req.body).some(
        (value) => value === "" || value === undefined
      )
    ) {
      throw new ApiError(400, "failed to send");
    }
    const reciver = await Usermodel.findById(reciverid);
    const allMessages = await Messagemodel.find({
      $or: [
        { senderid, reciverid },
        { senderid: reciverid, reciverid: senderid },
      ],
    }).sort({ createdAt: 1 });
    return res.json(
      new ApiResponse(
        202,
        { senderid, recivername: reciver.username, reciverid, allMessages },
        "Conversation between the user"
      )
    );
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};

module.exports = { SendMessage, GetAllMessgae };
