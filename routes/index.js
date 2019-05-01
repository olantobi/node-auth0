
const express = require('express');
const passport = require('passport');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const request = require('request');

const env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN
};

router.get('/', (req, res) => {
    res.render('index', {env: env});
    // res.send('You are on the home page.');
});

router.get('/login', passport.authenticate('auth0', {
    clientID: env.AUTH0_CLIENT_ID,
    domain: env.AUTH0_DOMAIN,
    redirectUri: "http://localhost:3000/callback",
    responseType: 'code',
    scope: 'openid profile email'
}), (req, res) => {
    // res.send('You are on the login page');
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    // res.send('You are on the logout page');
    req.logout();
    res.redirect('/');
});

router.get('/polls', ensureLoggedIn, (req, res) => {
    let apiUrl = 'http://elections.huffingtonpost.com/pollster/api/charts.json?topic=2016-president'; 
    request(apiUrl, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const polls = JSON.parse(body);
            res.render('polls', {env: env, user: req.user, polls: polls});
        } else {
            res.render('error');
        }
    })
    // res.render('user');
    // res.send('You are on the user page');
});

router.get('/user', ensureLoggedIn, (req, res) => {
    
    res.render('user', {env: env, user: req.user});
    // res.send('You are on the user page');
});

router.get('/callback', passport.authenticate('auth0', {failureRedirect: '/url-if-something-fails'}), (req, res) => {
    
    res.redirect(req.session.returnTo || '/polls');
    // res.send('You are on the user page');
});

module.exports = router;