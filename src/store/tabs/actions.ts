import { action } from 'typesafe-actions';
import { State } from './reducer';

export const toggle = (path: string) => action("@@tabs/TOGGLE", path);

export const add = (data: State) => action("@@tabs/add", data);

export const remove = (path: string) => action("@@tabs/remove", path);

export const clear = () => action("@@tabs/clear");
