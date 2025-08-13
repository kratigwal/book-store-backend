// const express= require("express");

// const app = express();
// const cors = require("cors");
// require("dotenv").config();
// require("./conn/conn");
// const user = require("./routes/user");
// const Books = require("./routes/book");
// const favourites = require("./routes/favourites");
// const cart  = require("./routes/cart");
// const order = require("./routes/order");
// app.use(express.json());
// app.use(cors());

// //routes

// app.use("/api/v1",user);
// app.use("/api/v1",Books);
// app.use("/api/v1",favourites);
// app.use("/api/v1",cart);
// app.use("/api/v1",order);
// app.listen(process.env.PORT, () => {
//   console.log(`server started  at port ${process.env.PORT}`);
// });

// server.js
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");

// Import Routes
const user = require("./routes/user");
const Books = require("./routes/book");
const favourites = require("./routes/favourites");
const cart = require("./routes/cart");
const order = require("./routes/order");

// ✅ CORS Setup (Mobile + Laptop Support)
app.use(cors({
  origin: [
    "http://localhost:3000", // Local dev
    "https://velvety-cactus-ba80e4.netlify.app" // Your Netlify frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use("/api/v1", user);
app.use("/api/v1", Books);
app.use("/api/v1", favourites);
app.use("/api/v1", cart);
app.use("/api/v1", order);

// ✅ Server Listen
app.listen(process.env.PORT, () => {
  console.log(`✅ Server started at port ${process.env.PORT}`);
});
