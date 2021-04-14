import React, {
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useState
} from "react";
import { FormInstance } from "antd/lib/form";
import { Form, Col, Row, Input, Select, TreeSelect } from "antd";
import { Weaper } from "./index.style";
import { useForm } from "antd/lib/form/Form";
import resourceAPI from "src/api/resource";
import { DataNode } from "antd/lib/tree";

interface Prop {
  id: string;
}

const AddComponent = forwardRef((prop: Prop, ref: Ref<FormInstance>) => {
  const [resourceNodes, setResourceNodes] = useState<DataNode[]>([]);
  const [form] = useForm();

  const formatResource = useCallback((arr: any[], ids?: string[]): any[] => {
    const list = arr.filter(d => ids.includes(d.id));
    return list.map(item => {
      const child = arr.filter(d => item.id === d.pid);
      const childIds = child.map(d => d.id);
      return {
        key: item.id,
        title: item.name,
        value: item.id,
        pid: item.pid,
        id: item.id,
        children: formatResource(arr, childIds)
      };
    });
  }, []);

  useEffect(() => {
    if (prop.id) {
      resourceAPI.info(prop.id).then(ret => {
        form.setFieldsValue({
          ...ret.data
        });
      });
    }
    resourceAPI.list().then(ret => {
      const arr = formatResource(
        ret.data,
        ret.data.filter((d: any) => !!!d.pid).map((d: any) => d.id)
      );
      setResourceNodes(arr);
    });
  }, [prop, form, formatResource]);

  return (
    <Weaper>
      <Form form={form} ref={ref}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item label="图标" name="icon">
              <Input placeholder="请输入" maxLength={20}></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="路径" name="link">
              <Input placeholder="请输入" maxLength={20}></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="资源名称"
              name="name"
              rules={[
                {
                  required: true,
                  message: "请输入资源名称"
                }
              ]}
            >
              <Input placeholder="请输入" maxLength={50}></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="权限字符串"
              name="permission"
              rules={[
                {
                  required: true,
                  message: "请输入权限字符串"
                }
              ]}
            >
              <Input placeholder="请输入" maxLength={50}></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="上级id" name="pid">
              <TreeSelect
                placeholder="请选择"
                treeData={resourceNodes}
              ></TreeSelect>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="显示顺序"
              name="priority"
              rules={[
                {
                  required: true,
                  message: "请输入显示顺序"
                }
              ]}
            >
              <Input placeholder="请输入" type="number" maxLength={20}></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="路由路径" name="routerLink">
              <Input placeholder="请输入" maxLength={50}></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="资源类型"
              name="type"
              rules={[
                {
                  required: true,
                  message: "请选择type"
                }
              ]}
            >
              <Select placeholder="请选择">
                <Select.Option value={0}>菜单</Select.Option>
                <Select.Option value={1}>按钮</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Weaper>
  );
});

export default AddComponent;
