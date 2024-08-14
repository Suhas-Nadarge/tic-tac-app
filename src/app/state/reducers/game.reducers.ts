import {  createReducer, on } from '@ngrx/store';
import {  resetState, setAllWinningRows, setCurrentBoard, setCurrentPlayer, setGameStatus, setHighLightRow, setWinner } from '../actions/game.actions';
import { BoardState } from '../models/board.model';

const initialState: BoardState = {
    size: 3,
    cells: {
        row: 0,
        col: 0,
        value: ''
    },
    highLightRow :[],
    currentPlayer: 'X' || 'O',
    allWinningRows: [],
    currentBoard: [],
    winner: 'None',
    gameStatus:'New'
};

export const gameReducer = createReducer(
    initialState,
    on(setAllWinningRows, (state, { rows }) => ({
        ...state,
        allWinningRows: rows
    })),
    on(setCurrentBoard, (state, { board }) => ({
        ...state,
        currentBoard: board
    })),
    on(setCurrentPlayer, (state, { currentPlayer }) => ({
        ...state,
        currentPlayer
    })),
    on(setWinner, (state, { winner }) => ({
        ...state,
        winner
    })),
    on(setHighLightRow, (state, { highlightRow }) => ({
        ...state,
        highlightRow
    })),
    on(setGameStatus, (state, { gameStatus }) => ({
        ...state,
        gameStatus
    })),
    on(resetState, () => initialState),
);

//   export const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];