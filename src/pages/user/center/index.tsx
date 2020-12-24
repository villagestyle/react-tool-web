import React, { createRef } from "react";
import { Weaper } from "./index.style";
import { Tabs, Button, message } from "antd";
import { FormInstance } from "antd/lib/form/Form";
import UserEditCom from "src/pages/user/manage/_components/add";
import PwdChangeCom from "./compontents/pwd";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "src/store";
import userAPI from "src/api/user";
import moment from "moment";
import { StaffFile } from "src/types";
import * as userActions from "src/store/user/actions";

const { TabPane } = Tabs;

const UserCenter = () => {
  const formBase = createRef<FormInstance>();
  const formPwd = createRef<FormInstance>();
  const dispatch = useDispatch();

  const { id } = useSelector(
    (store: ApplicationState) => store.user.user
  );

  const savePWD = () => {
    formPwd.current
      .validateFields()
      .then(() => {
        const data = formPwd.current.getFieldsValue() as {
          oldPassword: string;
          newPassword: string;
        };
        userAPI.changePWD(data).then(ret => {
          message.success("密码修改成功!");
          formPwd.current.resetFields();
        });
      })
      .catch(() => {});
  };

  const saveInfo = () => {
    formBase.current
      .validateFields()
      .then(() => {
        let data = formBase.current.getFieldsValue();
        data = {
          ...data,
          appointmentDay: moment(data.appointmentDay).format("YYYY-MM"),
          birthday: moment(data.birthday).format("YYYY-MM-DD"),
          workDay: moment(data.workDay).format("YYYY-MM"),
          sectionName: data.sectionName || null
        };
        console.log(data);
        userAPI
          .edit({ ...data } as StaffFile, id)
          .then(ret => {
            message.success(`修改成功`);
            userAPI.info(id).then(ret => {
              dispatch(userActions.toggle({ user: ret.data }));
            });
          })
          .catch(err => {});
      })
      .catch(() => {});
  };

  return (
    <Weaper>
      <Tabs defaultActiveKey="1" tabPosition="left" className="tabs">
        <TabPane className="tab-pane" tab="基本信息" key="1">
          <section>
            <UserEditCom isCenter={true} id={id} ref={formBase}></UserEditCom>
            <div>
              <Button type="primary" onClick={saveInfo}>
                更新信息
              </Button>
            </div>
          </section>
        </TabPane>
        <TabPane className="tab-pane" tab="修改密码" key="2">
          <section>
            <PwdChangeCom ref={formPwd}></PwdChangeCom>
            <div>
              <Button type="primary" onClick={savePWD}>
                确认修改
              </Button>
            </div>
          </section>
        </TabPane>
      </Tabs>
    </Weaper>
  );
};

export default UserCenter;
