import React, { useState, lazy, Suspense, useEffect } from "react";
import { Layout, Menu, Dropdown, Modal, message } from "antd";
import { Weaper, TabsWeaper } from "./index.style";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  LoginOutlined,
  MailOutlined
} from "@ant-design/icons";
import { Route, Link, Redirect, Switch } from "react-router-dom";
import Tabs from "./_components/tabs";
import Error from "src/pages/error/404";
import { useDispatch } from "react-redux";
import Avatar from "antd/lib/avatar/avatar";
import { push } from "connected-react-router";
import userAPI from "src/api/user";
import { Config, formatResource } from "src/utils";
import AliveRoute from "src/components/alive-route";
import { Resource } from "src/types";
import * as permissionActions from "src/store/permission/actions";
import SubMenu from "_antd@4.9.4@antd/lib/menu/SubMenu";

const HomeComponent = lazy(() => import("../home"));
const UserManageComponent = lazy(() => import("../user/manage"));
const NoteManageComponent = lazy(() => import("../note/manage"));
const ResourceManageComponent = lazy(() => import("../resource"));
const RoleManageComponent = lazy(() => import("../role/manage"));

const { Header, Sider, Content } = Layout;

const LayoutComponent = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [menuResours, setMenuResours] = useState<any[]>([]);

  useEffect(() => {
    userAPI.resource().then(ret => {
      const resources = ret.data as Resource[];
      dispatch(permissionActions.toggle({ resources }));
      const menuResource = resources.filter(d => d.type === 0);
      setMenuResours(
        formatResource(
          menuResource,
          menuResource.filter((d: any) => !!!d.pid).map((d: any) => d.id)
        )
      );
    });
  }, [dispatch]);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const logOut = () => {
    Modal.confirm({
      content: "确定退出?",
      cancelText: "取消",
      okText: "确认",
      onOk: () => {
        userAPI.logout().then(() => {
          dispatch(push(`/${Config.PACKAGE_NAME}/login`));
          message.success("退出成功");
        });
      }
    });
  };

  const iconShow = (type: string) => {
    switch (type) {
      case "HomeOutlined":
        return <HomeOutlined></HomeOutlined>;
    }
  };

  const menu = menuResours.map(resource => {
    if (resource.children.length) {
      return (
        <SubMenu
          key={resource.permission}
          icon={resource.icon ? iconShow(resource.icon) : <MailOutlined />}
          title={resource.name}
        >
          {resource.children.map((d: any) => (
            <Menu.Item key={d.permission}>
              <Link to={`/${Config.PACKAGE_NAME}${d.routerLink}`}>
                {d.name}
              </Link>
            </Menu.Item>
          ))}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={resource.permission} icon={<UserOutlined />}>
          <Link to={`/${Config.PACKAGE_NAME}${resource.routerLink}`}>
            {resource.name}
          </Link>
        </Menu.Item>
      );
    }
  });

  return (
    <Weaper>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={250}
          className="sider"
        >
          <div className="logo"></div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
            <Menu.Item key={0} icon={<HomeOutlined />}>
              <Link to={`/${Config.PACKAGE_NAME}/m/home`}>首页</Link>
            </Menu.Item>
            {menu}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle
              }
            )}
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="2" onClick={logOut}>
                    <LoginOutlined />
                    退出
                  </Menu.Item>
                </Menu>
              }
            >
              <div className="user">
                <Avatar size={28} icon={<UserOutlined />}></Avatar>
              </div>
            </Dropdown>
          </Header>
          <Content>
            <TabsWeaper>
              <Tabs></Tabs>
            </TabsWeaper>
            <Switch>
              <AliveRoute
                path={`/${Config.PACKAGE_NAME}/m/home`}
                com={SuspenseComponent(HomeComponent)}
              ></AliveRoute>
              <AliveRoute
                path={`/${Config.PACKAGE_NAME}/m/user-manage`}
                com={SuspenseComponent(UserManageComponent)}
              ></AliveRoute>
              <AliveRoute
                path={`/${Config.PACKAGE_NAME}/m/note-manage`}
                com={SuspenseComponent(NoteManageComponent)}
              ></AliveRoute>
              <AliveRoute
                path={`/${Config.PACKAGE_NAME}/m/resources-manage`}
                com={SuspenseComponent(ResourceManageComponent)}
              ></AliveRoute>
              <AliveRoute
                path={`/${Config.PACKAGE_NAME}/m/role-manage`}
                com={SuspenseComponent(RoleManageComponent)}
              ></AliveRoute>
              <Route
                path={`/${Config.PACKAGE_NAME}/m/error`}
                component={Error}
              ></Route>
              <Redirect to={`/${Config.PACKAGE_NAME}/m/error`}></Redirect>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Weaper>
  );
};

const SuspenseComponent = (
  Component: React.LazyExoticComponent<() => JSX.Element>
): JSX.Element => {
  return (
    <Suspense fallback={null}>
      <Component></Component>
    </Suspense>
  );
};

export default React.memo(LayoutComponent);
