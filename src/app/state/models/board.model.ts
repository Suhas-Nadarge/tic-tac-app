export interface BoardState {
    size: number;          
    cells: Cell;         
    currentPlayer: 'X' | 'O' ; 
    allWinningRows: number [][]; 
    currentBoard: string []
    highLightRow: any [] 
    winner: 'X' | 'O' | 'None' |''; 
    gameStatus: 'New' | 'InProgress' | 'Completed' | 'Exited';
  }
  
  export interface Cell {
    row: number; 
    col: number; 
    value: 'X' | 'O' | ''; 
  }

  export interface Config {
    size:string;
  }
  