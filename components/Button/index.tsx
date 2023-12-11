import React from "react";

function Button({ className, children, ...props }: any) {
	const customStyle = `bg-primary p-[2px] mt-6 text-white text-lg rounded-lg flex justify-center items-center ${className}`;

	return (
		<a className={customStyle} {...props}>
			<div>{children}</div>
		</a>
	);
}

export default Button;
