import React, { useEffect, useState, ReactNode } from "react";
import { Weaper } from "./index.style";
import { useSelector } from "react-redux";
import { ApplicationState } from "src/store";

interface Prop {
  permission: string;
  children: ReactNode;
}

const RBACComponent = (prop: Prop) => {
  const [show, setShow] = useState<boolean>(true);
  const { resources } = useSelector(
    (store: ApplicationState) => store.permission
  );

  useEffect(() => {
    setShow(!!resources.find(d => d.permission === prop.permission));
  }, [resources, prop]);

  return show && <Weaper>{prop.children}</Weaper>;
};

export default RBACComponent;
