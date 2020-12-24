import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./pages/layout";
import Login from "./pages/login";
import Register from "./pages/register";
import Error from "./pages/error/404";
import { Weaper } from "./app.style";
import { Config } from "./utils";

const App = () => {
  const [loadCompleted, setLoadCompleted] = useState<boolean>(false);

  useEffect(() => {
    // 首屏加载
    setLoadCompleted(true);
  }, []);

  return loadCompleted ? (
    <div className="App">
      <Switch>
        <Route path="/fund/login" component={Login}></Route>
        {Config.DEBUG_MODE && (
          <Route path="/fund/register" component={Register}></Route>
        )}
        <Route path="/fund/m" component={Layout}></Route>
        <Route path="/fund/error" component={Error}></Route>
        <Redirect to="/fund/login"></Redirect>
      </Switch>
    </div>
  ) : (
    <Weaper className="app">
      <div className="cs-loader">
        <div className="cs-loader-inner">
          <label> ●</label>
          <label> ●</label>
          <label> ●</label>
          <label> ●</label>
          <label> ●</label>
          <label> ●</label>
        </div>
      </div>
    </Weaper>
  );
};

export default App;
