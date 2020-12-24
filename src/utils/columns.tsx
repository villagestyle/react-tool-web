import { ColumnsType } from "antd/lib/table";
import HeadImageComponent from "src/components/head-img";
import React from 'react';

export const StudentColumns: ColumnsType<any> = [
  {
    title: "NO",
    dataIndex: "index",
    key: "index"
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    // render: (val: any, record: any) => (
    //   <HeadImageComponent
    //     width={50}
    //     height={50}
    //     src={record.headImg}
    //     name={val}
    //   ></HeadImageComponent>
    // )
  },
  {
    title: "学号",
    dataIndex: "no",
    key: "no"
  },
  {
    title: "联系手机",
    dataIndex: "cellphone",
    key: "cellphone"
  },
  {
    title: "院系",
    dataIndex: "departName",
    key: "departName"
  },
  {
    title: "专业",
    dataIndex: "mojarName",
    key: "mojarName"
  },
  {
    title: "年级",
    dataIndex: "gradeName",
    key: "gradeName"
  },
  {
    title: "班级",
    dataIndex: "className",
    key: "className"
  }
];

export const StaffColumns: ColumnsType<any> = [
  {
    title: "NO",
    dataIndex: "index",
    key: "index"
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    // render: (val: any, record: any) => (
    //   <HeadImageComponent
    //     width={50}
    //     height={50}
    //     src={record.headImg}
    //     name={val}
    //   ></HeadImageComponent>
    // )
  },
  {
    title: "工号",
    dataIndex: "no",
    key: "no"
  },
  {
    title: "联系手机",
    dataIndex: "cellphone",
    key: "cellphone"
  },
  {
    title: "所属院系",
    dataIndex: "departName",
    key: "departName"
  }
];

export const CreateStudentColumns = (
  opera: (val: any, record: any) => React.ReactNode
) => {
  return StudentColumns.concat({
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    render: opera
  });
};

export const CreateStaffColumns = (
  opera: (val: any, record: any) => React.ReactNode
) => {
  return StaffColumns.concat({
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    render: opera
  });
};
