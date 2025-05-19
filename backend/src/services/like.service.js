const { Like, Post, Comment } = require('../models');
const createLike = async (postData) => { 
    const { is_post, user_id, target_id } = postData;
    if (is_post) {
        const post = await Post.findByPk(target_id);
        post.likes += 1;
        await post.save();
    } else {
        const comment = await Comment.findByPk(target_id);
        comment.likes += 1;
        await comment.save();
    }
    return await Like.create({
        is_post,
        user_id,
        target_id
    });
}
const deleteLike = async (postData) => {
    let { is_post, user_id, target_id } = postData;
    is_post = is_post === 'true' ? true : false;
    user_id = parseInt(user_id);
    target_id = parseInt(target_id);
    console.log(is_post, user_id, target_id)
    if (is_post) {
        const post = await Post.findByPk(target_id);
        post.likes -= 1;
        await post.save();
    } else {
        const comment = await Comment.findByPk(target_id);
        comment.likes -= 1;
        await comment.save();
    }
    return await Like.destroy({
        where: {
            is_post,
            user_id,
            target_id
        }
    });
}
module.exports = {
    createLike,
    deleteLike
}