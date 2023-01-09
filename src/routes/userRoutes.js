const controllers = require("../controllers/userControllers");
const express = require('express');

const router = express.Router();
const { getUsers, registerUser, loginUser } = controllers;

router.get('/', getUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router;