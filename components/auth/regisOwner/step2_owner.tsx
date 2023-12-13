import { Data } from "#/types/typeRegis";
import { CameraOutlined, WarningFilled } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import { FormInstance } from "antd/lib";

type Props = {
	setData: any;
	dataInput: Data;
	formStep2: FormInstance<any>
}

// const handleChange = async (args){
//   try {
//     const data = {File};
//     const processUpload = await 
//   } catch (err) {
    
//   }
// }

function OwnerStep2({setData, dataInput, formStep2}: Props){
  
    return(
    <Form name="step2Owner" form={formStep2}>
	  <div>
        <div className="grid gap-y-4 grid-cols-1">
            <div>
                <p className="text-teks text-2xl font-bold">No. NIK</p>
                <p className="text-teks text-md"><WarningFilled className="text-[#FFCC00] text-xl pr-2"/>Pastikan anda memasukan No.NIK dengan benar</p>
            </div>
            <div className="w-full">
            <Form.Item
                name="nik"
                rules={[{ required: true, message: 'Harap masukan No.NIK!' }]}
            >
                <Input onChange={(e) => {
                  setData({ ...dataInput, nik: e.target.value })}}
                  size="large" placeholder="Masukan no nik" maxLength={16} className=" p-[10px] rounded-[10px] border border-rstroke regis text-xl" />
            </Form.Item>
            </div>
        </div>
        <div className="grid gap-y-4 grid-cols-1">
            <div>
                <p className="text-teks text-2xl font-bold">Foto</p>
                <p className="text-teks text-md"><WarningFilled className="text-[#FFCC00] text-xl pr-2"/>Foto diri dengan KTP</p>
            </div>
            <div className="w-full btn-upload">
            <Form.Item
                name="photo_ktp"
                rules={[{ required: true, message: 'Harap masukan foto!' }]}
            >
              <Upload
              className="w-full"
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture"
                  maxCount={1}
                  
                >
                  <Button className=" p-[10px] rounded-[10px] border border-rstroke text-xl h-max w-full btn-upload border-dashed border">
                    <div className="p-5">
                      <div><CameraOutlined className="text-5xl mb-3"/></div>
                      <div>Upload di sini</div>
                    </div>
                  </Button>
              </Upload>
            </Form.Item>
            </div>
        </div>
      </div>
    </Form>
    )
}
export default OwnerStep2