"use client";

import React, { useEffect } from "react";
import { Button, Card } from "antd";
import { store } from "#/store";
import { sampleRepository } from "#/repository/sample";

const Dashboard = () => {
	useEffect(() => {
		document.title = "Dashboard";
	}, []);
	// const { data, error, isLoading } = sampleRepository.hooks.useUsers();
	return (
		<div>
			<div>home: {store.ui.title}</div>
			{/* <div>fact: {data?.setup}</div> */}
			{/* <div>fact: {data?.setup}</div> */}
			<Button
				className={"ml-8"}
				onClick={() => {
					store.ui.changeTitle("from home");
				}}
			>
				change title
			</Button>
		</div>
	);
};

export default Dashboard;
