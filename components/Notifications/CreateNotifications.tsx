import React, { useState } from "react";
import { Modal, ConfigProvider, Menu, Dropdown, Form, Input } from "antd";
import { Icon } from "@iconify/react";
import bellLinear from "@iconify/icons-solar/bell-linear";
import { ArrowLeftOutlined, CaretDownOutlined } from "@ant-design/icons";
import Button from "../Button";

function CreateNotifications({ onBack }: any) {
	const [isModalOpen, setIsModalOpen] = useState(true);
	const [role, setRole] = useState("Owner");

	const showModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const handleBack = () => {
		onBack();
		closeModal();
	};
	const handleSubmit = () => {
		closeModal();
	};

	const handleRoleChange = (e: any) => {
		setRole(e.key);
	};

	const option = (
		<Menu onClick={handleRoleChange}>
			<Menu.Item key="Owner">Owner</Menu.Item>
			<Menu.Item key="Renter">Renter</Menu.Item>
		</Menu>
	);

	return (
		<>
			<div
				className="bg-primary flex w-10 h-10 p-1 items-center justify-center rounded-[5px] cursor-pointer"
				onClick={showModal}
			>
				<Icon className="text-white text-3xl" icon={bellLinear} />
			</div>

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
						<>
							<div className="flex">
								<div className="mr-4 text-2xl font-bold">
									<ArrowLeftOutlined onClick={handleBack} />
								</div>
								<div>
									<div className="ml-2 text-2xl font-bold">Buat Notifikasi</div>
								</div>
							</div>
							<div className="border-primary border-b-2 mt-2 mb-4"></div>
						</>
					}
					closeIcon={<p></p>}
					mask={false}
					open={isModalOpen}
					onCancel={closeModal}
					className="absolute top-14 right-[250px]"
					footer={<Button onClick={handleSubmit}>Simpan</Button>}
				>
					<div className="flex flex-col gap-4 my-2">
						<div className="font-bold mt-2">
							<Dropdown overlay={option} placement="bottomLeft">
								<div className="p-[2px] px-6 flex bg-primary justify-between text-lg text-white rounded-md cursor-pointer">
									<p>{role}</p>
									<CaretDownOutlined />
								</div>
							</Dropdown>
						</div>
						<Form name="trigger" layout="vertical" autoComplete="off">
							<Form.Item
								name="judul"
								label={<span className="text-lg">Judul</span>}
								className="mt-2"
							>
								<Input placeholder="Masukkan judul" />
							</Form.Item>
							<Form.Item
								name="teks"
								label={<span className="text-lg">Teks</span>}
								className="-mt-2"
							>
								<Input.TextArea placeholder="Masukkan teks" rows={4} />
							</Form.Item>
						</Form>
					</div>
				</Modal>
			</ConfigProvider>
		</>
	);
}

export default CreateNotifications;
