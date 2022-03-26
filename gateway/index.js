const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

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

app.enable("trust proxy");
app.use(express.json());

// app.use(
//   "/account",
//   createProxyMiddleware({
//     target: "http://localhost:8001/",
//     changeOrigin: true,
//     secure: false,
//     logLevel: "debug",
//     headers: {
//       Connection: "keep-alive",
//     },
//   })
// );
// app.use(
//   "/residence",
//   createProxyMiddleware({
//     target: "http://localhost:8002",
//     changeOrigin: true,
//     pathRewrite: {
//       "^/residence": "/", // rewrite path
//     },
//   })
// );
app.get("/", (req, res) => {
  res.send("<h1>Hedllo Tongdd ! t</h1>");
  console.log("Hedllo Tongdd ! t");
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`listening on port ${port}`));
