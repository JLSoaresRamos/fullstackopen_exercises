const { info } = require("./logger");

function requestLogger(request, response, next) {
	info("\nMethod:", request.method);
	info("Path:  ", request.path);
	info("Body:  ", request.body);
	info("---");
	next();
}

module.exports = {
	requestLogger,
};
