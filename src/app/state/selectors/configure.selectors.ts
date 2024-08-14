import { createFeatureSelector, createSelector } from '@ngrx/store';


export const selectConfigState = createFeatureSelector<string>('config');
export const selectConfigure = (state: { configure: any; }) => state.configure;
export const selectBoardSize = createSelector(selectConfigState, (state) => state);
