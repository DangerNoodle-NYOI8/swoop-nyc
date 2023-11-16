const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// //GET user info
router.post('/login', userController.verifyUser, userController.createSession, async (req, res) => {
    try {
        if (res.locals.found) {
            res.cookie('session', res.locals.cookieInfo, { httpOnly: true, maxAge: 3600}); //, 
            res.sendStatus(200);
        } else res.sendStatus(404);
    }
    catch (err) {
        console.log(err.message);
    }
})

//POST - create a new user
router.post('/', userController.testSignupCreds, userController.createUser, userController.createSession, (req, res) => {
    res.cookie('session', res.locals.cookieInfo, { httpOnly: true, maxAge: 3600 });
    res.sendStatus(200)
})

module.exports = router;

