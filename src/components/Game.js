import React, {Component} from 'react'
import Board from './Board'
import {calculateWinner} from '../utils/utils';

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (calculateWinner(squares) || squares[i]) {
      return
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }

  handleButtonClick() {
    this.setState({
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc = move
        ? `Перейти к ходу # ${move}`
        : `К началу игры`

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status
    if (winner) {
      status = `Выиграл: ${winner}`

    } else {
      status = `Следующий ход: ${this.state.xIsNext ? 'X' : 'O'}`
    }

    return (
      <div className="game">
        <div className="game-board">
          <div className="status">{status}</div>
          <div>
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
            <div className="game-info">
              <ol>{moves}</ol>
            </div>
          </div>
          <button
            className="btn-clear"
            onClick={() => this.handleButtonClick()}
          >
            Clear
          </button>
        </div>
      </div>
    )
  }
}

export default Game
