const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

blogsRouter.post("/", (request, response) => {
	const { title, author, url, likes } = request.body;

	const blog = new Blog({
		title: title,
		author: author,
		url: url,
		likes: likes,
	});

	blog
		.save()
		.then((newBlog) => {
			response.status(201).json(newBlog);
		})
		.catch((error) => {
			logger.error(error);
		});
});

module.exports = blogsRouter;
