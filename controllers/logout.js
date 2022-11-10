//With req.session.destroy(), we destroy all session data including the session
// user id, we then redirect to the home page.
module.exports = (req, res) =>{
    req.session.destroy(() =>{
        res.redirect('/')
    })
}