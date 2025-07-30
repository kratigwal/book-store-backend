const router = require('express').Router();
const User = require('../models/user');
const {authenticateToken} = require('./userAuth');

// add book to favourite 
router.put("/add-book-to-favourite" , authenticateToken , async (req,res) => {
    try{
          const {bookid , id } = req.headers;
          const userData = await User.findById(id);
          const isbookfavourite = userData.favourites.includes(bookid);
          if(isbookfavourite){
            return res.status(200).json({
                message: "Book is already in favourites"
            });
          }
          await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
          return res.status(200).json({message:"Book added to favourites"});
    }catch(err){
        res.status(500).json({message:"Internal server error"});
    }
});

// delete book from favourites
router.put("/remove-book-from-favourite" , authenticateToken , async (req,res) => {
    try{
          const {bookid , id } = req.headers;
          const userData = await User.findById(id);
        
          await User.findByIdAndUpdate(id , {$pull:{favourites:bookid}});
          return res.status(200).json({message:"Book removed from favourites"});
    }catch(err){
        res.status(500).json({message:"Internal server error"});
    }
});

router.get('/get-favourite-books',authenticateToken,async(req,res) => {

    try{
                const {id} = req.headers;    
                const userdata = await User.findById(id).populate("favourites");
                const favouriteBooks = userdata.favourites;
                return res.json({
                    status:"Success",
                    data:favouriteBooks,
                })
    }catch(err){
                   res.status(500).json({message:"Internal server error",err});

    }
})
module.exports = router;