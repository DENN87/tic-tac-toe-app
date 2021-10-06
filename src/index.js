<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
=======
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
>>>>>>> 2c8d2d0b7f182df11eadb00066d3143b60b9b45e

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
<<<<<<< HEAD
    // squares array [x,null,null,null,x,null,null,null,x]
    for (let i = 0; i < lines.length; i++) {
        //const [a, b, c] = lines[i];
        const a = lines[i][0];
        const b = lines[i][1];
        const c = lines[i][2];
        //console.log(squares[a]);
        if (
            squares[a].value &&
            squares[a].value === squares[b].value &&
            squares[a].value === squares[c].value
        ) {
            //console.log(squares[a]); // winnig squares to be color changed
=======
    for (let i = 0; i < lines.length; i++) {
        //const [a, b, c] = lines[i]; // deconstructor of the array
        const a = lines[i][0];
        const b = lines[i][1];
        const c = lines[i][2];
        if (squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value) {
>>>>>>> 2c8d2d0b7f182df11eadb00066d3143b60b9b45e
            return { win: squares[a].value, winNumbers: lines[i] };
        }
    }
    return { win: null, winNumbers: null };
<<<<<<< HEAD
}

function Square(props) {
    // console.log(props);
    return (
        <button
            id={props.cellNumber}
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
=======
};

function Square(props) {
    return (
        <button
            className={`square ${props.isWinner ? 'squareWinner' : ''}`}
            onClick={props.onClick}
        >
            {props.value}
        </button >
>>>>>>> 2c8d2d0b7f182df11eadb00066d3143b60b9b45e
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
<<<<<<< HEAD
                cellNumber={i}
                value={this.props.squares[i].value}
=======
                value={this.props.squares[i].value}
                isWinner={this.props.squares[i].isWinner}
>>>>>>> 2c8d2d0b7f182df11eadb00066d3143b60b9b45e
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
<<<<<<< HEAD
            <div className="">
=======
            <div className="mt-3">
>>>>>>> 2c8d2d0b7f182df11eadb00066d3143b60b9b45e
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
<<<<<<< HEAD
                    squares: Array(9)
                        .fill({ value: null, isWinner: null })
                        .map((a) =>
                            Object.assign({ value: null, isWinner: null }, a)
                        ),
                },
=======
                    squares: Array(9).fill({ value: null, isWinner: null }).map(a => Object.assign({ value: null, isWinner: null }, a)),
                }
>>>>>>> 2c8d2d0b7f182df11eadb00066d3143b60b9b45e
            ],
            xIsNext: true,
            stepNumber: 0,
            whoWinner: null,
            stepWinner: null,
        };
    }
