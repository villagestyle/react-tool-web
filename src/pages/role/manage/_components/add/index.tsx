import React, { forwardRef, Ref, useEffect, useState } from "react";
import { FormInstance } from "antd/lib/form";
import { Form, Col, Row, Tree, Input } from "antd";
import { Weaper } from "./index.style";
import { useForm } from "antd/lib/form/Form";
import resourceAPI from "src/api/resource";
import roleAPI from "src/api/role";
import { DataNode } from "antd/lib/tree";
import { Resource } from "src/types";

interface Prop {
  id: string;
}

const formatResource = (arr: any[], ids?: string[]): any[] => {
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
};

const AddComponent = forwardRef((prop: Prop, ref: Ref<FormInstance>) => {
  const [resourceNodes, setResourceNodes] = useState<DataNode[]>([]);
  const [resourceList, setResourceList] = useState<any[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const [form] = useForm();

  useEffect(() => {
    resourceAPI.list().then(ret => {
      setResourceList(ret.data);
      const arr = formatResource(
        ret.data,
        ret.data.filter((d: any) => !!!d.pid).map((d: any) => d.id)
      );
      setResourceNodes(arr);
      if (prop.id) {
        roleAPI.info(prop.id).then(ret => {
          form.setFieldsValue({
            ...ret.data,
            isAdmin: ret.data.isAdmin
          });
          const childrenKeys = ret.data.resources
            .filter((d: any) => d.type === 1)
            .map((d: Resource) => d.id);
          const parentKeys: any[] = ret.data.resources
            .filter((d: any) => d.type === 0)
            .map((d: Resource) => d.id);
          const usedParentKeys = arr
            .filter(d => parentKeys.includes(d.id) && !d.children.length)
            .map(d => d.id);
          setCheckedKeys([...usedParentKeys, ...childrenKeys]);
        });
      }
    });
  }, [form, prop.id]);

  return (
    <Weaper>
      <Form form={form} ref={ref}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item label="名称" name="name" required>
              <Input placeholder="请输入" maxLength={20}></Input>
            </Form.Item>
            <Form.Item label="权限" name="resources">
              <Tree
                checkable
                treeData={resourceNodes}
                checkedKeys={checkedKeys}
                onCheck={(...arg) => {
                  console.log(arg);
                  setCheckedKeys(arg[0] as number[]);
                  form.setFieldsValue({
                    resources: resourceList.filter(d =>
                      [
                        ...(arg[0] as string[]),
                        ...arg[1].halfCheckedKeys
                      ].includes(d.id)
                    )
                  });
                }}
              ></Tree>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Weaper>
  );
});

export default AddComponent;
