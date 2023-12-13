import React, { useEffect, useState } from "react";
import { Modal, ConfigProvider } from "antd";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Button from "../Button";

function ListNotifications({ openNotification, isOpen }: any) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [readable, setReadable] = useState(true);

	const closeModal = () => {
		openNotification("");
		setIsModalOpen(false);
	};

	const changeRadio = (e: RadioChangeEvent) => {
		setReadable(e.target.value);
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
								Notifikasi
							</div>
							<div className="border-primary border-b-2 mt-2 mb-4"></div>
						</div>
					}
					mask={false}
					open={isModalOpen}
					onCancel={closeModal}
					className="absolute top-14 right-[250px]"
					closeIcon={
						<div onClick={closeModal} className="text-slate-800">
							<CloseOutlined className="text-2xl" />
						</div>
					}
					footer={
						<Button
							onClick={() => {
								openNotification("create");
								setIsModalOpen(false);
							}}
						>
							Buat Notifikasi
						</Button>
					}
				>
					<div className="flex justify-end">
						<Radio.Group onChange={changeRadio} value={readable}>
							<Radio value={true}>Sudah Dibaca</Radio>
							<Radio value={false}>Belum Dibaca</Radio>
						</Radio.Group>
					</div>
					<div className="flex flex-col gap-4 my-2">
						{readable ? (
							<>
								<div>
									<p className="font-bold text-[18px] mb-1 text-slate-800">
										25 November
									</p>
									<div className="p-1 px-2 relative border-2 border-slate-300 rounded-md">
										<p className="text-[15px] mb-4 text-slate-700">
											Pembayaran berhasil !
										</p>
										<p className="text-[10px] text-slate-700 absolute right-2 bottom-1">
											18:28
										</p>
									</div>
								</div>
								<div>
									<p className="font-bold text-[18px] mb-1 text-slate-800">
										26 November
									</p>
									<div className="p-1 px-2 relative border-2 border-slate-300 rounded-md">
										<p className="text-[15px] mb-4 text-slate-700">
											Pembayaran gagal !
										</p>
										<p className="text-[10px] text-slate-700 absolute right-2 bottom-1">
											18:28
										</p>
									</div>
								</div>
								<div>
									<p className="font-bold text-[18px] mb-1 text-slate-800">
										27 November
									</p>
									<div className="p-1 px-2 relative border-2 border-slate-300 rounded-md">
										<p className="text-[15px] mb-4 text-slate-700">
											Pembayaran berhasil !
										</p>
										<p className="text-[10px] text-slate-700 absolute right-2 bottom-1">
											18:28
										</p>
									</div>
								</div>
							</>
						) : (
							<>
								<div className="font-bold">
									<p className="text-[18px] mb-1 text-slate-800">25 November</p>
									<div className="p-1 px-2 relative border-2 border-primary rounded-md">
										<p className="text-[15px] mb-4 text-slate-800">
											Pembayaran berhasil !
										</p>
										<p className="text-[10px] absolute text-slate-800 right-2 bottom-1">
											18:28
										</p>
									</div>
								</div>
								<div className="font-bold">
									<p className="text-[18px] mb-1 text-slate-800">26 November</p>
									<div className="p-1 px-2 relative border-2 border-primary rounded-md">
										<p className="text-[15px] mb-4 text-slate-800">
											Pembayaran gagal !
										</p>
										<p className="text-[10px] absolute text-slate-800 right-2 bottom-1">
											18:28
										</p>
									</div>
								</div>
							</>
						)}
					</div>
				</Modal>
			</ConfigProvider>
		</>
	);
}

export default ListNotifications;
