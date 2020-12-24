import { State, initialState } from "./reducer";

type Methods<S = null> = (state: State, data?: S) => State;

export const toggle: Methods<State> = (state, data = initialState) => {
    return {
        ...state,
        ...data
    }
}
