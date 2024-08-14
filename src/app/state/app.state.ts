import { ActionReducerMap } from '@ngrx/store';
import { gameReducer } from './reducers/game.reducers';
import { configureReducer } from './reducers/configure.reducer';

export interface AppState {
  game: any;
  configurations: number;
}

export const appReducer: ActionReducerMap<AppState> = {
  game: gameReducer,
  configurations: configureReducer
};
