const controllers = require("../controllers/userControllers");
const express = require('express');

const router = express.Router();
const { getUsers, registerUser, loginUser, deleteUser } = controllers;

router.get('/', getUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.delete('/:id', deleteUser)

module.exports = router;