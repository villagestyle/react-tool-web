import { Reducer } from "redux";
import { toggle } from "./methods";

export const initialState: State = {
  addr: null,
  creTime: null,
  id: null,
  lat: null,
  lng: null,
  logo: null,
  logoWithName: null,
  name: null,
  no: null,
  officialNo: null,
  state: null,
  stateTime: null,
  universityCode: null,
  zoom: null
};

export interface State {
  addr: string;
  creTime: number;
  id: string;
  lat: number;
  lng: number;
  logo: string;
  logoWithName: string;
  name: string;
  no: string;
  officialNo: string;
  state: 0 | 1;
  stateTime: number;
  universityCode: string;
  zoom: number;
}

export const schoolReducer: Reducer<State> = (
  state = initialState,
  actions
) => {
  switch (actions.type) {
    case "@@school/TOGGLE":
      return toggle(state, actions.payload);
    default:
      return state;
  }
};
