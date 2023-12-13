"use client";

import { CloseOutlined, MessageOutlined } from "@ant-design/icons";
import { ConfigProvider, Modal } from "antd";
import React, { useEffect, useState } from "react";
import Photo from "../Photo";

function ListChats({ openChat, isOpen }: any) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const closeModal = () => {
		openChat("");
		setIsModalOpen(false);
	};

	useEffect(() => {
		setIsModalOpen(isOpen);
	}, [isOpen]);

	return (
		<>
			<ConfigProvider
				modal={{
					styles: {
						content: {
							width: "80%",
							padding: "15px",
							boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.5)",
						},
					},
				}}
			>
				<Modal
					title={
						<div>
							<div className="ml-2 text-2xl font-bold text-slate-800">
								Pesan
							</div>
							<div className="border-primary border-b-2 mt-2 mb-4"></div>
						</div>
					}
					mask={false}
					open={isModalOpen}
					onCancel={closeModal}
					className="absolute top-14 right-[320px]"
					closeIcon={
						<div onClick={closeModal} className="text-slate-800">
							<CloseOutlined className="text-2xl" />
						</div>
					}
					footer={false}
				>
					<div className="flex flex-col gap-4 my-2">
						<div className="flex items-center">
							<div className="w-[18%]">
								<Photo />
							</div>
							<div
								className="w-[82%] py-1 border-b border-primary cursor-pointer"
								onClick={() => {
									openChat("create");
									setIsModalOpen(false);
								}}
							>
								<div className="mb-1 flex justify-between items-center text-slate-800">
									<p className="font-bold text-xl">Mola</p>
									<p className="text-[10px] text-slate-700">08:10</p>
								</div>
								<p className="text-[12px] text-slate-600 font-normal truncate">
									Halo kak, bagaimana kondisi lingkungan sekitar?
								</p>
							</div>
						</div>
						<div className="flex items-center">
							<div className="w-[18%]">
								<Photo />
							</div>
							<div
								className="w-[82%] py-1 border-b border-primary cursor-pointer"
								onClick={() => {
									openChat("create");
									setIsModalOpen(false);
								}}
							>
								<div className="mb-1 flex justify-between items-center text-slate-800">
									<p className="font-bold text-xl">Dimas</p>
									<p className="text-[10px] text-slate-700">08:10</p>
								</div>
								<p className="text-[12px] text-slate-600 font-normal truncate">
									Halo kak, saya masih belum paham dengan deskripsi anda. tolong
									buat deskripsi lebih jelas.
								</p>
							</div>
						</div>
						<div className="flex items-center">
							<div className="w-[18%]">
								<Photo />
							</div>
							<div
								className="w-[82%] py-1 border-b border-primary cursor-pointer"
								onClick={() => {
									openChat("create");
									setIsModalOpen(false);
								}}
							>
								<div className="mb-1 flex justify-between items-center text-slate-800">
									<p className="font-bold text-xl">Catur</p>
									<p className="text-[10px] text-slate-700">08:10</p>
								</div>
								<p className="text-[12px] text-slate-600 truncate">
									Kenapa photo bagus tapi rating buruk?
								</p>
							</div>
						</div>
					</div>
				</Modal>
			</ConfigProvider>
		</>
	);
}

export default ListChats;
