const controllers = require("../controllers/commentControllers");
const express = require('express');

const router = express.Router();

const { getProductComments, postComment, destroyComment, getCommentById, updateComment, reportComment, disableComment, getAllDisabledComments, getAllReportedComments } = controllers;


router.get('/',getProductComments)
router.get('/disabled',getAllDisabledComments)
router.get('/reported',getAllReportedComments)
router.get('/comment/:commentId',getCommentById)
router.post('/:productId', postComment)
router.patch('/:commentId',updateComment)
router.patch('/report/:commentId',reportComment)
router.patch('/disable/:commentId',disableComment)
router.delete('/destroy/:commentId',destroyComment)


module.exports = router;