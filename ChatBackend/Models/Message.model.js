const mongoose = require("mongoose");

// const senderandreciver = new mongoose.Schema({
//   senderid: {
//     type: String,
//     required: true,
//   },
//   reciverid: {
//     type: String,
//     required: true,
//   },
// });
const Message = new mongoose.Schema(
  {
    senderid: {
      type: String,
      required: true,
    },
    reciverid: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    // senderandreciverid: {
    //   type: [senderandreciver],
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);
const Messagemodel = mongoose.model("Message", Message);
module.exports = { Messagemodel };
