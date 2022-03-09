const User = require('../models/user');

module.exports.renderRegister =  (req, res) => {
    res.render('users/register');
}

module.exports.register = async(req, res,next) => {
    try{
    const {email, username, password}= req.body;
    const user = new User({email, username});
    const registeredUser =await User.register(user, password);
    //this is being done so that after regsitration login will need not to be done  
    req.login(registeredUser, err => {
      if(err) return next(err);
        req.flash('success','Welcome to Yelp camp');
        res.redirect('/campgrounds');
      })
    
    } catch(e){
      req.flash('error', e.message);
      res.redirect('register');
    }
    //this will take user and will hash the password
    
  }

  module.exports.renderLogin =  (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    req.flash('success','welcome back');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  }


  module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "goodbye")
    res.redirect('/campgrounds');
  }