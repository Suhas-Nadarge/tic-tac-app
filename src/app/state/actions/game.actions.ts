import { createAction, props } from '@ngrx/store';

export const resetState = createAction('[App] Reset State');

export const setAllWinningRows = createAction(
    'Game => Set all winning combination rows for given size board',
    props<{ rows: number[][] }>()
);
  
  export const setCurrentBoard = createAction(
    'Game => Set current board with X and O marked positions',
    props<{ board: Array<string> }>() 
  );
  
  export const setCurrentPlayer= createAction(
    'Game => Current player turn',
    props<{currentPlayer: 'X' | 'O' }>()
  )
 
  export const setWinner = createAction(
    'Game => Set winner name',
    props<{ winner: 'X' | 'O' | 'None' | ''}>() 
  );

  export const setGameStatus = createAction(
    'Game => Set gameStatus',
    props<{ gameStatus: 'New' | 'InProgress' | 'Completed' | 'Exited'}>() 
  );

  export const setHighLightRow = createAction(
    'Game =>  highlight winner row',
    props<{ highlightRow: Array<string> }>() 
  );
