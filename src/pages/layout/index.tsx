import React, { useState, useEffect, lazy, Suspense } from "react";
import { Layout, Menu, Dropdown, Modal, message } from "antd";
import { Weaper, TabsWeaper } from "./index.style";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  LoginOutlined
} from "@ant-design/icons";
import { Route, Link, Redirect, Switch } from "react-router-dom";
import Tabs from "./_components/tabs";
import Error from "src/pages/error/404";
import { KeepAlive, useAliveController } from "react-activation";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "src/store/index";
import { Resource } from "src/types";
import Avatar from "antd/lib/avatar/avatar";
import { push } from "connected-react-router";
import userAPI from "src/api/user";

const HomeComponent = lazy(() => import("../home"));
const UserManageComponent = lazy(() => import("../user/manage"));

interface MenuResources extends Resource {
  children: Resource[];
}

const { Header, Sider, Content } = Layout;

const LayoutComponent = () => {
  console.log("渲染LayoutComponent");
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  // const { logo } = useSelector((store: ApplicationState) => store.school);
  // const { username } = useSelector(
  //   (store: ApplicationState) => store.user.user
  // );

  // useEffect(() => {
  //   userAPI.resource().then(ret => {
  //     const { resources } = ret.data as {
  //       resources: Resource[];
  //     };
  //     dispatch(permissionActions.toggle({ resources }));
  //     const menuResource = resources.filter(d => d.type === 0);
  //     setMenuResours(
  //       formatResource(
  //         menuResource,
  //         menuResource.filter((d: any) => !!!d.pid).map((d: any) => d.id)
  //       )
  //     );
  //   });
  // }, []);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  // const formatResource = (arr: any[], ids?: string[]): any[] => {
  //   const list = arr.filter(d => ids.includes(d.id));
  //   return list.map(item => {
  //     const child = arr.filter(d => item.id === d.pid);
  //     const childIds = child.map(d => d.id);
  //     return {
  //       ...item,
  //       children: formatResource(arr, childIds)
  //     };
  //   });
  // };

  const logOut = () => {
    Modal.confirm({
      content: "确定退出?",
      cancelText: "取消",
      okText: "确认",
      onOk: () => {
        userAPI.logout().then(() => {
          dispatch(push(`/fund/login`));
          message.success("退出成功");
        });
      }
    });
  };

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
          <div className={`logo ${collapsed ? "logo-s" : ""}`}>
            {/* <img src={logo} alt="" /> */}
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
            <Menu.Item key="0" icon={<HomeOutlined />}>
              <Link to="/fund/m/home">首页</Link>
            </Menu.Item>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/fund/m/user-manage">用户管理</Link>
            </Menu.Item>
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
                {/* <Link to="/">{username}</Link> */}
              </div>
            </Dropdown>
          </Header>
          <Content>
            <TabsWeaper>
              <Tabs></Tabs>
            </TabsWeaper>
            <Switch>
              <AliveRoute
                path="/fund/m/home"
                com={SuspenseComponent(HomeComponent)}
              ></AliveRoute>
              <AliveRoute
                path="/fund/m/user-manage"
                com={SuspenseComponent(UserManageComponent)}
              ></AliveRoute>
              {/* <Route path="/fund/m/home" component={HomeComponent}></Route>
              <Route path="/fund/m/user-manage" component={UserManageComponent}></Route> */}
              <Route path="/fund/m/error" component={Error}></Route>
              <Redirect to="/fund/m/error"></Redirect>
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

interface Prop {
  path: string;
  com: JSX.Element;
}

const AliveRoute = (prop: Prop) => {
  const panes = useSelector((store: ApplicationState) => store.tabs);
  // const router = useSelector((store: ApplicationState) => store.router);

  const { path } = prop;
  const [alive, setAlive] = useState<boolean>(true);
  const { getCachingNodes, dropScope } = useAliveController();

  useEffect(() => {
    setAlive(!!panes.filter(d => "/fund" + d.path === path)[0]);
    const keys = panes.map(d => "/fund" + d.path);
    const alives = getCachingNodes();
    const delPro: Promise<any>[] = [];
    alives.forEach(d => {
      if (!keys.includes(d.name)) {
        delPro.push(dropScope(d.name));
      }
    });
  }, [dropScope, getCachingNodes, path, panes]);

  return (
    <Route
      path={prop.path}
      render={router => {
        return (
          <KeepAlive
            when={alive}
            id={router.location.pathname}
            name={router.location.pathname}
          >
            {prop.com}
          </KeepAlive>
        );
      }}
    ></Route>
  );
};

export default React.memo(LayoutComponent);
