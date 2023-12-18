"use client";
// import React, { useState } from "react";
import Chats from "#/components/Chats";
import Notifications from "#/components/Notifications";
import Photo from "#/components/Photo";
import Logo from "#/components/logo/logo";
import { MASCOT_OWNER, PROFILE } from "#/constants/images";
import { ArrowLeftOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Card, Input, Layout, Menu, theme } from "antd";
import { useRouter } from "next/navigation";

// interface AuthenticatedLayoutProps {
// 	children: React.ReactNode;
// }

const profile = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const router = useRouter();

	// const [current, setCurrent] = useState("/dashboard");

	const { Header, Content } = Layout;

	return (
		<main className="h-full">
			<div>
				<a
					href="#"
					className="text-slate-900 text-2xl font-bold flex gap-4 justify-start items-center hover:text-primary m-5"
				>
					<ArrowLeftOutlined />
					<p>Kembali</p>
				</a>
				<Card className="mx-5 w-[300px] rounded-xl">
					<div className="flex items-center">
						<img
							src={"/assets/images/profile.png"}
							alt="profile"
							className="rounded-xl w-[100px]"
						/>
						<div className="ml-2">
							<p className="text-slate-950 font-bold text-xl mb-2">
								Fauzi Rahman
							</p>
							<button className="flex items-center bg-blue-500 rounded-xl w-[150px] p-2">
								<img
									src={MASCOT_OWNER}
									alt="Mascot Owner"
									className="w-8 h-9 mr-2"
								/>
								<p className="text-lg font-semibold text-white">Pemilik</p>
							</button>
						</div>
					</div>
				</Card>
				<div className="m-5 w-[300px]">
        <p className="font-bold">Foto Bersama Ktp</p>
					<img
						src={"/assets/images/profile.png"}
						alt="profile"
						className="rounded-xl w-full"
					/>
				</div>
				<div className="flex flex-col space-y-2  w-[300px] m-5">
					<p className="text-md font-bold">No.Nik</p>
					<Input placeholder="3275022211058726" />
				</div>
        <div className="flex">
        <a
					href="#"
					className="text-slate-900 text-xl font-bold flex gap-4 justify-start items-center hover:text-primary m-5"
				>
					<SettingOutlined className=""/>
					<p>Pengaturan</p>
				</a>
        </div>
			</div>
		</main>
	);
};

export default profile;
