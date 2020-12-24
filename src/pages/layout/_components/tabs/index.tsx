import React, { useState, useEffect } from "react";
import { Tabs as AntdTabs, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Weaper } from "./index.style";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "src/store/index";
import { Routers } from "src/utils/router";
import * as TabsActions from "src/store/tabs/actions";
import { push } from "connected-react-router";

const { TabPane } = AntdTabs;

interface Pane {
  title: string;
  router: string;
  key: string;
}

interface Prop {}

const Tabs = (prop: Prop) => {
  const dispatch = useDispatch();
  const panes = useSelector((store: ApplicationState) => store.tabs);
  // const { no } = useSelector((store: ApplicationState) => store.school);
  const [activeKey, setActiveKey] = useState<string>(null);
  // const [allowRouterList, setAllowRouterList] = useState<string[]>([]);
  const router = useSelector((store: ApplicationState) => store.router);
  // const resources = useSelector((store: ApplicationState) => store.permission)
  //   .resources;

  const onChange = (activeKey: string) => {
    setActiveKey(activeKey);
    dispatch(push(`/fund` + activeKey));
    dispatch(TabsActions.toggle(activeKey));
  };

  const onEdit = (path: any, action: "add" | "remove") => {
    if (action === "remove") {
      dispatch(TabsActions.remove(path));
    }
  };

  const clearTabs = () => {
    dispatch(TabsActions.clear());
    dispatch(push(`/fund/m/home`));
  };

  // 通行白名单
  // useEffect(() => {
  //   setAllowRouterList(
  //     resources
  //       .map(d => d.routerLink)
  //       .filter(d => d)
  //       .map(d => `/${no}` + d)
  //   );
  // }, [resources]);

  useEffect(() => {
    const { pathname } = router.location;
    // if (!allowRouterList.includes(pathname) && !pathname.includes("login")) {
    //   dispatch(push(`/m/error`));
    //   return;
    // }
    if (!activeKey) {
      setActiveKey('/m/home');
      return;
    }
    if (pathname !== `/fund` + activeKey) {
      const data = Routers.filter(
        route => `/fund` + route.path === pathname
      )[0];
      dispatch(TabsActions.add({ ...data, active: true }));
      setActiveKey(data.path);
    }
  }, [router, dispatch, activeKey]);

  return (
    <Weaper>
      <AntdTabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        hideAdd={true}
        onEdit={onEdit}
      >
        {panes.map(pane => (
          <TabPane
            tab={pane.name}
            key={pane.path}
            closable={panes.length !== 1}
          ></TabPane>
        ))}
      </AntdTabs>
      <Button
        type="dashed"
        icon={<DeleteOutlined />}
        onClick={clearTabs}
      ></Button>
    </Weaper>
  );
};

export default React.memo(Tabs);
