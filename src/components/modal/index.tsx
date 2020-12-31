import { Modal } from "antd";
import { ModalFuncProps } from "antd/lib/modal";
import React, { ReactNode, useState } from "react";
import ReactDOM from "react-dom";

interface Prop {
  onOk?: (setVisible: (bool: boolean) => void) => void;
  onCancel?: (setVisible: (bool: boolean) => void) => void;
  content?: () => JSX.Element;
}

export const ModalComponent = (prop: Prop) => {
  const [visible, setVisible] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const cancel = () => {
    if (prop.onCancel) {
      prop.onCancel(setVisible);
    } else {
      setVisible(false);
    }
  };

  const ok = () => {
    setConfirmLoading(true);
    setConfirmLoading(false);
    cancel();
  };

  return (
    <Modal
      destroyOnClose={true}
      visible={visible}
      onCancel={cancel}
      onOk={ok}
      confirmLoading={confirmLoading}
    >
      <div className="content">
        <prop.content></prop.content>
      </div>
    </Modal>
  );
};

export const createModal = (config: Prop) => {
  ReactDOM.render(
    <ModalComponent
      onOk={config.onOk}
      onCancel={config.onCancel}
      content={config.content}
    ></ModalComponent>,
    document.body
  );
};
