// api-routes.js
// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API is Working',
        message: 'Welcome to App',
    });
});

// Import post controller
var postController = require('./postController');

// Post routes
router.route('/posts')
    .get(postController.index)
    .post(postController.new);
router.route('/posts/:post_id')
    .get(postController.view)
    .patch(postController.update)
    .put(postController.update)
    .delete(postController.delete);

    // Export API routes
module.exports = router;