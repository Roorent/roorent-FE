"use client";

import React, {useEffect, useState} from "react";
// import {observer} from 'mobx-react-lite';
import {Button, Card, Checkbox, Col, Form, Input, Row, Typography} from 'antd';
import {LockOutlined, MailOutlined} from '@ant-design/icons';
import {LOGIN} from "#/constants/images";
import Logo from "#/components/logo/logo";
// import ParticlesLayout from "../components/Layout/ParticlesLayout";

const Login = () => {
    useEffect(() => {
		document.title = "Login - Roorent";
	}, []);
    // const store = useStore();
    const [loading, setLoading] = useState(false);

    // let history = useHistory();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        enterLoading(values).then(res => {
            console.log(res, "awasaa");
        }).catch((error) => {
            console.log({error}, "awasaa error");
        });
    };

    const enterLoading = async (props: any) => {
        // store.setInitialToken("ayayay", "clap");
        // return history.push("/app/page_example_1");
    };

    return (
    <div className="w-full h-full">
    <div className="w-full h-full fixed bg-white flex justify-between"> 
        <div className="w-1/2 relative">
            <div className="px-28 py-48 w-[800px]">
                <div className="w-full">
                    <Form name="login" className="login">
                    <div className="flex flex-col space-y-5 w-full">
                        <div className="text-white text-5xl font-bold"><p>Masuk</p></div>
                        <div className="text-white text-xl">
                            <p className="mb-2">Jika kamu belum memiliki akun</p> 
                            <p>kamu bisa <a href="#" className="font-bold no-underline hover:underline">Daftar disini!</a></p>
                        </div>
                        <div>
                            <p className="text-white text-3xl font-bold pb-3">Email</p>
                            <div className="w-full">
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Harap Masukan Email Anda!' }]}
                            >
                                <Input size="large" placeholder="Masukan Email" prefix={<MailOutlined 
                                className="text-white text-3xl mr-5"/>} className=" p-[10px] bg-white bg-opacity-20 rounded-[10px] border border-white border-opacity-30 input-login text-xl" />
                            </Form.Item>
                            </div>
                        </div>
                        <div>
                            <p className="text-white text-3xl font-bold pb-3">Password</p>
                            <div className="w-full">
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Harap Masukan Password Anda!' }]}
                            >
                                <Input.Password size="large" placeholder="Masukan Password" prefix={<LockOutlined 
                                className="text-white text-3xl mr-5"/>} className=" p-[10px] bg-white bg-opacity-20 rounded-[10px] border border-white border-opacity-30 input-login text-xl" />
                            </Form.Item>
                            </div>
                        </div>
                        <div className="text-white text-xl font-bold">
                            <a href="#" className="font-bold no-underline hover:underline">Aktifkan akun kembali!</a>
                        </div>
                    </div>
                    <div className="w-full mt-10">
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block className="bg-tranparant border border-white rounded-full text-2xl font-bold py-3">
                            Masuk
                        </Button>
                    </Form.Item>
                    </div>
                    </Form>
                </div>
            </div>
            <div className="w-[1258px] h-[1258px] bg-primary rounded-e-full -my-32 -ml-72 blur-[2px] absolute top-0 left-0  -z-50"></div>
        </div>
        <div className="w-1/2 relative grid justify-items-stretch">
            <div className="justify-self-end p-8">
                <Logo/>
            </div>
            <div className="grid justify-items-center">
                <img src={LOGIN} alt="Mascot Login" />
            </div>
        </div>
    </div>
    </div>)
    // <div style={{width: '100vw', display: 'flex', justifyContent: 'center'}}>
    //     <Row justify={'center'}>
    //         <Col>
    //             <div style={{
    //                 display: 'flex',
    //                 justifyContent: 'flex-start',
    //                 marginTop: '5vh',
    //                 flexDirection: 'column',
    //                 alignItems: 'center',
    //             }}>
    //                 <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
    //                     <Typography.Paragraph
    //                         style={{
    //                             margin: 0,
    //                             padding: 0,
    //                             fontSize: 20,
    //                             marginLeft: 5,
    //                             fontWeight: 600,
    //                             color: "#413d3e",
    //                         }}
    //                     >
    //                         Boilerplate
    //                     </Typography.Paragraph>
    //                 </div>
    //                 <Card
    //                     style={{width: 320, textAlign: 'center'}}
    //                     headStyle={{fontSize: 13, fontWeight: 200}}
    //                     className={"shadow"}
    //                     bordered={true}
    //                     title={'Sign in to your account'}
    //                 >
    //                     <Form
    //                         layout={'vertical'}
    //                         name="normal_login"
    //                         className="login-form"
    //                         onFinish={onFinish}
    //                     >
    //                         <Form.Item
    //                             label="Email"
    //                             name="email"
    //                             // size={'large'}
    //                             rules={[{required: false, message: 'Please input your Username!'}]}
    //                         >
    //                             <Input
    //                                 prefix={<UserOutlined className="site-form-item-icon"/>}
    //                                 type="text"
    //                                 placeholder="Email"/>
    //                         </Form.Item>

    //                         <Form.Item
    //                             style={{
    //                                 marginBottom: 0,
    //                             }}
    //                             label="Password"
    //                             name="password"
    //                             // size={'large'}
    //                             rules={[{required: false, message: 'Please input your Password!'}]}
    //                         >
    //                             <Input.Password
    //                                 prefix={<LockOutlined className="site-form-item-icon"/>}
    //                                 type="password"
    //                                 placeholder="Password"
    //                             />
    //                         </Form.Item>
    //                         <Form.Item
    //                             style={{
    //                                 marginTop: 0,
    //                                 marginBottom: 20,
    //                                 padding: 0
    //                             }}
    //                             // label="Password"
    //                             name="forgot-password"
    //                             // size={'small'}
    //                             rules={[{required: false, message: 'Please input your Password!'}]}
    //                         >
    //                             <a className="login-form-forgot" href="">
    //                                 Forgot password
    //                             </a>
    //                         </Form.Item>

    //                         <Form.Item
    //                             style={{
    //                                 marginBottom: 5,
    //                                 textAlign: 'left'
    //                             }}>
    //                             <Form.Item name="remember" valuePropName="checked" noStyle>
    //                                 <Checkbox>Remember me</Checkbox>
    //                             </Form.Item>
    //                         </Form.Item>

    //                         <Form.Item
    //                             style={{
    //                                 marginBottom: 0,
    //                             }}>
    //                             <Button type="primary"
    //                                     block
    //                                     loading={loading}
    //                                     htmlType="submit"
    //                                     size={'large'}
    //                                     onSubmit={enterLoading}
    //                                     className="login-form-button">
    //                                 Sign In
    //                             </Button>
    //                         </Form.Item>
    //                     </Form>
    //                 </Card>
    //             </div>
    //         </Col>
    //     </Row>

    // </div>;
};

export default Login;
