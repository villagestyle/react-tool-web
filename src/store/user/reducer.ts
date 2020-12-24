import { Reducer } from "redux";
import { toggle } from "./methods";
import { User, Role } from "src/types";

export const initialState: State = {
  token: null,
  role: {
    creTime: null,
    id: null,
    isAdmin: 0,
    name: null,
    operName: null,
    operUserId: null,
    resources: [],
    schoolId: null,
    statr: 0,
    stateTime: null
  },
  user: {
    cellphone: null,
    creTime: null,
    headImg: null,
    id: null,
    openId: null,
    operName: null,
    operUserId: null,
    password: null,
    schoolId: null,
    staffFileId: null,
    state: 1,
    stateTime: null,
    username: null,
    role: {
      creTime: null,
      id: null,
      isAdmin: 0,
      name: null,
      operName: null,
      operUserId: null,
      resources: [],
      schoolId: null,
      statr: 0,
      stateTime: null
    },
    staffFile: {},
    studentFile: {
      cellphone: null,
      classId: null,
      className: null,
      creTime: null,
      departmentId: null,
      departmentName: null,
      educationId: null,
      educationName: null,
      entranceSchoolYearId: null,
      entranceSchoolYearName: null,
      headImg: null,
      id: null,
      idNo: null,
      isRegister: 0,
      mail: null,
      majorId: null,
      majorName: null,
      name: null,
      no: null,
      politicalStatus: 0,
      schoolId: null,
      schoolName: null,
      schoolYearId: null,
      schoolYearName: null,
      sex: 0,
      state: 0,
      stateTime: null,
      suitImg: null
    },
    studentFileId: null
  },
  needReset: 1
};

export interface State {
  token?: string;
  user?: User;
  role?: Role;
  needReset?: 0 | 1;
}

export const userReducer: Reducer<State> = (state = initialState, actions) => {
  switch (actions.type) {
    case "@@user/TOGGLE":
      return toggle(state, actions.payload);
    default:
      return state;
  }
};
