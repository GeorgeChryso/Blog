const BlogPost = require('../models/BlogPost.js')

module.exports=async (req,res)=>{
    console.log('hiYello')
    let query=req.body.searchquery
    const blogposts = await BlogPost.find({title: {$regex :query, $options : "i"}})
    res.render('index',{blogposts:blogposts});
}