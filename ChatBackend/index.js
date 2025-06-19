const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const { server, app } = require("./Socket/Socket");
const { DatabaseConnect } = require("./db/Databse");
const { userRouter } = require("./Routes/UserRoutes");
const { msgRouter } = require("./Routes/MessageRoutes");

const port = 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());
app.use("/user/v1", userRouter);
app.use("/user/v1", msgRouter);

DatabaseConnect()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server listening  on port ${port}`);
    });
  })
  .catch((error) => console.log(error.message));
