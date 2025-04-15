import { WINNER_COMBO } from "../constans";


export const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    // para ver si x u o ganó
    for (const combo of WINNER_COMBO) {
      const [a,b,c,] = combo;
        if(boardToCheck[a] && // 0 -> x u o
          boardToCheck[a] === boardToCheck[b] && // 0 y 3 -> x  -> x u o -> x
          boardToCheck[a] === boardToCheck[c]
        ){
          return boardToCheck[a]
        }
    }
    // si no hay ganador
    return null;
  }

export const checkEndGame = (newBoard) => {
    // revisamos si hay un empate
    // si no hay más espacios vacíos
    // en el tablero

    return newBoard.every((square) => square !== null)

  }
