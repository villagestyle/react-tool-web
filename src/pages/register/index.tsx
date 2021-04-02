import React, { useRef, useState } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Weaper } from "./index.style";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import userAPI from "src/api/user";
import { CellPhoneValidator, Config, uuid, PasswordValidator } from "src/utils";
import { Link } from "react-router-dom";

const Register = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const validateToken = useRef(uuid());
  const [picCodeUrl, setPicCodeUrl] = useState<string>("");

  const picCode = () => {
    userAPI.captcha(validateToken.current).then(ret => {
      const blob = new Blob([ret.data], { type: "image/svg+xml" });
      setPicCodeUrl(URL.createObjectURL(blob));
    });
  };

  const onFinish = (values: any) => {
    const data = values as {
      username: string;
      password: string;
      token: string;
      cellphone: string;
      picCode: string;
    };
    userAPI
      .register({
        ...data,
        token: validateToken.current,
        sysNo: Config.SYS_NO
      })
      .then(ret => {
        message.success("注册成功");
        dispatch(push(`/${Config.PACKAGE_NAME}/login`));
      })
      .catch(() => {
        console.log("失败");
      });
  };

  const onFinishFailed = (values: any) => {
    console.log("fail", values);
  };

  return (
    <Weaper>
      <div className="content">
        <p className="title">用户注册</p>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "账号不能为空!" }]}
          >
            <Input placeholder="账号" maxLength={20} size="large" />
          </Form.Item>

          <Form.Item
            name="cellphone"
            rules={[
              { required: true, message: "手机号不能为空!" },
              { validator: CellPhoneValidator }
            ]}
          >
            <Input placeholder="手机号" maxLength={11} size="large" />
          </Form.Item>

          <Form.Item
            name="picCode"
            rules={[{ required: true, message: "图片验证码不能为空!" }]}
          >
            <Row>
              <Col span={16}>
                <Input placeholder="图片验证码" maxLength={5} size="large" />
              </Col>
              <Col span={8}>
                {picCodeUrl ? (
                  <img
                    className="code"
                    onClick={picCode}
                    src={picCodeUrl}
                    alt=""
                  />
                ) : (
                  <Button onClick={picCode} type="primary" size="large">
                    获取验证码
                  </Button>
                )}
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "密码不能为空!" },
              { validator: PasswordValidator }
            ]}
          >
            <Input.Password
              placeholder="设置密码：8-16位字符，包含大小写字母和数字"
              maxLength={20}
              size="large"
            />
          </Form.Item>

          <Form.Item className="foot">
            <Button type="primary" htmlType="submit" size="large">
              注册账号
            </Button>
          </Form.Item>
          <Form.Item>
            已有账号？<Link to={`/${Config.PACKAGE_NAME}/login`}>马上登录</Link>
          </Form.Item>
        </Form>
      </div>
    </Weaper>
  );
};

export default Register;
