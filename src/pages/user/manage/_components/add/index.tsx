import React, { forwardRef, Ref, useEffect } from "react";
import { FormInstance, RuleObject } from "antd/lib/form";
import { Form, Col, Row, Input, Select } from "antd";
import { Weaper } from "./index.style";
import { useForm } from "antd/lib/form/Form";
import userAPI from "src/api/user";
import { CellPhoneValidator } from "src/utils";
import RoleSelector from "src/components/role-selector";

interface Prop {
  id: string | number;
  isCenter?: boolean;
}

const PWDValidator = (
  rule: RuleObject,
  value: string,
  callback: (error?: string) => void
) => {
  if (!value) return Promise.resolve();
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/.test(value)) {
    return Promise.reject(`密码格式由大小写字母及数字组成,长度为6-20位`);
  }
  return Promise.resolve();
};

const AddComponent = forwardRef((prop: Prop, ref: Ref<FormInstance>) => {
  const [form] = useForm();

  useEffect(() => {
    if (prop.id) {
      userAPI.info(prop.id).then(ret => {
        form.setFieldsValue({
          ...ret.data
        });
      });
    }
  }, [prop.id, form]);

  return (
    <Weaper>
      <Form form={form} ref={ref}>
        <Row gutter={8}>
          <Col span={24}>
            <Form.Item
              label="账号"
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入账号(用以登录)"
                }
              ]}
            >
              <Input
                disabled={!!prop.id}
                placeholder="请输入"
                maxLength={20}
              ></Input>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="姓名"
              name="name"
              rules={[
                {
                  required: true,
                  message: "请输入姓名"
                }
              ]}
            >
              <Input placeholder="请输入" maxLength={20}></Input>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="性别"
              name="sex"
              rules={[
                {
                  required: true,
                  message: "请选择性别"
                }
              ]}
            >
              <Select placeholder="请选择">
                <Select.Option value={1}>男</Select.Option>
                <Select.Option value={0}>女</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="联系手机"
              name="cellphone"
              rules={[
                {
                  required: true,
                  message: "请输入联系手机"
                },
                {
                  validator: CellPhoneValidator
                }
              ]}
            >
              <Input placeholder="请输入" maxLength={11} type="tel"></Input>
            </Form.Item>
          </Col>
          {!prop.isCenter && (
            <Col span={24}>
              <Form.Item
                label="角色"
                name="roleId"
                rules={[
                  {
                    required: true,
                    message: "请选择角色"
                  }
                ]}
              >
                <RoleSelector></RoleSelector>
              </Form.Item>
            </Col>
          )}
          {!prop.id && (
            <Col span={24}>
              <Form.Item
                label="密码"
                name="password"
                rules={[
                  {
                    validator: PWDValidator
                  }
                ]}
              >
                <Input
                  type="password"
                  maxLength={20}
                  placeholder="不输则为默认密码"
                ></Input>
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </Weaper>
  );
});

export default React.memo(AddComponent);
