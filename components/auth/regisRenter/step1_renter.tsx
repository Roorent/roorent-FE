import { DatePicker, Select } from "antd/lib/index";
import { Option } from "antd/es/mentions";
import { Form, Input } from "antd/lib/index";
import { FormInstance, message } from "antd";
import { Data } from "#/types/typeRegis";
import moment from "moment";
import { WarningFilled } from "@ant-design/icons";

type Props = {
	setData: any;
	dataInput: Data;
	formStep1: FormInstance<any>;
};

function RenterStep1({ setData, dataInput, formStep1 }: Props) {
	const date = dataInput.birth_date;
	const dateDefault = moment("2023-12-12");
	return (
		<Form name="step1Renter" form={formStep1}>
			<div>
				<div className="grid gap-y-4 grid-cols-1">
					<div>
						<p className="text-teks text-2xl font-bold">Nama Depan</p>
					</div>
					<div className="w-full">
						<Form.Item
							name="first_name"
							rules={[
								{ required: true, message: "Harap masukan nama depan anda!" },
							]}
						>
							<Input
								onChange={(e) => {
									setData({ ...dataInput, first_name: e.target.value });
								}}
								size="large"
								placeholder="Masukan nama depan"
								className=" p-[10px] rounded-[10px] border border-rstroke regis text-xl"
							/>
						</Form.Item>
					</div>
				</div>
				<div className="grid gap-y-4 grid-cols-1">
					<div>
						<p className="text-teks text-2xl font-bold">Nama Belakang</p>
					</div>
					<div className="w-full regis">
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
								onChange={(e) => {
									setData({ ...dataInput, last_name: e.target.value });
								}}
								size="large"
								placeholder="Masukan nama belakang"
								className=" p-[10px] rounded-[10px] border border-rstroke regis text-xl"
							/>
						</Form.Item>
					</div>
				</div>
				<div className="grid gap-y-4 grid-cols-1">
					<div>
						<p className="text-teks text-2xl font-bold">No. NIK</p>
						<p className="text-teks text-md">
							<WarningFilled className="text-[#FFCC00] text-xl pr-2" />
							Pastikan anda memasukan No.NIK dengan benar
						</p>
					</div>
					<div className="w-full">
						<Form.Item
							name="nik"
							rules={[{ required: true, message: "Harap masukan No.NIK!" }]}
						>
							<Input
								onChange={(e) => {
									setData({ ...dataInput, nik: e.target.value });
								}}
								size="large"
								placeholder="Masukan no nik"
								maxLength={16}
								className=" p-[10px] rounded-[10px] border border-rstroke regis text-xl"
							/>
						</Form.Item>
					</div>
				</div>
				<div className="grid gap-y-4 grid-cols-1">
					<div>
						<p className="text-teks text-2xl font-bold">No. Hp</p>
					</div>
					<div className="w-full">
						<Form.Item
							name="no_phone"
							rules={[
								{
									required: true,
									message: "Harap masukan nama belakang anda!",
								},
							]}
						>
							<Input
								onChange={(e) => {
									setData({ ...dataInput, no_phone: e.target.value });
								}}
								addonBefore="+62"
								placeholder="Masukan nomor telepon"
								maxLength={14}
								className="regis"
							/>
						</Form.Item>
					</div>
				</div>
				<div className="flex gap-x-5 grid-cols-1">
					<div className="w-1/2 grid gap-y-4 grid-cols-1">
						<div>
							<p className="text-teks text-2xl font-bold">Tanggal Lahir</p>
						</div>
						<div className="w-full">
							<Form.Item
								name="birth_date"
								rules={[
									{
										required: true,
										message: "Harap masukan tanggal lahir anda!",
									},
								]}
							>
								<DatePicker
									onChange={(e: any) => {
										setData({ ...dataInput, birth_date: e?.$d });
										console.log(e);
									}}
									placeholder="Pilih tanggal"
									className="w-full regis"
								/>
							</Form.Item>
						</div>
					</div>
					<div className="w-1/2 grid gap-y-4 grid-cols-1">
						<div>
							<p className="text-teks text-2xl font-bold">Jenis Kelamin</p>
						</div>
						<div className="w-full">
							<Form.Item
								name="gender"
								rules={[
									{
										required: true,
										message: "Harap masukan nama belakang anda!",
									},
								]}
							>
								<Select
									onChange={(e) => {
										setData({ ...dataInput, gender: e });
									}}
									placeholder="Pilih jenis kelamin"
									className="w-full regis"
								>
									<Option value="pria">Pria</Option>
									<Option value="wanita">Wanita</Option>
								</Select>
							</Form.Item>
						</div>
					</div>
				</div>
			</div>
		</Form>
	);
}
export default RenterStep1;
