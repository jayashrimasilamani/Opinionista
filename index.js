const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session')
const keys = require('./config/keys')
const bodyParsser = require('body-parser');
require('./models/User')
require('./services/passport');
mongoose.connect(keys.mongoURI);
const app = express()
 
app.use(bodyParsser.json());

app.use(
    cookieSession({
    maxAge:30*24*60*60*1000,
    keys:[keys.cookieKey]

})
)

app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if(process.env.NODE_ENV === 'production'){
    //serves main.js production assests
    app.use(express.static('client/build'));

    //serves index.html if doesnt find the route
    const path = require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);