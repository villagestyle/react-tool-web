import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "src/store";
import KeepAlive, { useAliveController } from "react-activation";
import { Config } from "src/utils";
import { Route } from "react-router";

interface Prop {
  path: string;
  com: JSX.Element;
}

const AliveRoute = (prop: Prop) => {
  const panes = useSelector((store: ApplicationState) => store.tabs);

  const { path } = prop;
  const [alive, setAlive] = useState<boolean>(true);
  const { getCachingNodes, dropScope } = useAliveController();

  useEffect(() => {
    setAlive(
      !!panes.filter(d => `/${Config.PACKAGE_NAME}` + d.path === path)[0]
    );
    const keys = panes.map(d => `/${Config.PACKAGE_NAME}` + d.path);
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

export default AliveRoute;