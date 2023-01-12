const controllers = require("../controllers/userControllers");
const express = require('express');

const router = express.Router();
const { getUsers, registerUser, loginUser, getAllDisabledUsers, disableUser, getUserById } = controllers;

router.get('/:userId', getUserById)
router.get('/', getUsers)
router.get('/disabled', getAllDisabledUsers)
router.patch('/disable/:userId',disableUser)
router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router;