const User = require('../models/User')

module.exports = (req, res, next) => {
    // IF THE USER IS LOGGED IN, PROCEED (DISPLAY SHIZZLE)
    User.findById(req.session.userId, (error, user ) =>{
        // ELSE GET HIM TO THE LANDING PAGE
        if(error || !user )
            return res.redirect('/')
        next()
        }
    )
}