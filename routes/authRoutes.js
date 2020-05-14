const passport = require('passport')

module.exports = (app) => {
    
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
        
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/log_out',(req,res)=>{
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user',(req,res)=>{
        res.send(req.user);
    });
};

//mongodb+srv://jayashri:<password>@cluster0-lraju.mongodb.net/test?retryWrites=true&w=majority