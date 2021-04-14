import React, { useState, createRef, useEffect, useCallback } from "react";
import ContentTitle from "src/components/content-title";
import { Weaper, TableWeaper } from "./index.style";
import AddComponent from "./_components/add";
import {
  Button,
  Row,
  Col,
  Form,
  Table,
  Modal,
  message,
  Space,
  Input
} from "antd";
import { useForm, FormInstance } from "antd/lib/form/Form";
import resourceAPI from "src/api/resource";
import { TablePaginationConfig } from "antd/lib/table";
import moment from "moment";
import OperationText from "src/components/operation-text";
import { InitPaginConfig } from "src/utils";
import RBACComponent from "src/components/rbac";

const ResourceManage = () => {
  const { Item } = Form;
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [curId, setCurId] = useState<string>(null);
  const formRef = createRef<FormInstance>();

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    total: 0,
    showSizeChanger: true,
    pageSize: 6,
    pageSizeOptions: ["6", "10", "20", "30", "40", "50"]
  });

  const columns: any = [
    {
      title: "NO",
      width: 100,
      dataIndex: "index",
      key: "index",
      fixed: "left"
    },
    {
      title: "资源名称",
      width: 250,
      dataIndex: "name",
      key: "name",
      fixed: "left"
    },
    { title: "权限字符串", dataIndex: "permission", key: "permission" },
    { title: "图标", dataIndex: "icon", key: "icon" },
    {
      title: "路由路径",
      dataIndex: "routerLink",
      key: "routerLink"
    },
    {
      title: "资源类型",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "创建时间",
      dataIndex: "creTime",
      key: "creTime"
    },
    {
      title: "操作",
      key: "operation",
      fixed: "right",
      width: 200,
      render: (val: any, record: any) => (
        <Space size="middle">
          <RBACComponent permission="resources-manage:edit">
            <OperationText onClick={() => edit(record.key)}>编辑</OperationText>
          </RBACComponent>
          <RBACComponent permission="resources-manage:delete">
            <OperationText onClick={() => remove(record.key)}>
              删除
            </OperationText>
          </RBACComponent>
        </Space>
      )
    }
  ];

  const tableChange = (pageConfig: TablePaginationConfig) => {
    pagination.pageSize = pageConfig.pageSize;
    pagination.current = pageConfig.current;
    loadData({
      pageNum: pageConfig.current,
      rows: pageConfig.pageSize
    });
  };

  const remove = (id: string) => {
    Modal.error({
      title: "警告",
      content: "确定删除该资源?",
      okText: "确定",
      onOk: () => {
        resourceAPI.remove(id).then(ret => {
          message.success("删除成功");
          loadData({
            pageNum: pagination.current,
            rows: pagination.pageSize
          });
        });
      }
    });
  };

  const search = async (values: any) => {
    loadData({
      rows: pagination.pageSize,
      pageNum: 1
    });
  };

  const reset = () => {
    form.resetFields();
    loadData({
      rows: pagination.pageSize,
      pageNum: pagination.current
    });
  };

  const loadData = useCallback(
    (data: { pageNum: number; rows: number }) => {
      setLoading(true);
      const formData = form.getFieldsValue() as {
        name: string;
        permission: string;
      };
      // 获取数据
      resourceAPI
        .page({ ...data, ...formData })
        .then(ret => {
          const arr = ret.data.records.map((d: any, index: number) => {
            return {
              key: d.id,
              creTime: moment(d.creTime).format("YYYY-MM-DD HH:mm"),
              index: index + (data.pageNum - 1) * data.rows + 1,
              name: d.name,
              permission: d.permission,
              routerLink: d.routerLink,
              type: ["菜单", "按钮"][d.type],
              icon: d.icon
            };
          });
          setTableData(arr);
          setPagination({
            ...InitPaginConfig,
            pageSize: data.rows,
            current: data.pageNum,
            total: ret.data.total
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [form]
  );

  const cancelHandle = () => {
    if (confirmLoading) {
      return;
    }
    formRef.current.resetFields();
    formRef.current.setFieldsValue({
      record: [{}]
    });
    setVisible(false);
  };

  const edit = (id?: string) => {
    setVisible(true);
    setCurId(id);
  };

  const okHandle = () => {
    const form = formRef.current;
    setTimeout(
      () => {
        form
          .validateFields()
          .then(ret => {
            const data = form.getFieldsValue();
            setConfirmLoading(true);
            const req = curId
              ? resourceAPI.edit(curId, { ...data })
              : resourceAPI.add(data);
            req
              .then(ret => {
                message.success(`提交成功`);
                setVisible(false);
                setConfirmLoading(false);
                loadData({
                  pageNum: pagination.current,
                  rows: pagination.pageSize
                });
              })
              .catch(err => {
                setConfirmLoading(false);
                console.log("err", err);
              });
          })
          .catch(err => {
            setConfirmLoading(false);
            console.log("err", err);
          });
      },
      form.isFieldsValidating([]) ? 1000 : 0
    );
  };

  useEffect(() => {
    loadData({ pageNum: 1, rows: 6 });
  }, [loadData]);

  return (
    <div>
      <ContentTitle title="资源管理">
        <RBACComponent permission="resources-manage:add">
          <Button type="primary" onClick={() => edit()}>
            新增资源
          </Button>
        </RBACComponent>
      </ContentTitle>
      <Weaper className="radius-box">
        <Form onFinish={search} form={form}>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <Item label="资源名称" name="name" className="search-box">
                <Input placeholder="请输入" maxLength={50}></Input>
              </Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Item label="权限名称" name="permission" className="search-box">
                <Input placeholder="请输入" maxLength={50}></Input>
              </Item>
            </Col>
            <Col className="gutter-row opera-box" span={8}>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button type="primary" htmlType="reset" onClick={reset}>
                  重置
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Weaper>
      <TableWeaper className="radius-box">
        <Table
          scroll={{ x: 1600 }}
          columns={columns}
          dataSource={tableData}
          loading={loading}
          pagination={pagination}
          onChange={tableChange}
        ></Table>
      </TableWeaper>

      <Modal
        confirmLoading={confirmLoading}
        title={`${curId ? "编辑" : "新增"}资源`}
        visible={visible}
        maskClosable={false}
        width={850}
        onCancel={cancelHandle}
        destroyOnClose={true}
        footer={[
          <Button key="back" disabled={confirmLoading} onClick={cancelHandle}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={confirmLoading}
            loading={confirmLoading}
            onClick={() => okHandle()}
          >
            提交
          </Button>
        ]}
      >
        {visible && <AddComponent id={curId} ref={formRef}></AddComponent>}
      </Modal>
    </div>
  );
};

export default ResourceManage;
