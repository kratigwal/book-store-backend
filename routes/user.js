const router = require("express").Router();
const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");

// sign up
router.post("/sign-up", async (req,res) =>{
  try{
     const {username, email, password, address}= req.body;

     // check username length
     if (username.length<3){
      return res
      .status(400)
      .json({message: "username length should be greater than 2"});
     }
      // Check if username exists
        const existingUsername = await User.findOne({ username:username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check if email exists
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Check password
        if (password.length <= 5) {
            return res.status(400).json({ message: "Password should be greater than 5 characters" });
        }
        const hashPass = await bcrypt.hash(password,10);
        
   const newUser = new User(
    {
      username: username,
       email: email,
     password:hashPass,
     address:address});
       await newUser.save();
       return res.status(200).json({message : "sign-up successfully"})
  }catch (error){
    res.status(500).json({message:"internal server error"});
  }
})

//sign in 

// router.post("/sign-in", async (req,res) =>{
//   try{
//     const {username,password} = req.body;

//         const existingUser = await User.findOne({ username });
//         if (!existingUser) {
//              return res.status(400).json({ message: "invalid credential" });
//         }
//       await bcrypt.compare(password, existingUser.password,(err, data) =>{
//           if(data){
//             const authClaims =[
//               {name: existingUser.username},{role: existingUser.role},
//             ];
//             const token = jwt.sign({authClaims},"bookstore123", {expiresIn: "30d",

//             });
//              res.status(200).json({id:existingUser.id,
//                role: existingUser.role, token: token,
//                message:"Login successfull"
//                });
//           }else{
//             res.status(400).json({message: "invalid credential"});
//           }
//         });
//    }catch (error){
//     res.status(500).json({message:"internal server error"});
//   }
// });

// get user information

router.get("/get-user-information",authenticateToken , async (req,res) => {
    try{

        const { id } = req.headers;
        const data = await User.findById(id).
        select("-password");
        return res.status(200).json(data);
    }catch(error){

         res.status(500).json({message:"Internal server error"});
    }
});

router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "invalid credential" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid credential" });
    }

    const authClaims = [
      { name: existingUser.username },
      { role: existingUser.role },
    ];
    const token = jwt.sign({ authClaims }, "bookstore123", {
      expiresIn: "30d",
    });

    return res.status(200).json({
      id: existingUser.id,
      role: existingUser.role,
      token: token,
      message: "Login successful",
    });

  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

// update address 
router.put("/update-address", authenticateToken,async (req, res)=>{
  try{
   const {id} = req.headers;
        const {address} = req.body;
         await User.findByIdAndUpdate(id,{address:address});
         return res.status(200).json({message:"address updated successfully"});
  }catch(error){
    res.status(500).json({message:"Internal server error"});
  }
})
 module.exports = router;
