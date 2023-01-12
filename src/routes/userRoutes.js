const controllers = require("../controllers/userControllers");
const express = require('express');

const router = express.Router();

const { getUsers, registerUser, postDbUser, loginUser, getAllDisabledUsers, deleteUser, disableUser, getUserById, updateUser } = controllers;


router.get('/:userId', getUserById)
router.get('/', getUsers)
router.get('/disabled', getAllDisabledUsers)
router.patch('/disable/:userId',disableUser)
router.post('/register', registerUser)
//router.post('/DbUser', postDbUser)
router.post('/login', loginUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)


module.exports = router;