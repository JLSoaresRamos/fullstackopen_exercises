const Blog = require("../models/blog");

const initialBlogs = [
	{
		title: "My Boring Test",
		author: "Myself",
		url: "http://justaboringsite.com",
		likes: 0,
	},
	{
		title: "Another Boring Test",
		author: "Myself",
		url: "http://justaboringsite.com",
		likes: 0,
	},
];

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const notesInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((Blog) => Blog.toJSON());
};

module.exports = {
	initialBlogs,
	blogsInDb,
	notesInDb,
};
