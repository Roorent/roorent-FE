"use client";

import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import {useRouter}  from "next/navigation";
import MenuItem from "antd/es/menu/MenuItem";
import { LogoutOutlined } from "@ant-design/icons";
import Notifications from "#/components/Notifications";
import Photo from "#/components/Photo";
import { LOGO } from "#/constants/images";
import Chats from "#/components/Chats";
import { parseJwt } from "#/utils/convert";

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

	const token = localStorage.getItem("access_token")
	let role: string = ''
	
	if(token){
		role = parseJwt(token).role
	}

	const itemOwner: MenuItem[] = [
		getItem(
			"Produk",
			"/product",
			null,
			[getItem("Daftar Produk", "/list-produk", null)],
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
			"Riwayat Transaksi",
			"/riwayat-transaksi",
			null,
			[
				getItem("Transaksi Pending", "/trans-pending", null),
				{ type: "group" },
				getItem("Transaksi Berhasil", "/trans-success", null),
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
			"/payment",
			null,
			[
				getItem("Akun Bank", "/bank-account", null),
				{ type: "group" },
				getItem("Laporan Transaksi", "/trans-report", null),
			],
			"group"
		),
	];

	const itemAdmin: MenuItem[] = [
		getItem(
			"Utama",
			"/adm/utama",
			null,
			[getItem("Dashboard", "/adm/dashboard", null)],
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
			"/adm/manajemen",
			null,
			[
				getItem("Pengguna", "/adm/pengguna", null),
				{ type: "group" },
				getItem("Akun Bank", "/adm/bank-account", null),
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
			"/adm/pembayaran",
			null,
			[
				getItem("Pembayaran Renter", "/adm/renter-payment", null),
				{ type: "group" },
				getItem("Pembayaran Owner", "/adm/owner-payment", null),
			],
			"group"
		),
	];

	const [currAdmin, setCurrAdmin] = useState("/adm/dashboard");
	const [currOwner, setCurrOwner] = useState("/list-produk");

	const onClickAdmin: MenuProps["onClick"] = (e) => {
		setCurrAdmin(e.key);
	};
	const onClickOwner: MenuProps["onClick"] = (e) => {
		setCurrOwner(e.key);
	};

	return (
		<Layout style={{ height: "100%" }}>
			
			{role == "renter" ? 
			<>
			</> : (<>
			{!window.location.pathname.includes("/create-product") &&(
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
				{role == "admin" ? 
				<Menu
					onClick={onClickAdmin}
					mode="inline"
					style={{ width: 298, borderRight: 0 }}
					defaultOpenKeys={["/adm/dashboard"]}
					selectedKeys={[currAdmin]}
					items= {itemAdmin}
					className="sidebar flex flex-col gap-1 justify-center px-8"
				/>
				: 
				<Menu
					onClick={onClickOwner}
					mode="inline"
					style={{ width: 298, borderRight: 0 }}
					defaultOpenKeys={["/list-produk"]}
					selectedKeys={[currOwner]}
					items= {itemOwner}
					className="sidebar flex flex-col gap-1 justify-center px-8"
				/>}
				<a
					href="#"
					className="text-slate-600 text-2xl font-bold flex gap-4 justify-center items-center hover:text-primary absolute left-[25%] bottom-16"
				>
					<LogoutOutlined />
					<p>Logout</p>
				</a>
			</Sider>
			)}
			</>)}	
			<Layout>
				<Header style={{ background: colorBgContainer }}>
					<Menu
						mode="horizontal"
						defaultSelectedKeys={[]}
						style={{ borderBottomWidth: '2px' }}
						className={
							"absolute border-slate-200 left-[300px] w-[calc(100%-300px)] py-[12px] pr-[100px] gap-10 justify-end items-center"
						}
					>
						<div className="flex gap-6 items-center">
							{role == "admin" ? (
								<>
									<Notifications />
								</>
							):(
								<>
									<Chats />
									<Notifications />
								</>
							)}
						</div>
						<div className="flex items-center gap-8">
							<p className="text-xl font-bold -mr-4">Halo, Maulana</p>
							<Photo />
						</div>
					</Menu>
				</Header>
				<Content
					style={{ margin: "10px 0 0 0" }}
					className="text-slate-800 bg-white"
				>
					<div
						style={{
							padding: "40px 150px 0 150px",
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
