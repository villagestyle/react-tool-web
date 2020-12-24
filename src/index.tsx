import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/lib/integration/react";
import App from "./app";
import { AliveScope } from "react-activation";
import moment from "moment";
import "moment/locale/zh-cn";
import zhCN from "antd/es/locale/zh_CN";

import { createBrowserHistory } from "history";
import configureStore from "./configureStore";
import { ConfigProvider, message } from "antd";

const history = createBrowserHistory();
export const { store, persistor } = configureStore(history);
moment.locale("zh-cn");
message.config({
  maxCount: 1
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <ConfigProvider locale={zhCN}>
          <AliveScope>
            <App></App>
          </AliveScope>
        </ConfigProvider>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
