const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt')
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'A man needs a name'], // provide the error messages incase of missing input
        unique: true
    },
    password: {
        type: String,
        required: [true, 'An account needs a password']
    }
});
UserSchema.plugin(uniqueValidator);


// BEFORE YOU SAVE ANY USER, execute the function of the 2nd argument
UserSchema.pre('save', function(next){
        const user = this
        // password to has, how many hashes, function after completion
        bcrypt.hash(user.password, 10, (error, hash) => {
            user.password = hash //hash is the encrypted password
            next()
        })
    }
)


const User = mongoose.model('User',UserSchema);
module.exports = User