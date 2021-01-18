import React, {Component} from 'react'
import Square from './Square'

class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={i}
      />
    )
  }

  generateBoard() {
    const square = []
    let squareNumber = 0
    for (let i = 0; i < 3; i++) {
      square.push(<div key={i + this.props} className="board-row"/>)
      for (let j = 0; j < 3; j++) {
        square.push(this.renderSquare(squareNumber++))
      }
    }
    return <div>{square}</div>
  }

  render() {
    return (
      <div>
        {this.generateBoard()}
      </div>
    )
  }
}

export default Board
