const cors = require("cors");
const cookieParser = require("cookie-parser");
const { app } = require("./Socket/Socket");
const { userRouter } = require("./Routes/UserRoutes");
const { msgRouter } = require("./Routes/MessageRoutes");
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
