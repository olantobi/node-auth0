
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
    // res.send('You are on the home page.');
});

router.get('/login', (req, res) => {
    res.send('You are on the login page');
});

router.get('/logout', (req, res) => {
    res.send('You are on the logout page');
});

router.get('/polls', (req, res) => {
    res.send('You are on the polls page');
});

router.get('/user', (req, res) => {
    res.send('You are on the user page');
});

module.exports = router;