import React, { useState, createRef, useEffect } from "react";
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
import userAPI from "src/api/user";
import { TablePaginationConfig } from "antd/lib/table";
import moment from "moment";
import { StaffFile } from "src/types";
import { InitPaginConfig } from 'src/utils';
import OperationText from "src/components/operation-text";

const UserManage = () => {
  const { Item } = Form;
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [curId, setCurId] = useState<string>(null);
  const formRef = createRef<FormInstance>();

  const [pagination, setPagination] = useState<TablePaginationConfig>(InitPaginConfig);

  const columns: any = [
    {
      title: "NO",
      width: 100,
      dataIndex: "index",
      key: "index",
      fixed: "left"
    },
    {
      title: "账号",
      width: 100,
      dataIndex: "username",
      key: "username",
      fixed: "left"
    },
    { title: "角色", dataIndex: "role", key: "role" },
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "联系手机", dataIndex: "cellphone", key: "cellphone" },
    { title: "性别", dataIndex: "sex", key: "sex" },
    {
      title: "操作",
      key: "operation",
      fixed: "right",
      width: 200,
      render: (val: any, record: any) => (
        <Space size="middle">
          <OperationText onClick={() => remove(record.key)}>删除</OperationText>
          <OperationText onClick={() => edit(record.key)}>编辑</OperationText>
          <OperationText onClick={() => resetPWD(record.key)}>重置密码</OperationText>
        </Space>
      )
    }
  ];

  const resetPWD = (id: string) => {
    userAPI.resetPWD(id).then(ret => {
      message.success(`密码已重置为888888`);
    });
  };

  const remove = (id: string) => {
    Modal.confirm({
      title: "提示",
      cancelText: '取消',
      okText: '确认',
      content: "确定删除该用户?",
      onOk: () => {
        userAPI.remove(id).then(ret => {
          message.success("删除成功");
          loadData({
            pageNum: pagination.current,
            rows: pagination.pageSize
          });
        });
      }
    });
  };

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

  const loadData = (data: { pageNum: number; rows: number }) => {
    const formData = form.getFieldsValue() as {
      name: string;
    };
    setLoading(true);
    userAPI.page({ ...data, ...formData }).then(ret => {
      const arr = ret.data.records.map((d: any, index: number) => {
        return {
          key: d.id,
          index: index + (pagination.current - 1) * pagination.pageSize + 1,
          username: d.username,
          role: d.role?.name,
          name: d.staffFile?.name,
          sex: ["女", "男"][d.staffFile?.sex],
          cellphone: d.staffFile?.cellphone
        };
      });
      setTableData(arr);
      setPagination({
        ...pagination,
        total: ret.data.total,
        current: ret.data.current
      });
    }).finally(() => setLoading(false));
  };

  const cancelHandle = () => {
    if (confirmLoading) {
      return;
    }
    formRef.current.resetFields();
    formRef.current.setFieldsValue({});
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
            let data = form.getFieldsValue();
            data = {
              ...data,
              appointmentDay: moment(data.appointmentDay).format("YYYY-MM"),
              birthday: moment(data.birthday).format("YYYY-MM-DD"),
              workDay: moment(data.workDay).format("YYYY-MM"),
              sectionName: data.sectionName || null
            };
            setConfirmLoading(true);
            const req = curId
              ? userAPI.edit({ ...data } as StaffFile, curId)
              : userAPI.add(data as StaffFile);
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
  }, []);

  return (
    <div>
      <ContentTitle title="用户管理">
        <Button type="primary" onClick={() => edit()}>
          新增用户
        </Button>
      </ContentTitle>
      <Weaper className="radius-box">
        <Form onFinish={search} form={form}>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <Item label="姓名" name="name" className="search-box">
                <Input allowClear placeholder="请输入" maxLength={30}></Input>
              </Item>
            </Col>
            <Col className="gutter-row opera-box" span={8}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button type="primary" htmlType="reset" onClick={reset}>
                重置
              </Button>
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
        title={`${curId ? "编辑" : "新增"}用户`}
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
       <AddComponent id={curId} ref={formRef}></AddComponent>
      </Modal>
    </div>
  );
};

export default UserManage;
