// Import post model
let Post = require('./postModel');

// Handle index actions
exports.index = function (req, res) {
    Post.get(function (err, posts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Posts retrieved successfully",
            data: posts
        });
    });
};

// Handle create post actions
exports.new = function (req, res) {
    var post = new Post();
    post.title = req.body.title;
    post.description = req.body.description;
    // save the post and check for errors
    post.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            status: "success",
            message: 'New post created',
            data: post
        });
    });
};

// Handle view post info
exports.view = function (req, res) {
    Post.findById(req.params.post_id, function (err, post) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Post retrieved by id successfully',
            data: post
        });
    });
};

// Handle update post info
exports.update = function (req, res) {
    Post.findById(req.params.post_id, function (err, post) {
        if (err)
            res.send(err);
post.title = req.body.title;
        post.description = req.body.description;

// save the post and check for errors
        post.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                status: "success",
                message: 'Post updated',
                data: post
            });
        });
    });
};

// Handle delete post
exports.delete = function (req, res) {
    Post.remove({
        _id: req.params.post_id
    }, function (err, post) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Post deleted'
        });
    });
};