import React, { useState } from "react";
import CreateNotifications from "./CreateNotifications";
import ListNotifications from "./ListNotifications";
import { Icon } from '@iconify/react';
import { parseJwt } from "#/utils/convert";

function Notifications() {
	const [isOpenModal, setIsOpenModal] = useState("");

	const openNotification = (value: string) => {
		setIsOpenModal(value);
	};

	const token = localStorage.getItem("access_token")
	let role: string = ''
	
	if(token){
		role = parseJwt(token).role
	}

	return (
		<div>
			<div
				className="bg-primary flex w-10 h-10 p-1 items-center justify-center rounded-[5px] cursor-pointer border-2 border-[#2951A3]"
				onClick={() => {
					setIsOpenModal("list");
				}}
			>
				<Icon icon="solar:bell-linear" className="text-white text-3xl"/>
			</div>
			{role == "admin" ? (
				<>
			<CreateNotifications
				openNotification={openNotification}
				isOpen={isOpenModal === "create"}
			/>
			<ListNotifications
				openNotification={openNotification}
				isOpen={isOpenModal === "list"}
			/>
			</>
			) : (
			<ListNotifications
			openNotification={openNotification}
			isOpen={isOpenModal === "list"}
			/>
			)}
		</div>
	);
}

export default Notifications;
