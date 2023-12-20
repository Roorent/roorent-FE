import { Register } from "#/types/typeRegis";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Form, Input } from "antd";
import { FormInstance } from "antd/lib";

type Props = {
	setData: any;
	data: Register;
	formStep3: FormInstance<any>
}

function OwnerStep3({setData, data, formStep3}: Props){
    return(
    <Form name="step3Owner" form={formStep3}>
    <div>
		<div className="grid gap-y-4 grid-cols-1">
			<div>
				<p className="text-teks text-2xl font-bold">Email</p>
			</div>
			<div className="w-full">
			<Form.Item
				name="email"
				rules={[{ required: true, message: 'Harap masukan email anda!' }]}
			>
				<Input onChange={(e) => {
                    setData({ ...data, email: e.target.value })}}
                    size="large" placeholder="Masukan email" className=" p-[10px] rounded-[10px] border border-rstroke regis text-xl" />
			</Form.Item>
			</div>
		</div>
        <div className="grid gap-y-4 grid-cols-1">
            <div>
				<p className="text-teks text-2xl font-bold">Password</p>
			</div>
            <div className="w-full">
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Harap masukan password anda!' }]}
            >
                <Input.Password onChange={(e) => {
                    setData({ ...data, password: e.target.value })}} size="large" placeholder="Masukan Password" className="p-[10px] rounded-[10px] border border-rstroke regis text-xl"
                    iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}/>
            </Form.Item>
            </div>
        </div>
        <div className="grid gap-y-4 grid-cols-1">
            <div>
				<p className="text-teks text-2xl font-bold">Konfirmasi Password</p>
			</div>
            <div className="w-full">
            <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true, message: 'Harap konfirmasi password anda!'},
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('Kata sandi baru yang Anda masukkan tidak cocok!'));
                    },
                }),
                ]}
            >
                <Input.Password size="large" placeholder="Masukan Kembali Password" className="p-[10px] rounded-[10px] border border-rstroke regis text-xl"
                iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}/>
            </Form.Item>
            </div>
        </div>
    </div>
    </Form>
    )
}
export default OwnerStep3