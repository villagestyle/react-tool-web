import { Input, Form, Modal, DatePicker, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { AddNotesData } from "src/api/notes";
import moment from "moment";

interface Prop {
  onSubmit?: (value: AddNotesData) => Promise<void>;
}

const submitFunc = (data: AddNotesData) => Promise.resolve();

const AddComponent = forwardRef((prop: Prop, ref) => {
  const [form] = useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [id, setId] = useState("");

  useImperativeHandle(
    ref,
    () => {
      return {
        show: (id?: string) => {
          setVisible(true);
          setId(id);
        },
        close: () => {
          setVisible(false);
        }
      };
    },
    []
  );

  const cancel = () => {
    setVisible(false);
    setConfirmLoading(false);
  };

  const submit = () => {
    form.validateFields().then(() => {
      setConfirmLoading(true);
      const value = form.getFieldsValue() as AddNotesData;
      value.date = moment(value.date).format("YYYY-MM-DD");
      const cb = prop.onSubmit ? prop.onSubmit(value) : submitFunc(value);
      cb.then(() => {
        message.success((id ? "修改" : "新增") + "成功");
        cancel();
      }).finally(() => {
        setConfirmLoading(false);
      });
    });
  };

  return (
    <div>
      <Modal
        destroyOnClose={true}
        visible={visible}
        confirmLoading={confirmLoading}
        title={(id ? "修改" : "新增") + "备忘"}
        onCancel={cancel}
        onOk={submit}
      >
        <Form form={form} preserve={false}>
          <Form.Item
            name="name"
            label="备忘名称"
            rules={[{ required: true, message: "请输入备忘名称" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="date"
            label="备忘日期"
            rules={[{ required: true, message: "请输入备忘日期" }]}
          >
            <DatePicker></DatePicker>
          </Form.Item>
          <Form.Item
            name="content"
            label="备忘内容"
            rules={[{ required: true, message: "请输入备忘内容" }]}
          >
            <Input.TextArea rows={4} maxLength={50}></Input.TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});

export default AddComponent;

export interface AddComponentInstance {
  show: (id?: string) => void;
}
