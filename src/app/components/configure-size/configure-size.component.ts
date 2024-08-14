import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setBoardSize } from '../../state/actions/configure.actions';
import { CommonModule } from '@angular/common';
import { resetState, setAllWinningRows, setCurrentBoard, setGameStatus } from '../../state/actions/game.actions';
import { FormsModule } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectCurrentPlayer, selectGameStatus, selectWinner } from '../../state/selectors/game.selectors';
import { varConstants } from '../../constants/constant';

@Component({
  selector: 'app-configure-size',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configure-size.component.html',
  styleUrl: './configure-size.component.scss'
})
export class ConfigureSizeComponent implements OnInit{
  sizes: string [] = varConstants.sizeOptions;
  boardSize : number = varConstants.defaulSize;
  currentWinner$!: Observable<string>;
  currentPlayer$!: Observable<string>;
  gameStatus$!:Observable<any>;
  startMessage= varConstants.startGameMessage;
  private destroy$ = new Subject<void>();
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.initiateBoard(this.boardSize);
    this.generatePossibleWinningCombination();
    this.currentWinner$ = this.store.select(selectWinner);
    this.currentPlayer$ = this.store.select(selectCurrentPlayer);
    this.gameStatus$ = this.store.select(selectGameStatus);
    
    this.gameStatus$
    .pipe(takeUntil(this.destroy$))
    .subscribe(ele=>{
    //  Whenever status changes
     this.generatePossibleWinningCombination();
     } 
    )
  }

  // Update board as per selected size
  onSizeChange(event: Event) {
    const size = +(event.target as HTMLSelectElement).value;
    this.boardSize = size;
    this.store.dispatch(setBoardSize({ size }));
    this.store.dispatch(setGameStatus({gameStatus:'New'}))
    this.initiateBoard(size)
    this.generatePossibleWinningCombination();
  }

  startNewGame(){
    this.store.dispatch(resetState());
    this.store.dispatch(setBoardSize({ size:this.boardSize }));
    this.initiateBoard(this.boardSize );
    this.store.dispatch(setGameStatus({gameStatus:'InProgress'}))
  }

  trackByRow(index: number, row: any) {
    return row.id;
  }


  endGame(){
    this.store.dispatch(resetState());
    this.store.dispatch(setBoardSize({ size:this.boardSize }));
    this.initiateBoard(this.boardSize );
    this.store.dispatch(setGameStatus({gameStatus:'Exited'}))
  }

  // all possible row/col winning combination for given size of board  
  generatePossibleWinningCombination() {
    const arrCombo = [];

    // rows 
  for (let i = 0; i < this.boardSize; i++) {
    arrCombo.push([...Array(this.boardSize)].map((_, j) => i * this.boardSize + j));
  }

  // column
  for (let i = 0; i < this.boardSize; i++) {
    arrCombo.push([...Array(this.boardSize)].map((_, j) => j * this.boardSize + i));
  }

  // Diagonals
  const rightDiagonal = [...Array(this.boardSize)].map((_, i) => i * this.boardSize + i);
  const leftDiagonal = [...Array(this.boardSize)].map((_, i) => i * this.boardSize + (this.boardSize - i - 1));
  arrCombo.push(rightDiagonal, leftDiagonal);
  this.store.dispatch(setAllWinningRows({rows:arrCombo}))
  }

  // create array to display board for given size
  initiateBoard(size:number): any {
    let currentBoard = Array.from({ length:size*size }, () => '');
    this.store.dispatch(setCurrentBoard({board: currentBoard}))
  }
  
  // Unsubscribe
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
