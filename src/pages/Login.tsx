import {Button, Col, Form, Input, Layout, message, Row} from "antd";
import {Comm} from "../utils/Comm";

interface LoginProps {
    setToken: (value: string) => void;
}

export function Login(props: LoginProps) {

    async function finishHandler(values: any) {
        console.log("Finish Handler Start");

        let resp = await Comm.postAPIData("login", {"username": values.username, "password": values.password});

        console.log("Called Post with result: " + JSON.stringify(resp));

        if (resp.status === "completed") {
            console.log("token - " + resp.token);
            props.setToken(resp.token);
            message.info('Login Successful').then(r => {
            });

        } else {
            //Please try again sequence
            message.info('Wrong Credentials. Please try again.').then(r => {
            });
        }


    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Layout>

            <Form
                name="basic"
                onFinish={(values) => {
                    finishHandler(values).then(r => {
                    })
                }}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{paddingTop: 25, width: "50%", alignSelf: "center"}}

            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>


                <Form.Item>
                    <Row>
                        <Col>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Col>
                    </Row>

                </Form.Item>
            </Form>

        </Layout>
    )
}