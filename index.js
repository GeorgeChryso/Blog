const express = require('express')
const app = new express()

// flush the temporary data (like error messages) after the user refreshes the page
// so what I want to achieve is only make the error messages available for the next lifecycle\
// and delete the mafter that
const flash = require('connect-flash');
app.use(flash())


//EJS is a simple templating language that lets us generate
// HTML with plain JavaScript
const ejs = require('ejs')

//talk to MongoDB from Node
const mongoose = require('mongoose');
//parameters are (host, database name)
//<------------------this needs UPDATE
mongoose.connect('mongodb+srv://scotoma:FjkIhMcz6bloGrC2@mdbclus1.dmodp7g.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true})



//ability to upload files like images and so on to the server
const fileUpload =require('express-fileupload')
//adds the files property to the req object so that we can access
//the uploaded files using req.files.
app.use(fileUpload())


//body-parser parses incoming request bodies
//in a middleware and make the form data available under the req.body property.
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.set('view engine','ejs') //ANY FILE ENDING WITH .ejs should be rendered with ejs
app.use(express.static('public'))


let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}
console.log(port)
app.listen(port, ()=>{
    console.log('App listening...')
})


// cookies in the browser
///configuration object with a value to secret property. secret string is
// used by the express-session package to sign and encrypt the session ID
// cookie being shared with the browser
const expressSession =require('express-session');
app.use(expressSession({secret: 'keyboard cat'}))

// user authentication middleware ( is a user logged in?)
const authMiddleware = require('./middleware/authMiddleware')

// redirects to home page if user is authenticated
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')



/// CONTROLLERS
global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

const validationMiddleware=require('./middleware/validationMiddleware')
app.use('/posts/store',validationMiddleware)

const homePageController=require('./controllers/home')
app.get('/',homePageController)

const aboutController = require('./controllers/about')
app.get('/about',aboutController)

const contactController = require('./controllers/contact')
app.get('/contact',contactController)

const newPostController = require('./controllers/newPost')
app.get('/posts/new',authMiddleware,newPostController)

const getPostController=require('./controllers/getPost')
app.get('/post/:id',getPostController)

const storePostController=require('./controllers/storePost')
app.post('/posts/store',authMiddleware,  storePostController)

const searchPostController=require('./controllers/searchPost')
app.post('/',  searchPostController)

const newUserController =require('./controllers/newUser')
app.get('/auth/register',redirectIfAuthenticatedMiddleware,newUserController)

const storeUserController = require('./controllers/storeUser')
app.post('/users/register',redirectIfAuthenticatedMiddleware, storeUserController)

const loginController = require('./controllers/login')
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

const loginUserController = require('./controllers/loginUser')
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

const logoutUserController = require('./controllers/logout')
app.get('/auth/logout',logoutUserController)

app.use((req,res)=>res.render('notfound'))