const mongoose = require("mongoose");
const DatabaseConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://poojaryrakshith986:HyfkhMuaAkwBJs96@chat.vv1x2ot.mongodb.net/ChatApp"
    );

    console.log("Database Connected");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { DatabaseConnect };
