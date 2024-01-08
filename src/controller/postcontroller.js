const Post = require('../model/postSchema');

const create = async (req, res) => {
  const newPost = new Post(req.body); // Use 'new' to create an instance
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

const findById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json("title not found");
    }

    if (post.userId.toString() === req.body.userId) { // Convert userId to string
      await post.updateOne({ $set: req.body });
      res.status(200).json("The title has been updated");
    } else {
      res.status(403).json("You can update only your title");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const findByI = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json("title not found");
    }

    if (post.userId.toString() === req.body.userId) { // Convert userId to string
      await post.deleteOne();
      res.status(200).json("The title has been deleted");
    } else {
      res.status(403).json("You can delete only your ttitle");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  create,
  findById,
  findByI,
 
};
