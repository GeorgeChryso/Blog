//contain models which are objects that represent collections in our database
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,//the value is supposed to be a valid Mongo object id.
        ref: 'User',
        required: true
    },
    datePosted:{ /* can declare property type with an object like this because we need 'default' */
        type: Date,
        default: new Date(new Date() - Math.random()*(1e+12))
    },
    image:String
});

// we access the db via mongoose.model(name of collection, )
const BlogPost = mongoose.model('BlogPost',BlogPostSchema);
module.exports = BlogPost