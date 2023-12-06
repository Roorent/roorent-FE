"use client";

import Regis from "#/components/auth/img_regis";
import { MASCOT_OWNER, MASCOT_RENTER } from "#/constants/images";
import { Button, message } from "antd";
import { Steps } from "antd/lib/index";
import React, { useEffect, useState } from "react";

const steps = [
	{
	  title: 'Biodata',
	  content: 'Biodata-content'
	},
	{
	  title: 'Veifikasi',
	  content: 'Veifikasi-content',
	},
	{
	  title: 'Akun',
	  content: 'Akun-content',
	},
];

function Register() {
	useEffect(() => {
		document.title = "Register - Roorent";
	}, []);
	
	const [current, setCurrent] = useState(0);

	const next = () => {
	  setCurrent(current + 1);
	};
  
	const prev = () => {
	  setCurrent(current - 1);
	};
  
	const items = steps.map((item) => ({ key: item.title, title: item.title }));

	return (
	<div className="w-full h-full">
		<div className="w-full h-full fixed bg-white flex ">
			<div className="w-1/2 relative flex justify-center">
				<div className="w-[653px]">
					<Steps current={current} items={items} />
					<div>{steps[current].content}</div>
					<div style={{ marginTop: 24 }}>
						{current < steps.length - 1 && (
						<Button type="primary" onClick={() => next()} className="bg-primary">
							Next
						</Button>
						)}
						{current === steps.length - 1 && (
						<Button type="primary" onClick={() => message.success('Anda Telah Berhasil Registrasi!')} className="bg-primary">
							Done
						</Button>
						)}
						{current > 0 && (
						<Button style={{ margin: '0 8px' }} onClick={() => prev()} >
							Previous
						</Button>
						)}
					</div>
				</div>
			</div>
			<div className="w-1/2 relative">
				<div className="h-full flex items-center justify-center">
					<Regis/>
				</div>
				<div className="w-full h-full bg-primary blur-[2px] top-0 right-0 absolute -z-50"></div>
			</div>
		</div>
	</div>



		// <div className="flex">
		// 	<div className="w-1/2 h-[100vh] bg-blue-400 rounded-e-[30%]">
		// 		<div className="">
		// 			<img src={MASCOT_OWNER} alt="Mascot Owner" />
		// 			<img src={MASCOT_RENTER} alt="Mascot Renter" />
		// 		</div>
		// 	</div>
		// 	<div className="w-1/2 h-[100vh] bg-red-400 rounded-s-[30%]">right</div>
		// </div>
	);
}

export default Register;
