import React, { useState } from "react";
import CreateNotifications from "./CreateNotifications";
import ListNotifications from "./ListNotifications";

function Notifications() {
	const [isCreateNotification, setIsCreateNotification] = useState(false);

	const toCreateNotification = () => {
		setIsCreateNotification(true);
	};

	const toListNotification = () => {
		setIsCreateNotification(false);
	};

	return (
		<div>
			{isCreateNotification ? (
				<CreateNotifications onBack={toListNotification} />
			) : (
				<ListNotifications onCreate={toCreateNotification} />
			)}
		</div>
	);
}

export default Notifications;
