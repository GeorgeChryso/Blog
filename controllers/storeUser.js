const User = require('../models/User.js')
const path = require('path')


module.exports = (req,res)=>{
    User.create(req.body, (error, user) => {
        if(error){
            const validationErrors = Object.keys(error.errors).map(key =>
            error.errors[key].message)
            console.log(validationErrors)
            req.flash('validationErrors',validationErrors) // KEEP ERRORS ONLY FOR THE NEXT LIFECYCLE
            req.flash('data',req.body) // KEEP REQ.BODY (AKA THE TYPED INFO ON INPUT FORMS FOR THE NEXT LIFECYCLE)
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
}