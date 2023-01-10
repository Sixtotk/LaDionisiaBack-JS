const { Comment, User, Product } = require('../db')

const getComment = async (req, res) => {
  const { productId } = req.query
  try { 
  // Buscamos SÓLO los comentarios de una producto que pasamos por query
    const comments = await Comment.findAll({ where: { productId } });

    res.status(200).json(comments)
  } catch (err) { res.status(500).json(err.message) }
}

const postComment = async (req,res) =>{
  const { content } = req.body
  //const { productId, /*userId*/ } = req.query

  try {
    if (content) {
      const comment = await Comment.create(
        { content, /*userId*/ }
      );
      
      const product = await Product.findOne({ where: { id: productId } })
      await product?.addComment(comment);

      res.status(201).json({ msg: 'El comentario se creó correctamente.', content })
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

const archiveComment = async (req,res) =>{
  const { commentId } = req.params
  try {
    await Comment.destroy({ where: { id: commentId } })

    res.status(200).json({ msg: 'El comentario ha sido archivado.' })
  } catch (err) { res.status(500).json(err.message) }
}


module.exports = {
  getComment, 
  postComment,
  updateComment,
  archiveComment
}