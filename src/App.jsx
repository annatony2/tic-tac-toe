import { useState } from 'react'
import './App.css'

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function calculateResult(squares) {
  for (const line of WIN_LINES) {
    const [a, b, c] = line
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line }
    }
  }
  if (squares.every((s) => s !== null)) {
    return { winner: 'draw', line: null }
  }
  return null
}

// Coordinates (in a 300x300 board) of each square's center, used to draw
// the strike-through line across the three winning squares.
const CENTERS = [
  [50, 50], [150, 50], [250, 50],
  [50, 150], [150, 150], [250, 150],
  [50, 250], [150, 250], [250, 250],
]

function Square({ value, onClick, isWinning, disabled }) {
  return (
    <button
      className={`square ${value ? `square--${value.toLowerCase()}` : ''} ${
        isWinning ? 'square--winning' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
      aria-label={value ? `Square filled with ${value}` : 'Empty square'}
    >
      {value}
    </button>
  )
}

function WinLine({ line }) {
  if (!line) return null
  const [start, , end] = line
  const [x1, y1] = CENTERS[start]
  const [x2, y2] = CENTERS[end]
  return (
    <svg className="win-line" viewBox="0 0 300 300" aria-hidden="true">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
    </svg>
  )
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 })
  const [roundOver, setRoundOver] = useState(false)

  const result = calculateResult(squares)
  const winner = result?.winner ?? null

  function handleSquareClick(index) {
    if (squares[index] || winner) return

    const nextSquares = squares.slice()
    nextSquares[index] = xIsNext ? 'X' : 'O'
    setSquares(nextSquares)
    setXIsNext(!xIsNext)

    const nextResult = calculateResult(nextSquares)
    if (nextResult && !roundOver) {
      setRoundOver(true)
      setScores((prev) => {
        if (nextResult.winner === 'draw') {
          return { ...prev, draw: prev.draw + 1 }
        }
        return { ...prev, [nextResult.winner]: prev[nextResult.winner] + 1 }
      })
    }
  }

  function handleNewRound() {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
    setRoundOver(false)
  }

  function handleResetMatch() {
    handleNewRound()
    setScores({ X: 0, O: 0, draw: 0 })
  }

  let status
  if (winner === 'draw') {
    status = "It's a draw"
  } else if (winner) {
    status = `Player ${winner} wins`
  } else {
    status = `Player ${xIsNext ? 'X' : 'O'}'s turn`
  }

  return (
    <div className="page">
      <header className="header">
        <span className="eyebrow">Two players &middot; One board</span>
        <h1>Tic&thinsp;-&thinsp;Tac&thinsp;-&thinsp;Toe</h1>
      </header>

      <section className="scoreboard" aria-label="Match score">
        <div className="score-cell score-cell--x">
          <span className="score-label">Player X</span>
          <span className="score-value">{scores.X}</span>
        </div>
        <div className="score-cell score-cell--draw">
          <span className="score-label">Draws</span>
          <span className="score-value">{scores.draw}</span>
        </div>
        <div className="score-cell score-cell--o">
          <span className="score-label">Player O</span>
          <span className="score-value">{scores.O}</span>
        </div>
      </section>

      <p
        className={`status ${winner && winner !== 'draw' ? `status--${winner.toLowerCase()}` : ''}`}
        role="status"
        aria-live="polite"
      >
        {status}
      </p>

      <div className="board-wrap">
        <div className="board">
          {squares.map((value, index) => (
            <Square
              key={index}
              value={value}
              onClick={() => handleSquareClick(index)}
              disabled={Boolean(value) || Boolean(winner)}
              isWinning={result?.line?.includes(index) ?? false}
            />
          ))}
        </div>
        <WinLine line={result?.line} />
      </div>

      <div className="controls">
        <button className="btn btn--primary" onClick={handleNewRound}>
          {winner ? 'Play again' : 'Restart round'}
        </button>
        <button className="btn btn--ghost" onClick={handleResetMatch}>
          Reset match
        </button>
      </div>
    </div>
  )
}
