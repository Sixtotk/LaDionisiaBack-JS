const { axios } = require("axios")
const { User } = require('../db')

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users })
  } catch (err) { res.status(500).json(err.message) }
}

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params
    const userFound = await Comment.findByPk( userId );
    if(!userFound) return res.status(400).json("user not found");
    res.status(200).json(userFound);
  } catch (err) {
    res.status(500).send({ msg: "Error in the server", error: err.message });
  }
};

const getAllDisabledUsers = async (req, res) => {
  try { 
    const disabledUsers = await User.findAll({ where: { disabled:true } });
    if(!disabledUsers) {res.status(400).json("no existen usuarios desabilitados")}
    else {res.status(200).json(disabledUsers)}
  } catch (err) { res.status(500).json(err.message) }
}

const registerUser = async (req, res) => {
  const disabled = false
  const { sub } = req.body
  const userAuth0 = await axios.get(`http://localhost:3001/auth0/user/${sub}`)
  const {user_id, name, nickname, picture, email,  family_name, given_name, logins_count} = userAuth0.data 

  try {
    if (name && user_id && email) {
      const user = await User.create( {user_id, name, nickname, picture, email,  family_name, given_name, logins_count, disabled})
      res.status(201).json({ msg: 'El usuario se creó correctamente.', user })
    } else res.status(400).json({ msg: 'El nombre no puede estar vacío.' })
  } catch (err) { res.status(500).json(err.message) }
}

const loginUser = async (req, res) => {
  try {
    res.status(503).json({ msg: 'Lo sentimos. Ruta en construcción...' })
  } catch (err) { res.status(500).json(err.message) }
}

const disableUser = async (req,res) =>{
  const { userId } = req.params
  try {
    await User.update({disabled:true},{ where: { id: userId } })

    res.status(200).json({ msg: 'El Usuario ha sido desabilitado.' })
  } catch (err) { res.status(500).json(err.message) }
}



module.exports = {
  getUsers,
  registerUser,
  loginUser,
  getAllDisabledUsers,
  disableUser,
  getUserById
}