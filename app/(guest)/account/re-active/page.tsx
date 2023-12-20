"use client";
import Regis from "#/components/auth/img_regis";
import Logo from "#/components/Logo/logo";
import {
	CameraOutlined,
	EyeInvisibleOutlined,
	EyeTwoTone,
	WarningFilled,
} from "@ant-design/icons";
import { Button, Upload } from "antd";
import { Form, Input } from "antd/lib/index";
import React from "react";

function ReactiveAccount() {
	return (
		<div className="w-full min-h-screen flex justify-center relative">
			<div className="w-1/2 flex justify-center min-h-screen relative">
				<div className="w-[653px] py-5">
					<div className="mb-[50px]">
						<Logo />
					</div>
					<div className="text-teks text-4xl font-bold flex justify-center mb-[45px]">
						<p>Aktivasi Akun Kembali Pemilik</p>
					</div>
					<div>
						<Form>
							<div className="flex gap-x-5 grid-cols-1">
								<div className="w-1/2 grid gap-y-4 grid-cols-1">
									<div>
										<p className="text-teks text-2xl font-bold">Nama Depan</p>
									</div>
									<div className="w-full">
										<Form.Item
											name="first_name"
											rules={[
												{
													required: true,
													message: "Harap masukan nama depan anda!",
												},
											]}
										>
											<Input
												size="large"
												placeholder="Masukan nama depan"
												className=" p-[10px] rounded-[10px] border border-rstroke regis text-xl"
											/>
										</Form.Item>
									</div>
								</div>
								<div className="w-1/2 grid gap-y-4 grid-cols-1">
									<div>
										<p className="text-teks text-2xl font-bold">
											Nama Belakang
										</p>
									</div>
									<div className="w-full">
										<Form.Item
											name="last_name"
											rules={[
												{
													required: true,
													message: "Harap masukan nama belakang anda!",
												},
											]}
										>
											<Input
												size="large"
												placeholder="Masukan nama belakang"
												className=" p-[10px] rounded-[10px] border border-rstroke regis text-xl"
											/>
										</Form.Item>
									</div>
								</div>
							</div>
							<div className="grid gap-y-4 grid-cols-1">
								<div>
									<p className="text-teks text-2xl font-bold">Foto</p>
									<p className="text-teks text-md">
										<WarningFilled className="text-[#FFCC00] text-xl pr-2" />
										Foto diri dengan KTP
									</p>
								</div>
								<div className="w-full btn-upload">
									<Form.Item
										name="photo_ktp"
										rules={[{ required: true, message: "Harap masukan foto!" }]}
									>
										<Upload
											className="w-full"
											action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
											listType="picture"
											maxCount={1}
										>
											<Button className=" p-[10px] rounded-[10px] border border-rstroke text-xl h-max w-full btn-upload border-dashed border">
												<div className="p-5">
													<div>
														<CameraOutlined className="text-5xl mb-3" />
													</div>
													<div>Upload di sini</div>
												</div>
											</Button>
										</Upload>
									</Form.Item>
								</div>
							</div>
							<div className="grid gap-y-4 grid-cols-1">
								<div>
									<p className="text-teks text-2xl font-bold">Email</p>
								</div>
								<div className="w-full">
									<Form.Item
										name="email"
										rules={[
											{ required: true, message: "Harap masukan email anda!" },
										]}
									>
										<Input
											size="large"
											placeholder="Masukan email"
											className=" p-[10px] rounded-[10px] border border-rstroke regis text-xl"
										/>
									</Form.Item>
								</div>
							</div>
							<div className="flex gap-x-5 grid-cols-1">
								<div className="w-1/2 grid gap-y-4 grid-cols-1">
									<div>
										<p className="text-teks text-2xl font-bold">Password</p>
									</div>
									<div className="w-full">
										<Form.Item
											name="password"
											rules={[
												{
													required: true,
													message: "Harap masukan password anda!",
												},
											]}
										>
											<Input.Password
												size="large"
												placeholder="Masukan Password"
												className="p-[10px] rounded-[10px] border border-rstroke regis text-xl"
												iconRender={(visible) =>
													visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
												}
											/>
										</Form.Item>
									</div>
								</div>
								<div className="w-1/2 grid gap-y-4 grid-cols-1">
									<div>
										<p className="text-teks text-2xl font-bold">
											Konfirmasi Password
										</p>
									</div>
									<div className="w-full">
										<Form.Item
											name="confirm"
											dependencies={["password"]}
											hasFeedback
											rules={[
												{
													required: true,
													message: "Harap konfirmasi password anda!",
												},
												({ getFieldValue }) => ({
													validator(_, value) {
														if (!value || getFieldValue("password") === value) {
															return Promise.resolve();
														}
														return Promise.reject(
															new Error(
																"Kata sandi baru yang Anda masukkan tidak cocok!"
															)
														);
													},
												}),
											]}
										>
											<Input.Password
												size="large"
												placeholder="Masukan Kembali Password"
												className="p-[10px] rounded-[10px] border border-rstroke regis text-xl"
												iconRender={(visible) =>
													visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
												}
											/>
										</Form.Item>
									</div>
								</div>
							</div>
							<div className="w-full mt-10 regis">
								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										block
										className="regis bg-primary rounded-[20px] px-8 py-2.5 text-xl font-bold h-max"
									>
										Selesai
									</Button>
								</Form.Item>
							</div>
						</Form>
					</div>
				</div>
			</div>
			<div className="w-1/2 relative">
				<div className="h-full flex items-center justify-center">
					<Regis />
				</div>
				<div className="w-full h-full bg-primary blur-[2px] top-0 right-0 absolute -z-50"></div>
			</div>
		</div>
	);
}

export default ReactiveAccount;
