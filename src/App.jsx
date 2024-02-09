import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'




function App() {

  const [xIsNext, setXIsNext] = useState(true);

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);


  const [winner, setWinner] = useState(null)

  const [isGameOver, setIsGameOver] = useState(false)


  const currentSquares = history[currentMove];


  function handlePlay(nextSquares) {

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);

  }

  function jumpTo(nextMove) {
    setIsGameOver(false)
    setWinner(null)
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);

  }

  const [moveState, setMoveState] = useState("")

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move ' + move;
    } else {
      description = 'Go to game start';
    }

    const moveEven = move > 0 ? move % 2 : 1;

    return (
      <li className={`mx-4 my-2 rounded-md py-2 ${move === currentMove ? "bg-black text-white" : "bg-white text-black"} ${moveEven === 0 ? "hidden" : ""}`} key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  useEffect(() => {
    setMoveState(moves)
  }, [currentMove])

  useEffect(() => {
    scrollToRef()
  }, [history])

  const myRef = useRef(null);

  const scrollToRef = () => {
    if (myRef.current) {
      myRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="game flex  justify-center items-center  gap-x-[200px] max-md:flex-col h-screen max-md:gap-y-4">
      <div className="game-board">
        < Board xIsNext={xIsNext} squares={currentSquares} currentMove={currentMove} onPlay={handlePlay} board={history} isGameOver={isGameOver} winner={winner} setWinner={setWinner} setIsGameOver={setIsGameOver} />
      </div >

      <div className='board-row-2'>
        <ol className='moves-list'>{moveState}</ol>
        <p ref={myRef} className=''></p>
        <p className='h-16'></p>
      </div>

    </div >
  );


}

const Board = ({ xIsNext, squares, onPlay, board, isGameOver, setIsGameOver, setWinner, winner, currentMove }) => {


  const [isDraw, setIsDraw] = useState(false)





  useEffect(() => {
    const winner = calculateWinner(squares);

    if (winner) {
      setIsGameOver(true)
      setWinner(winner)
    }

  }, [board, squares, xIsNext])






  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "CPU");
  }

  useEffect(() => {

    const winner = calculateWinner(squares);


    if (!winner) {
      let draw = true;
      squares.map(el => {
        if (el === null) draw = false
      })

      setIsDraw(draw)
    }
  }, [squares])

  const handleClick = (i) => {

    const winner = calculateWinner(squares);



    const nextSquares = squares.slice();
    if (!nextSquares[i] && !winner) {

      if (xIsNext) {
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }
      onPlay(nextSquares);
    }


  }

  function generateRandomNumber() {
    let numerGenrated = Math.floor(Math.random() * 9)
    return numerGenrated
  }


  useEffect(() => {
    const winner = calculateWinner(squares);

    let draw = true;
    squares.map(el => {
      if (el === null) draw = false
    })


    if (!xIsNext && !winner && !draw) {
      let randomNumber = generateRandomNumber();
      const nextSquares = squares.slice();
      let isRandomProper = false
      while (isRandomProper === false && !isGameOver) {
        if (!nextSquares[randomNumber]) {
          nextSquares[randomNumber] = "O"
          onPlay(nextSquares);
          isRandomProper = true
        } else {
          randomNumber = generateRandomNumber()
        }
      }
    }


  }, [xIsNext, currentMove])


  return (
    <div className='screen'>


      {isDraw && <div>Match Is Draw</div>}
      {!isDraw && <div className="status">{status}</div>}
      <div className='row col-12 flex  justify-center  space-x-[200px] '>


        <div className="board-row ">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />

          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />

          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>

      </div>

    </div>



  )
}





const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Square = ({ value, onSquareClick }) => {

  let bgColor = value === "X" ? "red-col" : "";
  let zeroColor = value === "O" ? "blue-col" : "";

  return (<button className={`square ${bgColor} ${zeroColor}`} onClick={onSquareClick}>
    {value}
  </button>);
}

const Square1 = () => {
  const [value, setValue] = useState(null);

  const handleClick = () => {
    setValue('X');
    console.log('clicked!');
  }
  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}




export default App
