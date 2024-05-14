const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

blogsRouter.post("/", (request, response) => {
	const { title, author, url, likes } = request.body;

	if (title && author) {
		const blog = new Blog({
			title: title,
			author: author,
			url: url,
			likes: likes || 0,
		});

		blog
			.save()
			.then((newBlog) => {
				response.status(201).json(newBlog);
			})
			.catch((error) => {
				logger.error(error);
			});

		return;
	}

	return response.status(400).json({ error: "title or author is missing" });
});

module.exports = blogsRouter;
