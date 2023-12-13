import React, { useState } from "react";
import CreateNotifications from "./CreateNotifications";
import ListNotifications from "./ListNotifications";
import { Icon } from "@iconify/react";
import bellLinear from "@iconify/icons-solar/bell-linear";

function Notifications() {
	const [isOpenModal, setIsOpenModal] = useState("");

	const openNotification = (value: string) => {
		setIsOpenModal(value);
	};

	return (
		<div>
			<div
				className="bg-primary flex w-10 h-10 p-1 items-center justify-center rounded-[5px] cursor-pointer"
				onClick={() => {
					setIsOpenModal("list");
				}}
			>
				<Icon className="text-white text-3xl" icon={bellLinear} />
			</div>
			<CreateNotifications
				openNotification={openNotification}
				isOpen={isOpenModal === "create"}
			/>
			<ListNotifications
				openNotification={openNotification}
				isOpen={isOpenModal === "list"}
			/>
		</div>
	);
}

export default Notifications;
