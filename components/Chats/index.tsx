import React, { useState } from "react";
import { MessageOutlined } from "@ant-design/icons";
import ListChats from "./ListChats";
import CreateChats from "./CreateChats";

function Chats() {
	const [isOpenModal, setIsOpenModal] = useState("");

	const openChat = (value: string) => {
		setIsOpenModal(value);
	};

	return (
		<div>
			<div
				className="bg-primary flex w-10 h-10 p-1 items-center justify-center rounded-[5px] relative cursor-pointer border-2 border-[#2951A3]"
				onClick={() => {
					setIsOpenModal("list");
				}}
			>
				<MessageOutlined className="text-white text-2xl" />
			</div>
			<CreateChats openChat={openChat} isOpen={isOpenModal === "create"} />
			<ListChats openChat={openChat} isOpen={isOpenModal === "list"} />
		</div>
	);
}

export default Chats;
