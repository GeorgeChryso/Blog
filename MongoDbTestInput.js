const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

BlogPost.create(
    {
        title: 'The Mythbuster’s Guide to Saving Money on Energy Bills',
        body: 'If yol;kl;kl;k;lkladsad adsdasddas;kl;kl;kl;kl;kl;kl;kl;kl;kl;kl;kl;kl;kl;kl;kl;k'
    }, 
    (error, blogpost)=>{console.log(error)}
)
BlogPost.create(
    {
        title: 'Post2',
        body: 'If yol;kl;kl;k;lkladsad adsdasddas;kl;kl;kl;kl;kl;kl;kl;kl;kl;kl;kl;kl;kl;kl;kl;k'
    }, 
    (error, blogpost)=>{console.log(error)}
)
BlogPost.create(
    {
        title: 'Post3',
        body: 'If yol;kl;kl;k;lkladsad adsdasddas;kl;kl;kl;kl;kl;kl;kl;kl;kl;kl;kl;kl;kl;kl;kl;k'
    }, 
    (error, blogpost)=>{console.log(error)}
)



BlogPost.find({
    title:/The/}, (error, blogspot) =>{
    console.log(error,blogspot)
})
// retrieve records by id 
var id = "5cb436980b33147489eadfbb";
BlogPost.findById(id, (error, blogspot) =>{
console.log(error,blogspot)
})

//update records by id
id = "5cb436980b33147489eadfbb";
BlogPost.findByIdAndUpdate(
    id,
    {
        title:'Updated title'
    }, 
    (error, blogspot) =>{
        console.log(error,blogspot)
    }
)
// delete records
BlogPost.findByIdAndDelete(id, (error, blogspot) =>{
    console.log(error,blogspot)
})