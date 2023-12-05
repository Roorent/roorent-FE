"use client";

import React from "react";
import { Button } from "antd";
import { store } from "#/store";

const About = () => {
	return (
		<div>
			about: {store.ui.title}
			<Button
				onClick={() => {
					store.ui.changeTitle("from about");
				}}
			>
				change title
			</Button>
		</div>
	);
};

export default About;
