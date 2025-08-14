const express= require("express");

const app = express();
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");
const user = require("./routes/user");
const Books = require("./routes/book");
const favourites = require("./routes/favourites");
const cart  = require("./routes/cart");
const order = require("./routes/order");
app.use(express.json());
//app.use(cors());
app.use(cors({ origin: "*" }));


//routes

app.use("/api/v1",user);
app.use("/api/v1",Books);
app.use("/api/v1",favourites);
app.use("/api/v1",cart);
app.use("/api/v1",order);
app.listen(process.env.PORT, () => {
  console.log(`server started  at port ${process.env.PORT}`);
});