"use client";

import React from "react";
import type { MenuProps } from "antd";
import { Divider, Layout, Menu, theme } from "antd";
import { useRouter } from "next/navigation";
import MenuItem from "antd/es/menu/MenuItem";
import { LogoutOutlined } from "@ant-design/icons";
import Notifications from "#/components/Notifications";
import Photo from "#/components/Photo";
import { LOGO } from "#/constants/images";

interface AuthenticatedLayoutProps {
	children: React.ReactNode;
}

const { Header, Content, Sider } = Layout;

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
	children,
}) => {
	const router = useRouter();

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	// const menu: MenuProps["items"] = [
	// 	{
	// 		key: `/dashboard`,
	// 		label: `Dashboard`,
	// 	},
	// 	{
	// 		key: `/about`,
	// 		label: `About`,
	// 	},
	// ];

	const styleSidebarItems = {
		container: "mx-6 flex flex-col gap-1",
		title: "text-slate-500 p-2 text-2xl",
		subTitle: "text-lg ml-4 font-bold text-slate-600",
		box: "bg-white p-6 rounded-sm flex justify-center box-sider",
	};

	return (
		<Layout style={{ height: "100%" }}>
			<Sider
				width={300}
				style={{ background: colorBgContainer }}
				className="h-[100%] border-r-2 border-primary"
			>
				<div className={"py-5 flex justify-center items-center "}>
					<a href="/">
						<img src={LOGO} alt="Roorent" className="w-[160px]" />
					</a>
				</div>
				<Menu
					mode="inline"
					defaultSelectedKeys={["/dashboard"]}
					className="p-4"
					// items={[UserOutlined, VideoCameraOutlined, UserOutlined].map(
					// 	(icon, index) => ({
					// 		key: String(index + 1),
					// 		icon: React.createElement(icon),
					// 		label: `nav ${index + 1}`,
					// 	})
					// )}
				>
					<div className={styleSidebarItems.container}>
						<p className={styleSidebarItems.title}>Utama</p>
						<MenuItem key={"/dashboard"} className={styleSidebarItems.box}>
							<p className={styleSidebarItems.subTitle}>Dashboard</p>
						</MenuItem>
					</div>
					<Divider />
					<div className={styleSidebarItems.container}>
						<p className={styleSidebarItems.title}>Manajemen</p>
						<MenuItem key={"/users"} className={styleSidebarItems.box}>
							<p className={styleSidebarItems.subTitle}>Pengguna</p>
						</MenuItem>
						<MenuItem key={"/banks"} className={styleSidebarItems.box}>
							<p className={styleSidebarItems.subTitle}>Akun Bank</p>
						</MenuItem>
					</div>
					<Divider />
					<div className={styleSidebarItems.container}>
						<p className={styleSidebarItems.title}>Pembayaran</p>
						<MenuItem
							key={"/payment?role=renter"}
							className={styleSidebarItems.box}
						>
							<p className={styleSidebarItems.subTitle}>Pembayaran Renter</p>
						</MenuItem>
						<MenuItem
							key={"/payment?role=owner"}
							className={styleSidebarItems.box}
						>
							<p className={styleSidebarItems.subTitle}>Pembayaran Owner</p>
						</MenuItem>
					</div>
					<a
						href="#"
						className="text-slate-600 text-2xl font-bold mt-16 flex gap-4 justify-center items-center"
					>
						<LogoutOutlined />
						<p>Logout</p>
					</a>
				</Menu>
			</Sider>
			<Layout>
				<Header style={{ background: colorBgContainer }}>
					<Menu
						mode="horizontal"
						defaultSelectedKeys={[]}
						style={{ borderBottom: 0 }}
						className={
							"absolute left-[300px] w-[calc(100%-300px)] py-[12px] pr-[100px] gap-10 justify-end items-center"
						}
					>
						<div>
							<Notifications />
						</div>
						<div className="flex items-center gap-8">
							<p className="text-xl text-bold -mr-4">Halo, Maulana</p>
							<Photo />
						</div>
					</Menu>
				</Header>
				<Content
					style={{ margin: "10px 0 0 10px" }}
					className="border-2 border-t-primary border-l-0 text-slate-800 bg-white"
				>
					<div
						style={{
							padding: "40px 150px 0 50px",
							minHeight: 360,
							height: "100%",
							background: "colorBgContainer",
						}}
						className="overflow-auto"
					>
						{children}
					</div>
				</Content>
			</Layout>
		</Layout>
	);
};

export default AuthenticatedLayout;
