import { CommonModule } from '@angular/common';
import {  Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest, takeUntil } from 'rxjs';
import { BoardState } from '../../state/models/board.model';
import { selectAllWinningRows, selectCurrentBoard, selectGameStatus, selectHighLightRow, selectWinner } from '../../state/selectors/game.selectors';
import {  setCurrentPlayer, setGameStatus } from '../../state/actions/game.actions';
import { BoxComponent } from './box/box.component';
import { selectBoardSize } from '../../state/selectors/configure.selectors';
import { varConstants } from '../../constants/constant';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, BoxComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent {

  currentSize$!: Observable<string>
  currentSizeArray: any[] = []
  private destroy$ = new Subject<void>();
  drawMessage = varConstants.drawMessage;
  exitMessage = varConstants.gameExitMessage;
  currentBoardState: BoardState = {
    size: 3,
    cells: {
      row: 0,
      col: 0,
      value: ''
    },
    gameStatus:'New',
    currentPlayer: 'X',
    allWinningRows: [],
    highLightRow:[],
    currentBoard: [],
    winner: 'None'
  }

  currentBoard$!: Observable<string[]>;
  possibleWinningCombo$!:Observable<number[][]>;
  currentPlayer$!:Observable<any>;
  highLightRow$!:Observable<any>;
  gameStatus$!: Observable<any>; 

  winner$!: Observable<string>;
  constructor(private store: Store<BoardState>) { 
  }

 
  ngOnInit() {
    this.setRandomPlayer();
    this.store.dispatch(setGameStatus({gameStatus:'New'}))
    this.winner$ = this.store.select(selectWinner);
    this.gameStatus$ = this.store.select(selectGameStatus); 

    this.currentBoard$ = this.store.select(selectCurrentBoard);
    this.currentBoard$
    .pipe(takeUntil(this.destroy$))
    .subscribe(board => {
      // Current board updated
      this.currentBoardState.currentBoard = board;
    });

    this.possibleWinningCombo$ = this.store.select(selectAllWinningRows);
    this.possibleWinningCombo$
    .pipe(takeUntil(this.destroy$))
    .subscribe(rows=>{
      // Winning rows updated
      this.currentBoardState.allWinningRows = rows;
    });

    this.highLightRow$ = this.store.select(selectHighLightRow);
    this.highLightRow$
    .pipe(takeUntil(this.destroy$))
    .subscribe(row=>{
      // rows to highlight updated
       this.currentBoardState.highLightRow = row
    })

    this.currentSize$ = this.store.select(selectBoardSize);
    this.currentSize$
    .pipe(takeUntil(this.destroy$))
    .subscribe(size => {
      // Board size updated
      this.setRandomPlayer();
      this.currentBoardState.size = +size;
      this.currentSizeArray = Array.from({ length: +size }, (_, index) => ({ id: index + 1, value: index + 1 }))
    });

  }

  // make random turn to start with 'X' or 'O'
  setRandomPlayer() {
    let _currentPlayer: any = (Math.random() < 0.5) === true ? 'X' : 'O';
    this.currentBoardState.currentPlayer = _currentPlayer;
    this.store.dispatch(setCurrentPlayer({currentPlayer: _currentPlayer}));
  }

  trackByRow(index: number, row: any) {
    return row.id;
  }

  // Unsubscribe
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}


