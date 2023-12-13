"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function Home() {
	const router = useRouter();

	useEffect(() => {
		if (router) {
			router.push("/auth/login");
		}
	}, [router]);

	return <div style={{}}></div>;
}

export default Home;
