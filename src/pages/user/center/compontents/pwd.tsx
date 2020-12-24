import React, { forwardRef, Ref } from "react";
import { Form, Input } from "antd";
import { FormInstance, RuleObject } from "antd/lib/form";
import { NamePath } from "antd/lib/form/interface";

const PWDChangeCom = forwardRef((prop, ref: Ref<FormInstance>) => {
  const PWDValidator = (
    rule: RuleObject,
    value: string,
    callback: (error?: string) => void
  ) => {
    if (!value) return Promise.resolve();
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,12}$/.test(value)) {
      return Promise.reject(`密码格式由大小写字母及数字组成,长度为6-12位`);
    }
    return Promise.resolve();
  };

  const ComfirmValidator = (
    value: string,
    getFieldValue: (name: NamePath) => any
  ) => {
    if (!value) return Promise.resolve();
    if (value !== getFieldValue("newPassword")) {
      return Promise.reject("两次输入的密码不一致");
    }
    return Promise.resolve();
  };

  return (
    <Form ref={ref}>
      <Form.Item
        label="原密码"
        name="oldPassword"
        rules={[
          {
            required: true,
            message: "请输入原密码"
          }
        ]}
      >
        <Input type="password" placeholder="请输入" maxLength={12}></Input>
      </Form.Item>
      <Form.Item
        label="新密码"
        name="newPassword"
        rules={[
          {
            required: true,
            message: "请输入新密码"
          },
          {
            validator: PWDValidator
          }
        ]}
      >
        <Input
          type="password"
          placeholder="6-12位密码，必须包含英文和数字"
          maxLength={12}
        ></Input>
      </Form.Item>
      <Form.Item
        label="重复新密码"
        name="comfirmNewPassword"
        rules={[
          {
            required: true,
            message: "请重复新密码"
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              return ComfirmValidator(value, getFieldValue);
            }
          })
        ]}
      >
        <Input type="password" placeholder="请输入" maxLength={12}></Input>
      </Form.Item>
    </Form>
  );
});

export default PWDChangeCom;
