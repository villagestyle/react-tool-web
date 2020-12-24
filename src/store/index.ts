import { combineReducers } from "redux";
import { History } from "history";
// 用于将react-router与redux相绑定
import { connectRouter, RouterState } from "connected-react-router";

import { userReducer, State as UserState } from "./user/reducer";
import { schoolReducer, State as SchoolState } from "./school/reducer";
import { permissionReducer, State as PermissionState } from "./permission/reducer";
import { tabsReducer, State as TabsState } from "./tabs/reducer";

export interface ApplicationState {
  user: UserState;
  school: SchoolState;
  router: RouterState,
  permission: PermissionState,
  tabs: TabsState[]
}

// combineReducers
// 将多个Reducer合成一个大的Reducer

export const createRootReducer = (history: History) =>
  combineReducers({
    user: userReducer,
    school: schoolReducer,
    tabs: tabsReducer,
    permission: permissionReducer,
    // key名必须为router
    router: connectRouter(history)
  });
