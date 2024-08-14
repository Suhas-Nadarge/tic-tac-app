import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoardState, Cell } from '../../../state/models/board.model';
import { Observable } from 'rxjs';
import { setCurrentBoard, setCurrentPlayer, setGameStatus, setHighLightRow, setWinner } from '../../../state/actions/game.actions';
import { selectGameStatus, selectHighLightRow, selectWinner } from '../../../state/selectors/game.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss'

})
export class BoxComponent implements OnInit {

  @Input() currentBoardState!: BoardState
  @Input() cell!: Cell;

  currentWinner$!: Observable<any>;
  highlightRows$!: Observable<any>;

  totalCount: number = 0;
  index: number = 0;
  gameStatus$!: Observable<"New" | "InProgress" | "Completed" | "Exited">;
  constructor(private store: Store<BoardState>) {

  }

  ngOnInit(): void {
    this.currentWinner$ = this.store.select(selectWinner);
    this.gameStatus$ = this.store.select(selectGameStatus);
    this.highlightRows$ = this.store.select(selectHighLightRow);
    
    this.gameStatus$.subscribe(ele=>{
      if(this.currentBoardState.currentBoard.every(ele=>ele === '')){
        this.cell.value ='' 
      }
    })
    
  }

  buttonClicked() {
    this.totalCount = this.currentBoardState.currentBoard.filter(ele => ele !== '').length;
    if (this.totalCount > 0) {
      this.currentBoardState.currentPlayer = this.currentBoardState.currentPlayer === 'X' ? 'O' : 'X'
    }
    this.index = ((this.cell.row) * Number(this.currentBoardState.size)) + (Number(this.cell.col))
    if (this.currentBoardState.currentBoard[this.index] == '') {
      this.cell.value = this.currentBoardState.currentPlayer;
      this.store.dispatch(setCurrentPlayer({ currentPlayer: this.cell.value }));
      this.currentBoardState.currentBoard = this.currentBoardState.currentBoard.map((value, _index) => _index === this.index ? value = this.cell.value : value = value);
      this.store.dispatch(setCurrentBoard({ board: this.currentBoardState.currentBoard }));
    }
    this.checkWinner();
  }

  checkWinner() {
    if (this.totalCount > Number(this.currentBoardState.size) && Number(this.currentBoardState.size)>2 || Number(this.currentBoardState.size) == 2 ) {
       //No need to check winner - win is impossible when (total moves <= size of board applicable for all except n=2)

      let comparableArray = this.filterWinningRows(this.currentBoardState.allWinningRows, this.index);
      // filter among winning rows with the combination we will have with current index

      comparableArray.forEach((ele: []) => {
        let subArray = ele;
        let result = subArray.every(ele => this.currentBoardState.currentBoard[ele] === this.currentBoardState.currentPlayer);
        if (result) {
          // find boxes to highlight
          this.currentBoardState.highLightRow = [...subArray]
          this.store.dispatch(setGameStatus({ gameStatus: 'Completed' }))
          this.store.dispatch(setHighLightRow({ highlightRow: subArray }))
          this.store.dispatch(setWinner({ winner: this.currentBoardState.currentPlayer }));
        } else {
          // when running out of boxes and no match -> draw condition
          if (this.totalCount === (this.currentBoardState.size * this.currentBoardState.size) - 1) {
            this.store.dispatch(setGameStatus({ gameStatus: 'Completed' }))
            console.log('draw');
            this.store.dispatch(setWinner({ winner: '' }))
          }
        }
      })
    }
  }

  filterWinningRows(arr: any, index: any): any {
    return arr.filter((element: any) => element.includes(index))
  }
}
