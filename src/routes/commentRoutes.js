const controllers = require("../controllers/commentControllers");
const express = require('express');

const router = express.Router();
const { getComment, postComment, updateComment, archiveComment } = controllers;

router.route('/')
  .get(getComment)
  .post(postComment)
  .patch(updateComment)
  .delete(archiveComment);


module.exports = router;