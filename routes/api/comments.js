const router = require("express").Router();
const CommentController = require("../../controllers/CommentController");

// Matches with "/api/comments"
router.route("/")
    .get(CommentController.findAll)
    .post(CommentController.create);

// Matches with "/api/comments/:id"
router.route("/:id")
    .put(CommentController.update)
    .delete(CommentController.destroy);

module.exports = router;