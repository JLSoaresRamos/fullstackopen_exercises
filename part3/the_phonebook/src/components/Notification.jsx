const Notification = ({ message, type }) => {
	if (message === null) {
		return null;
	}

	return (
		<div className={`${type === "sucess" ? "sucess" : "error"}`}>{message}</div>
	);
};

export default Notification;
