const { Comment } = require('../models');
const createComment = async (data) => {
    // Validate the data
    const {user_id, post_id, content} = data;
  return await Comment.create(data);
}
module.exports = {
    createComment,
};