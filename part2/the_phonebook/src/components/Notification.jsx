import { useEffect, useState } from "react";

const Notification = ({ notification, setNotification }) => {
	if (notification === null) {
		return null;
	}

	const { message, type } = notification;

	const [msg] = useState(message);

	// Timer to fade out
	useEffect(() => {
		setTimeout(() => {
			setNotification(null);
		}, 5000);
	}, [msg]);

	return (
		<div className={`${type === "sucess" ? "sucess" : "error"}`}>{message}</div>
	);
};

export default Notification;
