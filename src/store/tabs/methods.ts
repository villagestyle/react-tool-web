import { State } from "./reducer";

type Methods<S = null> = (state: State[], data?: S) => State[];

export const toggle: Methods<string> = (state, pathName) => {
  const data = state.map(d => {
    if (d.path === pathName) {
      return { ...d, active: true };
    } else {
      return { ...d, active: false };
    }
  });
  return data;
};

export const add: Methods<State> = (state, data) => {
  const index = state.findIndex(d => d.path === data.path);
  if (index === -1) {
    state.push(data);
  } else {
    state[index] = data;
  }
  return toggle(state, data.path);
};

export const remove: Methods<string> = (state, pathName) => {
  let index = state.findIndex(d => d.active);
  let data = state.filter(d => d.path !== pathName);
  if (!data.filter(d => d.active)[0]) {
    index = (index - 1 + data.length) % data.length;
    data = data.map((d, i) => {
      return {
        ...d,
        active: i === index ? true : false
      };
    });
  }
  return data;
};
