var mongoose = require('mongoose');
// Setup schema
var PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Post model
var Post = module.exports = mongoose.model('post', PostSchema);
module.exports.get = function (callback, limit) {
    Post.find(callback).limit(limit);
}