"use client";

import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { useRouter } from "next/navigation";
import MenuItem from "antd/es/menu/MenuItem";
import { LogoutOutlined } from "@ant-design/icons";
import Notifications from "#/components/Notifications";
import Photo from "#/components/Photo";
import { LOGO } from "#/constants/images";
import Chats from "#/components/Chats";

interface AuthenticatedLayoutProps {
	children: React.ReactNode;
}

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
	label: React.ReactNode,
	key?: React.Key | null,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: "group"
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
	children,
}) => {
	const router = useRouter();

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const items: MenuItem[] = [
		getItem(
			"Utama",
			"/utama",
			null,
			[getItem("Dashboard", "/dashboard", null)],
			"group"
		),
		{
			type: "divider",
			style: {
				marginTop: "20px",
				marginBottom: "20px",
			},
		},
		getItem(
			"Manajemen",
			"/manajemen",
			null,
			[
				getItem("Pengguna", "/pengguna", null),
				{ type: "group" },
				getItem("Akun Bank", "/bank-account", null),
			],
			"group"
		),
		{
			type: "divider",
			style: {
				marginTop: "20px",
				marginBottom: "20px",
			},
		},
		getItem(
			"Pembayaran",
			"/pembayaran",
			null,
			[
				getItem("Pembayaran Renter", "/renter-payment", null),
				{ type: "group" },
				getItem("Pembayaran Owner", "/owner-payment", null),
			],
			"group"
		),
	];

	const [current, setCurrent] = useState("/dashboard");

	const onClick: MenuProps["onClick"] = (e) => {
		setCurrent(e.key);
	};

	return (
		<Layout style={{ height: "100%" }}>
			<Sider
				width={300}
				style={{ background: colorBgContainer }}
				className="h-[100%] border-r-2 border-primary flex justify-center items-center"
			>
				<div className="py-5 flex justify-center items-center">
					<a href="/">
						<img src={LOGO} alt="Roorent" className="w-[160px]" />
					</a>
				</div>
				<Menu
					onClick={onClick}
					mode="inline"
					style={{ width: 298, borderRight: 0 }}
					defaultOpenKeys={["/dashboard"]}
					selectedKeys={[current]}
					items={items}
					className="sidebar flex flex-col gap-1 justify-center px-8"
				/>
				<a
					href="#"
					className="text-slate-600 text-2xl font-bold flex gap-4 justify-center items-center hover:text-primary absolute left-[25%] bottom-16"
				>
					<LogoutOutlined />
					<p>Logout</p>
				</a>
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
						<div className="flex gap-6 items-center">
							<Chats />
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
					className="border-t-2 border-primary text-slate-800 bg-white"
				>
					<div
						style={{
							padding: "40px 150px 0 50px",
							minHeight: 360,
							height: "100%",
							background: colorBgContainer,
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
