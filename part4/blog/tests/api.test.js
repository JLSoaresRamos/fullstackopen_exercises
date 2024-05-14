const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const app = require("../app");
const helper = require("./test_helper");
const supertest = require("supertest");
const mongoose = require("mongoose");

const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});

	const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));

	const promiseArray = blogObjects.map((blog) => blog.save());
	await Promise.all(promiseArray);
});

test("Get all blogs", async () => {
	await api
		.get("/api/blogs/")
		.expect(200)
		.expect("Content-Type", /application\/json/);

	const blogs = await helper.blogsInDb();

	assert.strictEqual(blogs.length, 2);
});

test("Insert an blog to database", async () => {
	const blog = {
		title: "Another, Another, Boring Test",
		author: "Myself",
		url: "http://justaboringsite.com",
		likes: 0,
	};

	await api
		.post("/api/blogs/")
		.send(blog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const blogsAtEnd = await helper.blogsInDb();
	assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
});

test("The blog includes id as identifier", async () => {
	const response = await helper.blogsInDb();

	assert.strictEqual(response[0].hasOwnProperty("id"), true);
});

test("The number of likes by default is 0", async () => {
	const blog = {
		title: "This must have 0 likes as default",
		author: "Myself",
		url: "http://justaboringsite.com",
	};

	await api
		.post("/api/blogs/")
		.send(blog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const blogsAtEnd = await helper.blogsInDb();

	const lastBlogAdded = blogsAtEnd[blogsAtEnd.length - 1];

	assert.strictEqual(lastBlogAdded.likes, 0);
});

test("The author and title is missing", async () => {
	const blog = {
		url: "http://thisisforbidden.com",
	};

	await api.post("/api/blogs/").send(blog).expect(400);
});

after(async () => {
	await mongoose.connection.close();
});
