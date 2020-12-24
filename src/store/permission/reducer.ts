import { Reducer } from "redux";
import { toggle } from "./methods";
import { Resource } from 'src/types';

export const initialState: State = {
  resources: []
};

export interface State {
  resources: Resource[]
}

export const permissionReducer: Reducer<State> = (
  state = initialState,
  actions
) => {
  switch (actions.type) {
    case "@@permission/TOGGLE":
      return toggle(state, actions.payload);
    default:
      return state;
  }
};
