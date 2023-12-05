"use client";

import { MASCOT_OWNER, MASCOT_RENTER } from "#/constants/images";
import React, { useEffect } from "react";

function Register() {
	useEffect(() => {
		document.title = "Register";
	}, []);

	return (
		<div className="flex">
			<div className="w-1/2 h-[100vh] bg-blue-400 rounded-e-[30%]">
				<div className="">
					<img src={MASCOT_OWNER} alt="Mascot Owner" />
					<img src={MASCOT_RENTER} alt="Mascot Renter" />
				</div>
			</div>
			<div className="w-1/2 h-[100vh] bg-red-400 rounded-s-[30%]">right</div>
		</div>
	);
}

export default Register;
