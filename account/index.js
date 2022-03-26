const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const asyncHandler = require("express-async-handler");
const connectDB = require("./config/db");
const port = process.env.PORT || 8001;

connectDB();

const app = express();
// app.use(function (req, res, next) {
//   // res.setHeader("Access-Control-Allow-Origin", "*");
//   // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   // res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });
app.use(
  cors({
    //     // origin: "*",
    //     // credentials: true, //access-control-allow-credentials:true
    //     // optionSuccessStatus: 200,
  })
);
app.options("/api/buildings", cors());

// handle middleware for get json body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("<h1>Hedllo Tao</h1>");
  console.log("Hedllo Tao");
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/buildings", require("./routes/buildingRoutes"));
app.use("/api/translists", require("./routes/transListRoutes"));
app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/chatrooms", require("./routes/chatroomRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
