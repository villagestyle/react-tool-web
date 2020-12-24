import { State } from "./reducer";

type Methods<S = null> = (state: State, data?: S) => State;

export const toggle: Methods<State> = (state, data) => {
    return {
        ...state,
        ...data
    }
}