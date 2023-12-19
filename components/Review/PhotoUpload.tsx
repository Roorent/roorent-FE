"use client";

import React, { useState } from "react";
import { UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import { Upload, UploadFile } from "antd/lib";

function PhotoUpload({ files }: any) {
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
		setFileList(newFileList);
		files(newFileList);
	};

	const onPreview = async (file: UploadFile) => {
		let src = file.url as string;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj as RcFile);
				reader.onload = () => resolve(reader.result as string);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};

	return (
		<Upload
			action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
			listType="picture-card"
			fileList={fileList}
			multiple={true}
			maxCount={5}
			onChange={onChange}
			onPreview={onPreview}
		>
			{fileList.length < 5 && "+ Upload"}
		</Upload>
	);
}

export default PhotoUpload;
