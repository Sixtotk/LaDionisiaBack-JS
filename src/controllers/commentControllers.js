const { Comment, User, Product } = require('../db')

const getProductComments = async (req, res) => {
  const { productId } = req.query
  try { 
  // Buscamos SÓLO los comentarios de una producto que pasamos por query
    const comments = await Comment.findAll({ where: { productId } });

    res.status(200).json(comments)
  } catch (err) { res.status(500).json(err.message) }
}

const getAllDisabledComments = async (req, res) => {
  try { 
    const disabledComments = await Comment.findAll({ where: { disabled:true } });

    res.status(200).json(disabledComments)
  } catch (err) { res.status(500).json(err.message) }
}


const getAllReportedComments = async (req, res) => {
  try { 
    const disabledComments = await Comment.findAll({ where: { disabled:true } });

    res.status(200).json(disabledComments)
  } catch (err) { res.status(500).json(err.message) }
}

const postComment = async (req,res) =>{
  const { content } = req.body
  const { productId, /*userId*/ } = req.params

  try {
    if (content) {
      const comment = await Comment.create(
        { content, productId, /*userId*/ }
      );
      
      const product = await Product.findOne({ where: { id: productId } })
      await product?.addComment(comment);

      res.status(201).json({ msg: 'El comentario se creó correctamente.', comment })
    } else res.status(400).json({ msg: 'El comentario no puede estar vacío.'})
  } catch (err) { res.status(500).json(err.message) }
}

const updateComment = async (req,res) =>{
  const { commentId } = req.params
  const { content } = req.body
  try {
    await Product.update(
      { content },
      { where: {  id: commentId } }
    )
    res.status(200).json({ msg: 'El comentario  ha sido actualizado.' })
  } catch (err) { res.status(500).json(err.message) }
}
// usando el id del comment buscarlo en DB y updatear disabled a true
const disableComment = async (req,res) =>{
  const { commentId } = req.params
  try {
    await Comment.update({disabled:true},{ where: { id: commentId } })

    res.status(200).json({ msg: 'El comentario ha sido desabilitado.' })
  } catch (err) { res.status(500).json(err.message) }
}

const destroyComment = async (req,res) =>{
  const { commentId } = req.params
  try {
    await Comment.destroy({ where: { id: commentId } })

    res.status(200).json({ msg: 'El comentario ha sido borrado permanentemente.' })
  } catch (err) { res.status(500).json(err.message) }
}


module.exports = {
  getProductComments, 
  postComment,
  updateComment,
  disableComment,
  getAllDisabledComments,
  getAllReportedComments,
  destroyComment
}