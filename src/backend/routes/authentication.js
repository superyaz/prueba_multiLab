const { Router } = require('express');
const router = Router();

const passport = require('passport');
const { isLoggedIn, isNotloggedIn } = require('../lib/auth');


router.get('/signup', isNotloggedIn, (req, res) => {
    res.render('auth/signup');
});

router.get('/signin', isNotloggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotloggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.post('/signup', isNotloggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));




router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut()
    res.redirect('/signin');
});


module.exports = router;