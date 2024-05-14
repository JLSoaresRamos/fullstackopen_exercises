const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogsRouter.get("/", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

blogsRouter.delete("/:id", async (request, response) => {
	const { id } = request.params;

	try {
		await Blog.findByIdAndDelete(id);
		response.status(202).end();
	} catch (error) {
		response.status(400).json({ error: "Error deleting blog" });
		logger.error(error);
	}
});

blogsRouter.put("/:id", async (request, response) => {
	const { id } = request.params;
	const blog = request.body;

	try {
		const blogUpdated = await Blog.findByIdAndUpdate(id, blog, { new: true });
		response.status(200).json(blogUpdated);
	} catch (error) {
		logger.error(error);
		response.status(400);
	}
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
