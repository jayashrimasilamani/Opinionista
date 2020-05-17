const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session')
const keys = require('./config/keys')
const bodyParser = require('body-parser');
require('./models/User')
require('./services/passport');
require('./models/Survey')

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express()
 
app.use(bodyParser.json());

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
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production'){
    //serves main.js production assets
    app.use(express.static('client/build'));

    //serves index.html if doesnt find the route
    const path = require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })

}
const PORT = process.env.PORT || 5000;
app.listen(PORT);


//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