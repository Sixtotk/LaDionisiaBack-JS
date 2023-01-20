const axios = require("axios").default;
const { User } = require('../db')

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users)
  } catch (err) { res.status(500).json(err.message) }
}

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params
    const userFound = await User.findByPk( userId );
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
  console.log(req.body)
  const { sub } = req.body
  const userAuth0 = await axios.get(`http://localhost:3001/auth0/user/${sub}`)
  const {user_id, name, nickname, picture, email,  family_name, given_name, logins_count} = userAuth0.data 

  try {
    if (name && user_id && email) {
      const user = await User.create( {user_id, name, nickname, picture, email,  family_name, given_name, logins_count, disabled})
      res.status(201).json({ msg: 'El usuario se creó correctamente.', user })
    } else res.status(400).json({ msg: 'El nombre no puede estar vacío.' })
  } catch (err) { 
    // console.log(err.message)
    res.status(500).json(err.message) 
  }
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

const disableUser = async (req,res) =>{
  const { userId } = req.params
  try {
    await User.update({disabled:true},{ where: { id: userId } })

    res.status(200).json({ msg: 'El Usuario ha sido desabilitado.' })
  } catch (err) { res.status(500).json(err.message) }
}

const updateUser = async (req, res) => {
  const { id } = req.params
  const { name, nickname, email, family_name, given_name } = req.body 
  
  try {
    const userDb = await User.findByPk(id)

    if(userDb){
      const userDb = await userDb.update({
        name: name,
        nickname: nickname,
        email: email,
        family_name: family_name,
        given_name: given_name,
      })
      return res.status(200).json("Usuario modificado con exito!")
    }
  } catch (err) {
    res.status(500).send(err)
  }
}


const favoritesToDb = async (req,res) =>{
  const { userId } = req.params
  const { productId } = req.query
  try {
    const userFavorites = User.findByPk({userId})
    const middleWareSet = new Set.add(userFavorites.favorites)
    const setNewFavorites = middleWareSet.add(productId)
    const setToArray = Array.from(setNewFavorites)
    await User.update({favorites:setToArray},{ where: { id: userId } })

    res.status(200).json({ msg: 'Product succesfully added to favorites!.' })
  } catch (err) { res.status(500).json(err.message) }
}

const deleteFavorite = async (req, res) => {
  const { userId } = req.params
  const { productId } = req.query
  try { 
    const userFavorites = User.findByPk({userId}) 
    const middleWareSet = new Set.add(userFavorites.favorites)
    const setFavoriteDeleted = middleWareSet.delete(productId)
    const setToArray = Array.from(setFavoriteDeleted)
    await User.update({favorites:setToArray},{ where: { id: userId } })

    res.status(200).json({ msg: "Favorite deleted from the list!." });
    
  } catch (err) { res.status(500).json(err.message) }
};

const deleteAllFavorites = async (req, res) => {
  const { userId } = req.params
  try {  
    await User.update({favorites:[]},{ where: { id: userId } })
    res.status(200).json({ msg: "All Favorites deleted from the list!." });
    
  } catch (err) { res.status(500).json(err.message) }
};

const PurchaseHistoryToDb = async (req,res) =>{
  const { userId } = req.params
  const { saleData } = req.query
  try {
    const userPH = User.findByPk({userId})
    const updatedPH = userPH.purchase_history.push(saleData)
    await User.update({purchase_history:updatedPH},{ where: { id: userId } })

    res.status(200).json({ msg: 'Sale data succesfully stored in DB!.' })
  } catch (err) { res.status(500).json(err.message) }
}


module.exports = {
  getUsers,
  registerUser,
  loginUser,
  deleteUser,
  getAllDisabledUsers,
  disableUser,
  getUserById,
  updateUser,
  favoritesToDb,
  deleteFavorite,
  deleteAllFavorites,
  PurchaseHistoryToDb
}