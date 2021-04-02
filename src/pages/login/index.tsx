import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Weaper } from "./index.style";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import userAPI from "src/api/user";
import * as userActions from "src/store/user/actions";
import * as tabsActions from "src/store/tabs/actions";
import { Config } from "src/utils";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
  const [form] = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.toggle());
    dispatch(tabsActions.clear());
  }, [dispatch]);

  const onFinish = (values: any) => {
    const data = values as {
      username: string;
      password: string;
    };
    userAPI
      .login({
        ...data,
        sysNo: Config.SYS_NO
      })
      .then(ret => {
        dispatch(userActions.toggle(ret.data));
        dispatch(push(`/${Config.PACKAGE_NAME}/m/home`));
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
        <p className="title">tools</p>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          className="form"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "账号不能为空!" }]}
          >
            <Input
              placeholder="请输入账号"
              maxLength={20}
              size={"large"}
              prefix={<UserOutlined className="mr-20" />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "密码不能为空!" }]}
          >
            <Input.Password
              placeholder="请输入密码"
              maxLength={20}
              size={"large"}
              prefix={<LockOutlined className="mr-20" />}
            />
          </Form.Item>

          <Form.Item className="submit">
            <Button type="primary" htmlType="submit" size="large">
              登录
            </Button>
            {/* <Button type="default" htmlType="reset" onClick={() => form.resetFields()}>
                重置
              </Button> */}
          </Form.Item>
        </Form>
        <Form.Item className="componey">
          <p>
            Copyright ©2016-2020 by www.villagestyle.top All rights reserved.
          </p>
        </Form.Item>
      </div>
    </Weaper>
  );
};

export default Login;
