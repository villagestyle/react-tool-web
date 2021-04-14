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
import { TablePaginationConfig } from "antd/lib/table";
import OperationText from "src/components/operation-text";
import roleAPI from "src/api/role";
import { InitPaginConfig } from "src/utils";
import RBACComponent from "src/components/rbac";

const RoleManage = () => {
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
      title: "名称",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left"
    },
    {
      title: "操作人姓名",
      dataIndex: "operName",
      key: "operName"
    },
    {
      title: "操作",
      key: "operation",
      fixed: "right",
      width: 200,
      render: (val: any, record: any) => (
        <Space size="middle">
          <RBACComponent permission="role-manage:edit">
            <OperationText onClick={() => edit(record.key)}>编辑</OperationText>
          </RBACComponent>
          <RBACComponent permission="role-manage:delete">
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

  const search = (values: any) => {
    loadData({
      rows: pagination.pageSize,
      pageNum: pagination.current
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
      const formData = form.getFieldsValue() as {
        name: string;
      };
      setLoading(true);
      // 获取数据
      roleAPI.page({ ...data, ...formData }).then(ret => {
        const arr = ret.data.records.map((d: any, index: number) => {
          return {
            key: d.id,
            index: index + data.pageNum * data.rows + 1,
            name: d.name,
            operName: d.operName
          };
        });
        setTableData(arr);
        setPagination({
          ...InitPaginConfig,
          pageSize: data.rows,
          current: data.pageNum,
          total: ret.data.total
        });
        setLoading(false);
      });
    },
    [form]
  );

  const cancelHandle = () => {
    if (confirmLoading) {
      return;
    }
    setCurId(null);
    setVisible(false);
  };

  const remove = (id: string) => {
    Modal.error({
      title: "警告",
      content: "确定删除该角色?",
      okText: "确定",
      onOk: close => {
        roleAPI.remove(id).then(ret => {
          close();
          message.success("删除成功");
          loadData({
            pageNum: pagination.current,
            rows: pagination.pageSize
          });
        });
      }
    });
  };

  const edit = (id: string) => {
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
            if (!curId) {
              roleAPI
                .add({ ...data })
                .then(() => {
                  message.success(`提交成功`);
                  setVisible(false);
                  setConfirmLoading(false);
                  loadData({
                    pageNum: pagination.current,
                    rows: pagination.pageSize
                  });
                })
                .catch(() => {
                  setConfirmLoading(false);
                });
            } else {
              setConfirmLoading(true);
              const req = roleAPI.edit(curId, { ...data });
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
                .catch(() => {
                  setConfirmLoading(false);
                });
            }
          })
          .catch(err => {
            setConfirmLoading(false);
          });
      },
      form.isFieldsValidating([]) ? 1000 : 0
    );
  };

  const add = () => {
    setVisible(true);
  };

  useEffect(() => {
    loadData({ pageNum: 1, rows: 6 });
  }, [loadData]);

  return (
    <div>
      <ContentTitle title="角色管理">
        <RBACComponent permission="role-manage:add">
          <Button type="primary" onClick={() => add()}>
            新增
          </Button>
        </RBACComponent>
      </ContentTitle>
      <Weaper className="radius-box">
        <Form onFinish={search} form={form}>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <Item label="角色名称" name="name" className="search-box">
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
          columns={columns}
          dataSource={tableData}
          loading={loading}
          pagination={pagination}
          onChange={tableChange}
        ></Table>
      </TableWeaper>

      <Modal
        confirmLoading={confirmLoading}
        title={`${curId ? "编辑" : "新增"}角色`}
        visible={visible}
        maskClosable={false}
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
        <AddComponent id={curId} ref={formRef}></AddComponent>
      </Modal>
    </div>
  );
};

export default RoleManage;
