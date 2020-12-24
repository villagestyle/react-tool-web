import { Reducer } from "redux";
import { toggle, add, remove } from "./methods";

export const initialState: State[] = [
  {
    path: "/m/home",
    name: "首页",
    active: true
  }
];

export interface State {
  path: string;
  name: string;
  active: boolean;
}

export const tabsReducer: Reducer<State[]> = (
  state = initialState,
  actions
) => {
  switch (actions.type) {
    case "@@tabs/TOGGLE":
      return toggle(state, actions.payload);
    case "@@tabs/add":
      return add(state, actions.payload);
    case "@@tabs/remove":
      return remove(state, actions.payload);
    case "@@tabs/clear":
      return [
        {
          path: "/m/home",
          name: "首页",
          active: true
        }
      ];
    default:
      return state;
  }
};
