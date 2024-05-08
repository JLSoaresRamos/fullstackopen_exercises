var _ = require("lodash");

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteOne = (blogs) => {
	if (blogs.length > 0) {
		return _.maxBy(blogs, (o) => o.likes);
	}

	return {};
};

const mostBlogs = (blogs) => {
	if (blogs.length > 0) {
		const authorCounts = _.countBy(blogs, "author");

		const authorWithMostBlogs = _.maxBy(_.toPairs(authorCounts), (o) => o);
		const result = {
			author: authorWithMostBlogs[0],
			blogs: authorWithMostBlogs[1],
		};

		return result;
	}

	return {};
};

const mostLikes = (blogs) => {
	if (blogs.length > 0) {
		const authorsAndLikesList = [];
		const authorNames = _.uniq(_.map(blogs, (b) => b.author));

		_.forEach(authorNames, (name) => {
			let blogsFilteredByAuthor = _.filter(blogs, function (b) {
				return b.author === name;
			});

			let authorAndLikes = {
				author: name,
				likes: _.sumBy(blogsFilteredByAuthor, function (b) {
					return b.likes;
				}),
			};

			authorsAndLikesList.push(authorAndLikes);
		});

		return _.maxBy(authorsAndLikesList, (o) => o.likes);
	}

	return {};
};

module.exports = {
	dummy,
	totalLikes,
	favoriteOne,
	mostBlogs,
	mostLikes,
};
