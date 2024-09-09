import useLogin from "@/hooks/useLogin";
import { UserInfo } from "@/models/base.model";
import type { FormInstance } from "antd";
import { Button, Checkbox, Col, Form, Input, message, Row } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useRef, useState } from "react";

const Login = () => {
  const formRef = useRef<FormInstance>();
  const [loading, setLoading] = useState(false);
  const { remember, changeRemember, login } = useLogin();


  const handleLogin = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result = (await formRef.current.validateFields()) as UserInfo;
      login(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (typeof error === "string") {
        message.error(error);
      } else {
        message.error("请输入正确的用户名和密码");
      }
    }
  };

  const handleRememberChange = (e: CheckboxChangeEvent) => {
    changeRemember(e.target.checked);
  };

  return (
    <div
      className="full-height flex"
      style={{
        backgroundImage: "linear-gradient(0deg, #fff, var(--primary))",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "12px",
        }}
      >
        <h1 className="primary-text">欢迎来给小元宝取名字</h1>
        <div className="login-form">
          <Form ref={formRef} labelCol={{ sm: { span: 6 } }}>
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <label htmlFor="remember">
              <Row>
                <Col span={6}>记住密码：</Col>
                <Col span={16}>
                  <Checkbox
                    checked={remember}
                    onChange={handleRememberChange}
                    id="remember"
                  />
                </Col>
              </Row>
            </label>
          </Form>
          <Button
            onClick={handleLogin}
            style={{ marginTop: 12, width: "100%", marginBottom: 36 }}
            type="primary"
            loading={loading}
          >
            登录
          </Button>
        </div>
        {/* <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form> */}
      </div>
    </div>
  );
};

export default Login;
