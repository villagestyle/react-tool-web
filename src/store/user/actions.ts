import { action } from 'typesafe-actions';
import { State } from './reducer';

export const toggle = (data?: State) => action("@@user/TOGGLE", data);
