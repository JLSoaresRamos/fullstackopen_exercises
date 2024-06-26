const { describe, test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const app = require("../app");
const helper = require("./test_helper");
const supertest = require("supertest");
const mongoose = require("mongoose");

const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

describe("Blog API tests", () => {
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

	test("Insert a blog to database", async () => {
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

	test("Delete a blog by id", async () => {
		const firstBlogId = (await helper.blogsInDb())[0].id;

		await api.delete(`/api/blogs/${firstBlogId}`).expect(202);
	});

	test("Update likes of a blog", async () => {
		const firstBlog = (await helper.blogsInDb())[0];
		const firstBlogPlusOneLike = { ...firstBlog, likes: 1 };

		await api
			.put(`/api/blogs/${firstBlog.id}`)
			.send(firstBlogPlusOneLike)
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});
});

describe("Users API tests", () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const userObjects = helper.initialUsers.map((user) => new User(user));

		const promiseArray = userObjects.map((user) => user.save());
		await Promise.all(promiseArray);
	});

	test("Add a new user to database", async () => {
		const user = {
			username: "Tester",
			name: "Tester Name",
			password: "superstrongpassword",
		};

		await api
			.post("/api/users")
			.send(user)
			.expect(201)
			.expect("Content-Type", /application\/json/);
	});

	test("Trying to add already existing username must fail", async () => {
		const user = {
			username: "IAmTheFirstUser",
			name: "First",
			password: "123456",
		};

		await api.post("/api/users").send(user).expect(409);
	});

	test("Trying to add a user with password less than three characters must fail", async () => {
		const user = {
			username: "NotValidPassword",
			name: "Invalid",
			password: "bi",
		};

		await api.post("/api/users").send(user).expect(400);
	});

	test("Trying to add a user with a empty password must fail", async () => {
		const user = {
			username: "NotValidPassword",
			name: "Invalid",
			password: "",
		};

		await api.post("/api/users").send(user).expect(400);
	});

	test("Trying to add a user with username less than three characters must fail", async () => {
		const user = {
			username: "No",
			name: "Invalid",
			password: "123456",
		};

		await api.post("/api/users").send(user).expect(400);
	});

	test("Trying to add a user with a empty username must fail", async () => {
		const user = {
			username: "",
			name: "Invalid",
			password: "123456",
		};

		await api.post("/api/users").send(user).expect(400);
	});
});

after(async () => {
	await mongoose.connection.close();
});
