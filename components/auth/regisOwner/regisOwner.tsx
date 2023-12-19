import React, { useState } from "react";
import Logo from "#/components/logo/logo";
import { Steps } from "antd";
import { Form } from "antd";
import OwnerStep1 from "#/components/auth/regisOwner/step1_owner";
import OwnerStep2 from "#/components/auth/regisOwner/step2_owner";
import OwnerStep3 from "#/components/auth/regisOwner/step3_owner";
import { Register } from "#/types/typeRegis";
import Regis from "#/components/auth/img_regis";
import { Button, message } from "antd/lib/index";

function RegisOwner() {
  const [dataInput, setData] = useState<Register>({
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
  const [formStep3] = Form.useForm();

  const steps = [
    {
      title: "Biodata",
      content: (
        <OwnerStep1
          setData={setData}
          dataInput={dataInput}
          formStep1={formStep1}
        />
      ),
    },
    {
      title: "Veifikasi",
      content: (
        <OwnerStep2
          setData={setData}
          dataInput={dataInput}
          formStep2={formStep2}
        />
      ),
    },
    {
      title: "Akun",
      content: (
        <OwnerStep3
          setData={setData}
          dataInput={dataInput}
          formStep3={formStep3}
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

  return (
    <div className="w-full min-h-screen flex justify-center relative">
      <div className="w-1/2 flex justify-center min-h-screen relative">
        <div className="w-[653px] py-5">
          <div className="mb-[50px]">
            <Logo />
          </div>
          <div className="text-teks text-4xl font-bold flex justify-center mb-[45px]">
            <p>Daftar Akun Pemilik</p>
          </div>
          <Steps current={current} items={items} className="mb-[33px]" />
          <div>{steps[current].content}</div>
          <div style={{ marginTop: 34 }} className="flex justify-between">
            <div className="regis-prev">
              {current > 0 && (
                <Button
                  style={{ margin: "0 8px" }}
                  onClick={() => prev()}
                  className="regis-prev rounded-[20px] px-8 py-2.5 text-xl font-bold h-max"
                >
                  Kembali
                </Button>
              )}
            </div>
            <div></div>
            <div className="regis-next">
              {current < steps.length - 1 && (
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    next();
                  }}
                  className="regis-next bg-primary rounded-[20px] px-8 py-2.5 text-xl font-bold h-max"
                >
                  Lanjut
                </Button>
              )}
            </div>
          </div>
          <div className="">
            {current === steps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                    dataInput.first_name.length <= 1 ||
                    dataInput.last_name.length <= 1 ||
                    dataInput.phone.length <= 1 ||
                    typeof dataInput.birth_date !== "object" || 
                    dataInput.gender.length <= 1||
                    dataInput.nik.length <= 1||
                    dataInput.photo_ktp.length <= 1||
                    dataInput.email.length <= 1 ||
                    dataInput.password.length <= 1
                }
                onClick={() => message.success('Anda Telah Berhasil Registrasi!')}
                className="bg-primary rounded-[20px] px-8 py-2.5 text-xl font-bold regis w-full mt-[38px] h-max"
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
      <div className="w-1/2 relative">
        <div className="h-full flex items-center justify-center">
          <Regis />
        </div>
        <div className="w-full h-full bg-primary blur-[2px] top-0 right-0 absolute -z-50"></div>
      </div>
    </div>
  );
}

export default RegisOwner;
