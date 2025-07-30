// const mongoose = require("mongoose");
// //const { type } = require("os");

// const order = new mongoose.Schema({

//     user:{
//         type:mongoose.Types.ObjectId,
//         ref:"User",
//     },
//     book:{
//         type:mongoose.Types.ObjectId,
//         ref:"Books",
//     },
//     status:{
//         type:String,
//         default:"order placed",
//         enum :["order placed" , "out for delivery" , "Delivered" , "Cancelled" ],
//     },
// }, 
//  {timestamps:true}
// );

// module.exports = mongoose.model("order", order);

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  book: { type: mongoose.Types.ObjectId, ref: "Book" },
  status: {
    type: String,
    default: "order placed",
    enum: ["order placed", "out for delivery", "Delivered", "Cancelled"],
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema); // ✅ Capital O
