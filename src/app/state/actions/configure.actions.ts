import { createAction, props } from '@ngrx/store';

export const setBoardSize = createAction(
  'Configurations => Set Board Size',
  props<{ size: number }>()
);


