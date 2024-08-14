import { Action, createReducer, on } from '@ngrx/store';
import { setBoardSize } from '../actions/configure.actions';
import { resetState } from '../actions/game.actions';

export const initialState = 3;
const _configureReducer = createReducer(
    initialState,
    on(setBoardSize, (state, { size }) => size),
    on(resetState, () => initialState),

);

export function configureReducer(state: number | undefined, action: Action<string>) {
    return _configureReducer(state, action);
}