<<<<<<< HEAD
    handleClick(i) {
        // click must be only on an empty cell
        for (
            let j = 0;
            j < this.state.history[this.state.stepNumber].squares.length;
            j++
        ) {
            if (
                this.state.history[this.state.stepNumber].squares[i].value !==
                null
            ) {
                return;
            }
        }

        //console.log(`clicked on cell i: ${i}`);
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        //console.log(JSON.stringify(history));

        const current = history[history.length - 1];
        //console.log(`click ${i}: ${JSON.stringify(history[this.state.stepNumber].squares[0].value)}`);

        const newSquaresToAdd = current.squares.slice();
        //console.log(`squares: ${JSON.stringify(squares)}`);

        for (let i = 0; i < newSquaresToAdd.length; i++) {
            newSquaresToAdd[i] = Object.assign({}, newSquaresToAdd[i]);
        }

        // IF WINNER IS FOUND NO CLICKS ALOUD
        if (
            this.state.whoWinner &&
            this.state.stepNumber === this.state.stepWinner
        ) {
            return;
        }
        newSquaresToAdd[i].value = this.state.xIsNext ? "X" : "O";
=======

    handleClick(i) {
        // click must be only on an empty cell
        for (let j = 0; j < this.state.history[this.state.stepNumber].squares.length; j++) {
            if (this.state.history[this.state.stepNumber].squares[i].value !== null) {
                return;
            }
        }
        //console.log(`clicked on cell i: ${i}`);
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        //console.log(JSON.stringify(history));
        const current = history[history.length - 1];
        //console.log(`click ${i}: ${JSON.stringify(history[this.state.stepNumber].squares[0].value)}`);
        const newSquaresToAdd = current.squares.slice();
        //console.log(`squares: ${JSON.stringify(squares)}`);
        for (let i = 0; i < newSquaresToAdd.length; i++) {
            newSquaresToAdd[i] = Object.assign({}, newSquaresToAdd[i]);
        }
        // IF WINNER IS FOUND NO CLICKS ALOUD
        if (this.state.whoWinner && (this.state.stepNumber === this.state.stepWinner)) {
            return;
        }
        newSquaresToAdd[i].value = this.state.xIsNext ? 'X' : 'O';
        const getWinner = calculateWinner(newSquaresToAdd);
        if (getWinner.win) {   // WINNER FOUND SET WHO & CURRENT STEP
            newSquaresToAdd[getWinner.winNumbers[0]].isWinner = true;
            newSquaresToAdd[getWinner.winNumbers[1]].isWinner = true;
            newSquaresToAdd[getWinner.winNumbers[2]].isWinner = true;
            this.setState({
                whoWinner: getWinner.win,
                stepWinner: history.length,
            });
        } else {    // no winner found STEPWINNER MUST BE NULL
            this.setState({
                stepWinner: null,
            });
        }
        // set state for the current step changes to the array
>>>>>>> 2c8d2d0b7f182df11eadb00066d3143b60b9b45e
        this.setState({
            history: history.concat([
                {
                    squares: newSquaresToAdd,
<<<<<<< HEAD
                },
=======
                }
>>>>>>> 2c8d2d0b7f182df11eadb00066d3143b60b9b45e
            ]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
<<<<<<< HEAD

        const getWinner1 = calculateWinner(newSquaresToAdd);

        if (getWinner1.win) {
            // WINNER FOUND SET WHO & CURRENT STEP
            this.setState({
                whoWinner: getWinner1.win,
                stepWinner: history.length,
                //history: history[this.state.stepNumber].squares[getWinner1.winNumbers[0]].isWinner = true,
            });

            // console.log(` winners: ${getWinner1.winNumbers[0]}`);
            // console.log(` winners: ${getWinner1.winNumbers[1]}`);
            // console.log(` winners: ${getWinner1.winNumbers[2]}`);

            // ---- Highlighting  he winner squares-----
            for (let i = 0; i <= 2; i++) {
                document
                    .getElementById(`${getWinner1.winNumbers[i]}`)
                    .classList.toggle("winner-cell");
            }

            //this.state.history[this.state.stepNumber].squares[getWinner1.winNumbers[0]].isWinner = true;
        } else {
            // no winner found STEPWINNER MUST BE NULL
            this.setState({
                stepWinner: null,
            });
        }
    }

    jumpTo(step) {
        //console.log(`Cliked jumTo step: ${step}`);
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0,
=======
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
>>>>>>> 2c8d2d0b7f182df11eadb00066d3143b60b9b45e
        });
    }

    render() {
        const history = this.state.history;
        //console.log(`history: ${JSON.stringify(history)}`);
<<<<<<< HEAD

        const current = history[this.state.stepNumber];
        //console.log(`this.state.stepNumber: ${this.state.stepNumber}`)
        //console.log(`current: ${JSON.stringify(current)}`);

        const currentStep = this.state.stepNumber;

        const moves = history.map((step, move) => {
            console.log(`Moves-> ${move}`);
            console.log(`Moves-> ${JSON.stringify(step)}`);

            const desc = move ? "Go to move #" + move : "Go to move #0";
            return (
                <li key={move}>
                    <button
                        className={currentStep === move ? "selected" : ""}
                        onClick={() => this.jumpTo(move)}
                    >
                        {desc}
                    </button>
=======
        const current = history[this.state.stepNumber];
        //console.log(`this.state.stepNumber: ${this.state.stepNumber}`)
        //console.log(`current: ${JSON.stringify(current)}`);
        const currentStep = this.state.stepNumber;
        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : '> Start Game';
            return (
                <li key={move}>
                    <button
                        className={currentStep === move ? 'selected' : ''}
                        onClick={() => this.jumpTo(move)}
                    >{desc}</button>
>>>>>>> 2c8d2d0b7f182df11eadb00066d3143b60b9b45e
                </li>
            );
        });

        let status;
<<<<<<< HEAD
        if (
            this.state.whoWinner &&
            this.state.stepNumber === this.state.stepWinner
        ) {
            status = "Winner: " + this.state.whoWinner;
        } else if (this.state.stepNumber === 9) {
            // after game over go to earlier step works
            status = "Game Over !";
        } else if (this.state.stepNumber !== this.state.stepWinner) {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
=======
        if (this.state.whoWinner && (this.state.stepNumber === this.state.stepWinner)) {
            status = `Winner: ${this.state.whoWinner}`;
        } else if (this.state.stepNumber === 9) { // after game over go to earlier step works
            status = `Game Over !`;
        } else if (this.state.stepNumber !== this.state.stepWinner) {
            status = `Next player: ${(this.state.xIsNext ? 'X' : 'O')}`;
>>>>>>> 2c8d2d0b7f182df11eadb00066d3143b60b9b45e
        }

        return (
            <React.Fragment>
<<<<<<< HEAD
                <div>
                    <h3>Tic Tac Toe Game</h3>
                    <div>{status}</div>
                    <div className="game">
                        <div className="game-board p-1">
=======
                <div><h3>Tic Tac Toe Game</h3>
                    <div className="game">
                        <div className="game-board p-1">
                            <div>{status}</div>
>>>>>>> 2c8d2d0b7f182df11eadb00066d3143b60b9b45e
                            <Board
                                squares={current.squares}
                                onClick={(i) => this.handleClick(i)}
                            />
                        </div>
<<<<<<< HEAD
                    </div>
                    <div>
                        <button
                            id="reset"
                            type="button"
                            className="btn btn-info btn-lg"
                        >
                            Reset
                        </button>
                    </div>
                    <div className="game-info mt-3 p-1">
                        <ol>{moves}</ol>
=======
                        <div className="game-info mt-5 p-1">
                            <ol>{moves}</ol>
                        </div>
>>>>>>> 2c8d2d0b7f182df11eadb00066d3143b60b9b45e
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

<<<<<<< HEAD
ReactDOM.render(<Game />, document.getElementById("root"));
=======
ReactDOM.render(<Game />, document.getElementById('root'));
>>>>>>> 2c8d2d0b7f182df11eadb00066d3143b60b9b45e
