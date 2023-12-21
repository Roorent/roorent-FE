import { LOGO } from '#/constants/images';
import { Steps } from 'antd';
import { useState } from 'react';
import { Form } from 'antd';
import { Register } from '#/types/typeRegis';
import Regis from '#/components/auth/img_regis';
import { Button, message } from 'antd/lib/index';
import RenterStep1 from './step1_renter';
import RenterStep2 from './step2_renter';
import { useRouter } from 'next/navigation';
import { authRepository } from '#/repository/auth';

function RegisRenter() {
	const router = useRouter();
	const [data, setData] = useState<Register>({
		level: "",
		first_name: "",
		last_name: "",
		phone: "",
		birth_date: "",
		gender: "",
		nik: "",
		photo_ktp: "",
		email: "",
		password: "",
	});

  const [formStep1] = Form.useForm();
  const [formStep2] = Form.useForm();

	const steps = [
		{
			title: "Biodata",
			content: (
				<RenterStep1
					setData={setData}
					data={data}
					formStep1={formStep1}
				/>
			),
		},
		{
			title: "Akun",
			content: (
				<RenterStep2
					setData={setData}
					data={data}
					formStep2={formStep2}
				/>
			),
		},
	];

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

	const items = steps.map((item) => ({ key: item.title, title: item.title }));
	const onFinish = async () => {
		const role = "renter";
		const dataRenter = {
			first_name: data?.first_name,
			last_name: data?.last_name,
			phone: "+62" + data?.phone,
			birth_date: data?.birth_date,
			gender: data?.gender,
			email: data?.email,
			password: data?.password,
			nik: data?.nik,
		};
		await authRepository.manipulatedata.register(dataRenter, role);

    setTimeout(message.success('Anda Telah Berhasil Registrasi!'), 5000);
    router.push('/auth/login');
  };

	return (
		<div className="w-full min-h-screen flex justify-center relative">
			<div className="w-1/2 relative">
				<div className="h-full flex items-center justify-center">
					<Regis />
				</div>
				<div className="w-full h-full bg-primary blur-[2px] top-0 right-0 absolute -z-50"></div>
			</div>
			<div className="w-1/2 flex justify-center min-h-screen relative">
				<div className="w-[653px] py-5">
					<div className="mb-[50px] flex justify-end">
						<LOGO />
					</div>
					<div className="text-teks text-4xl font-bold flex justify-center mb-[45px]">
						<p>Daftar Akun Penyewa</p>
					</div>
					<Steps current={current} items={items} className="mb-[33px]" />
					<div>{steps[current].content}</div>
					<div style={{ marginTop: 34 }} className="flex justify-between">
						<div className="regis">
							{current > 0 && (
								<Button
									style={{ margin: "0 8px" }}
									onClick={() => prev()}
									className="regis rounded-[20px] px-8 py-2.5 text-xl font-bold h-max"
								>
									Kembali
								</Button>
							)}
						</div>
						<div></div>
						<div className="regis">
							{current < steps.length - 1 && (
								<Button
									type="primary"
									htmlType="submit"
									onClick={() => {
										next();
									}}
									className="regis bg-primary rounded-[20px] px-8 py-2.5 text-xl font-bold h-max"
								>
									Lanjut
								</Button>
							)}
						</div>
					</div>
					<div className="regis">
						{current === steps.length - 1 && (
							<Button
								type="primary"
								htmlType="submit"
								disabled={
									data.first_name.length <= 1 ||
									data.last_name.length <= 1 ||
									data.phone.length <= 1 ||
									typeof data.birth_date !== "object" ||
									data.gender.length <= 1 ||
									data.email.length <= 1 ||
									data.password.length <= 1
								}
								onClick={onFinish}
								className="bg-primary rounded-[20px] px-8 py-2.5 text-xl font-bold regis w-full mt-[38px] h-max regis"
							>
								Daftar
							</Button>
						)}
					</div>
					<div className="text-teks text-xl absolute bottom-10">
						<p>
							Sudah punya akun?
							<a
								href="/auth/login"
								className="font-bold no-underline hover:underline"
							>
								Masuk disini!
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
export default RegisRenter;
