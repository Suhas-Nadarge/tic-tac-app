import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardState } from '../models/board.model';


export const selectGameState = createFeatureSelector<BoardState>('game');

export const selectAllWinningRows = createSelector(
    selectGameState,
    (state) => state.allWinningRows
);

export const selectCurrentBoard = createSelector(
    selectGameState,
    (state) => state.currentBoard
);

export const selectCurrentPlayer = createSelector(
    selectGameState,
    (state) => state.currentPlayer
);

export const selectWinner = createSelector(
    selectGameState,
    (state) => state.winner
);

export const selectHighLightRow = createSelector(
    selectGameState,
    (state) => state.highLightRow
);

export const selectGameStatus = createSelector(
    selectGameState,
    (state) => state.gameStatus
);

export const selectPreviousSession = createSelector(
    selectGameState,
    (state) => state.currentBoard
  );

