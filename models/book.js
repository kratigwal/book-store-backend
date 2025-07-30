// const mongoose = require("mongoose");
// const book = new mongoose.Schema({

//     url:{
//         type:String,
//         require:true,
//     },
//     title:{
//         type:String,
//         require:true,
//     },
//     author:{
//         type:String,
//         require:true,
//     },
//     price:{
//         type:Number,
//         require:true,
//     },
//     desc:{
//         type:String,
//         require:true,
//     },
//     language:{
//         type:String,
//         require:true,
//     },
// } , {timestamps:true}
// );
// module.exports = mongoose.model("books" , book);

const mongoose = require("mongoose");

const book = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Book", book); // ✅ Capitalized and singular
