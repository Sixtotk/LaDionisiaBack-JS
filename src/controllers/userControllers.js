const { axios } = require("axios")
const { User } = require('../db')

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users })
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

const deleteUser = async (req, res) => {
  try {
    let { id } = req.params; 
    let findUser = await User.findByPk( id ); 
    if (!findUser) throw new Error("User not found");
    await findUser.destroy();
    res.status(200).json({ msg: "User deleted" });
    
  } catch (err) { res.status(500).json(err.message) }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  deleteUser
}