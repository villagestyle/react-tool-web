import React, { forwardRef, Ref, useEffect, useState } from "react";
import { FormInstance, RuleObject } from "antd/lib/form";
import { Form, Col, Row, Input, Select, DatePicker } from "antd";
import { Weaper } from "./index.style";
import { useForm } from "antd/lib/form/Form";
import userAPI from "src/api/user";
import moment from "moment";
import { CellPhoneValidator } from "src/utils";

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
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,12}$/.test(value)) {
    return Promise.reject(`密码格式由大小写字母及数字组成,长度为6-12位`);
  }
  return Promise.resolve();
};

const AddComponent = forwardRef((prop: Prop, ref: Ref<FormInstance>) => {
  const [sectionNameList, setSectionNameList] = useState([]);
  const [positionNameList, setPositionNameList] = useState([]);
  const [roleNameList, setRoleNameList] = useState([]);

  useEffect(() => {
    loadConfig();
  }, []);

  useEffect(() => {
    if (prop.id) {
      userAPI.info(prop.id).then(ret => {
        form.setFieldsValue({
          ...ret.data?.staffFile,
          roleId: ret.data?.role.id,
          appointmentDay:
            ret.data?.staffFile.appointmentDay &&
            moment(ret.data?.staffFile.appointmentDay),
          birthday:
            ret.data?.staffFile.birthday &&
            moment(ret.data?.staffFile.birthday),
          workDay:
            ret.data?.staffFile.workDay && moment(ret.data?.staffFile.workDay)
        });
      });
    }
  }, [prop.id]);

  const [form] = useForm();

  const loadConfig = () => {
    userAPI.sectionNameList().then(ret => {
      setSectionNameList(ret.data);
    });
    userAPI.positionNameList().then(ret => {
      setPositionNameList(ret.data);
    });
    userAPI.roleList().then(ret => {
      setRoleNameList(ret.data);
    })
  };

  return (
    <Weaper>
      <Form form={form} ref={ref}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label="工号"
              name="no"
              rules={[
                {
                  required: true,
                  message: "请输入工号"
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
          <Col span={12}>
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
              <Input
                disabled={!!prop.id}
                placeholder="请输入"
                maxLength={20}
              ></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
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
          <Col span={12}>
            <Form.Item
              label="出生日期"
              name="birthday"
              rules={[
                {
                  required: true,
                  message: "请选择出生日期"
                }
              ]}
            >
              <DatePicker></DatePicker>
            </Form.Item>
          </Col>
          <Col span={12}>
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
          <Col span={12}>
            <Form.Item
              label="政治面貌"
              name="politicalStatus"
              rules={[
                {
                  required: true,
                  message: "请选择政治面貌"
                }
              ]}
            >
              <Select placeholder="请选择">
                <Select.Option value={0}>中共党员</Select.Option>
                <Select.Option value={1}>群众</Select.Option>
                <Select.Option value={2}>中共团员</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="职称"
              name="title"
              rules={[
                {
                  required: true,
                  message: "请选择职称"
                }
              ]}
            >
              <Select placeholder="请选择">
                <Select.Option value={0}>助教</Select.Option>
                <Select.Option value={1}>讲师</Select.Option>
                <Select.Option value={2}>副教授</Select.Option>
                <Select.Option value={3}>教授</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="定职时间"
              name="appointmentDay"
              rules={[
                {
                  required: true,
                  message: "请选择定职时间"
                }
              ]}
            >
              <DatePicker.MonthPicker></DatePicker.MonthPicker>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="最高学历"
              name="highestEducation"
              rules={[
                {
                  required: true,
                  message: "请选择最高学历"
                }
              ]}
            >
              <Select placeholder="请选择">
                <Select.Option value={0}>本科</Select.Option>
                <Select.Option value={1}>硕士研究生</Select.Option>
                <Select.Option value={2}>博士研究生</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="最后学位"
              name="finalDegree"
              rules={[
                {
                  required: true,
                  message: "请选择最后学位"
                }
              ]}
            >
              <Select placeholder="请选择">
                <Select.Option value={0}>学士</Select.Option>
                <Select.Option value={1}>硕士</Select.Option>
                <Select.Option value={2}>博士</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="职务"
              name="positionName"
              rules={[
                {
                  required: true,
                  message: "请选择职务"
                }
              ]}
            >
              <Select placeholder="请选择">
                {positionNameList.map(d => (
                  <Select.Option value={d.name} key={d.name}>
                    {d.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="任职时间"
              name="workDay"
              rules={[
                {
                  required: true,
                  message: "请选择任职时间"
                }
              ]}
            >
              <DatePicker.MonthPicker></DatePicker.MonthPicker>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="人员编制"
              name="staffEstablishing"
              rules={[
                {
                  required: true,
                  message: "请选择人员编制"
                }
              ]}
            >
              <Select placeholder="请选择">
                <Select.Option value={1}>在编</Select.Option>
                <Select.Option value={0}>外聘</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="是否专任教师"
              name="isFullTimeTeacher"
              rules={[
                {
                  required: true,
                  message: "请选择是否专任教师"
                }
              ]}
            >
              <Select placeholder="请选择">
                <Select.Option value={1}>是</Select.Option>
                <Select.Option value={0}>否</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          {!prop.isCenter && (
            <Col span={12}>
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
                <Select placeholder="请选择">
                  {
                    roleNameList.map(d => <Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>)
                  }
                </Select>
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Form.Item
              label="所在单位"
              name="departmentName"
              rules={[
                {
                  required: true,
                  message: "请选择所在单位"
                }
              ]}
            >
              <Select placeholder="请选择">
                <Select.Option value={"物理与电子信息工程学院"}>
                  物理与电子信息工程学院
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          {!prop.id && (
            <Col span={12}>
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
                  maxLength={12}
                  placeholder="不输则为默认密码"
                ></Input>
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Form.Item label="所属教研室" name="sectionName">
              <Select placeholder="请选择" allowClear>
                {sectionNameList.map(d => (
                  <Select.Option value={d.name} key={d.name}>
                    {d.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Weaper>
  );
});

export default AddComponent;
