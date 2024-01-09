import React from 'react';

function Button({ className, children, ...props }: any) {
  const customStyle = `w-full bg-primary p-[8px] mt-6 text-white text-lg rounded-lg flex justify-center items-center cursor-pointer hover:bg-rhover1 hover:text-white ${className} `;

  return (
    <a className={customStyle} {...props}>
      <div>{children}</div>
    </a>
  );
}

export default Button;
