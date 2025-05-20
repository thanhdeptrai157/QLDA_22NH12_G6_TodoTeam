const { Comment,User, Like } = require('../models');
const createComment = async (data) => {
    // Validate the data
  // const { user_id, post_id, content } = data;
   //   Comment = {
    //   id: Date.now(),
    //   content: commentText,
    //   createdAt: new Date().toISOString(),
    //   likes: 0,
    //   author: {
    //     id: 1,
    //     name: "Nguyễn Văn A",
    //     avatarPath: "/placeholder.svg?height=40&width=40",
    //   }
  // }
  console.log('Creating comment with data:', data);
  try {
    // Validate the data
    if (!data.user_id || !data.post_id || !data.content) {
      throw new Error('Missing required fields');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error validating data');
  }
  const newComment = await Comment.create(data);
  console.log(newComment.dataValues)
  return Comment.findOne({
    where: {
      id: newComment.id
    },
    attributes: ['id', 'content', 'created_at', 'likes'],
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'avatar_path'],
      },
    ],
  });
  
}
const getCommentsByPostId = async (post_id) => {
    const comments = await Comment.findAll({
        where: {
            post_id: post_id
        },
        include: [{
            model: User,
            attributes: ['id', 'name', 'avatar_path'] 
        },
          { 
            model: Like,
            as: 'like',
            attributes: ['user_id'],
            where: {
                is_post: false
            },
            required: false
          }
        ]
    });
    return comments;
};

module.exports = {
  createComment,
  getCommentsByPostId
};