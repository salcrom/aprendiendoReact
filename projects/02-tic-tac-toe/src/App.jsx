import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Square } from './components/Square';
import { TURNS } from './constans';
import { checkWinner, checkEndGame } from './logic/board';
import { saveGameToStorage, resetGameToStorage } from './logic/storage';
import { WinnerModal } from './components/WinnerModal';
import './App.css';



function App() {
    // const [board, setBoard] = useState(['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x']);
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if(boardFromStorage)return JSON.parse(boardFromStorage)
      return Array(9).fill(null)
    });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  });
  const [winner, setWinner] = useState(null); // null: no hay ganador y false: hay un empate

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameToStorage()
  }

  const updateBoard = (index) => {
    // No actualizamos posición
    // si ya tiene algo
    if(board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn // 'x' u 'o'
    setBoard(newBoard);
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // Guardar aquí la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    // Revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if(newWinner){
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)){
      setWinner(false); // empate
    }
  }

  useEffect(() => {
    console.log('useEffect')
  }, [])
  

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App
