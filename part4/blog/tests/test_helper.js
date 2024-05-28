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

const initialUsers = [
	{
		name: "First",
		username: "IAmTheFirstUser",
		password: "123456",
	},
	{
		name: "Second",
		username: "IAmTheSecondUser",
		password: "123456",
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
	initialUsers,
	blogsInDb,
	notesInDb,
};
