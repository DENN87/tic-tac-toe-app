import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

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

    // squares array [x,null,null,null,x,null,null,null,x]
    for (let i = 0; i < lines.length; i++) {
        //const [a, b, c] = lines[i];
        const a = lines[i][0];
        const b = lines[i][1];
        const c = lines[i][2];
        if (
            squares[a].value &&
            squares[a].value === squares[b].value &&
            squares[a].value === squares[c].value
        ) {
            return { win: squares[a].value, winNumbers: lines[i] };
        }
    }
    return { win: null, winNumbers: null };
}

function Square(props) {
    return (
        <div
            id={props.cellNumber}
            className="square square-board fader-1"
            onClick={props.onClick}
        >
            {props.value}
        </div>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                cellNumber={i}
                value={this.props.squares[i].value}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div className="col">
                <div className="row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="row">
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
                    squares: Array(9)
                        .fill({ value: null, isWinner: null })
                        .map((a) =>
                            Object.assign({ value: null, isWinner: null }, a)
                        ),
                },
            ],
            xIsNext: true,
            stepNumber: 0,
            whoWinner: null,
            stepWinner: null,
        };
    }

    resetGame() {
        document.getElementById("reset").onclick = () => {
            // removing Highlighted winner classes
            for (let i = 0; i <= 8; i++) {
                document
                    .getElementById(i)
                    .classList.remove(
                        "squareWinner",
                        "game-over",
                        "disable-squares"
                    );
            }
            document
                .getElementById("square-winner")
                .classList.remove("textWinner");
            document
                .getElementById("status-message")
                .classList.remove("game-over-text");
            document
                .getElementById("status-message")
                .classList.remove("centered");

            let squareArray = document.getElementsByClassName("square-board");
            for (let i = 0; i < squareArray.length; i++) {
                squareArray[i].classList.remove("disable-squares");
            }
            // Reseting the the State props to null
            this.setState({
                history: [
                    {
                        squares: Array(9)
                            .fill({ value: null, isWinner: null })
                            .map((a) =>
                                Object.assign(
                                    { value: null, isWinner: null },
                                    a
                                )
                            ),
                    },
                ],
                xIsNext: true,
                stepNumber: 0,
                whoWinner: null,
                stepWinner: null,
            });
        };
    }

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

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const newSquaresToAdd = current.squares.slice();

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
        this.setState({
            history: history.concat([
                {
                    squares: newSquaresToAdd,
                },
            ]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });

        const getWinner1 = calculateWinner(newSquaresToAdd);

        // WINNER FOUND, show Winner & CURRENT STEP
        if (getWinner1.win) {
            this.setState({
                whoWinner: getWinner1.win,
                stepWinner: history.length,
            });

            // ---- Highlighting  the winner squares-----
            for (let i = 0; i <= 2; i++) {
                document
                    .getElementById(`${getWinner1.winNumbers[i]}`)
                    .classList.add("squareWinner", "fader-0");
                setTimeout(() => {
                    // adding fade out & fade in effect for winner squares
                    document
                        .getElementById(`${getWinner1.winNumbers[i]}`)
                        .classList.remove("fader-0");
                }, 700);
            }

            // ---- Highlighting the Winner X or O
            document
                .getElementById("square-winner")
                .classList.add("textWinner");
            document.getElementById("status-message").classList.add("centered");

            // ---- Disabling any click or pointer hover events
            let squareArray = document.getElementsByClassName("square-board");
            for (let i = 0; i < squareArray.length; i++) {
                squareArray[i].classList.add("disable-squares");
            }

            // ---- Reseting the game, RESET BUTTON ----
            this.resetGame();
        } else {
            // no winner found STEPWINNER MUST BE NULL
            this.setState({
                stepWinner: null,
            });
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const currentStep = this.state.stepNumber;

        const moves = history.map((step, move) => {
            const desc = move ? "Go to move #" + move : "Go to move #0";
            return (
                <p
                    className={
                        currentStep === move
                            ? "selected btn btn-light"
                            : "btn btn-light"
                    }
                    onClick={() => this.jumpTo(move)}
                >
                    {desc}
                </p>
            );
        });

        let statusWinner;
        let statusMessage;
        if (
            this.state.whoWinner &&
            this.state.stepNumber === this.state.stepWinner
        ) {
            statusWinner = this.state.whoWinner;
            statusMessage = "Winner";
        } else if (this.state.stepNumber === 9) {
            // after game over go to earlier step works
            statusMessage = "Game Over";
            // game over css
            for (let i = 0; i <= 8; i++) {
                document
                    .getElementById(i)
                    .classList.add("game-over", "disable-squares");
            }
            document
                .getElementById("status-message")
                .classList.add("game-over-text");
            document.getElementById("status-message").classList.add("centered");

            // ---- Reseting the game, RESET BUTTON ----
            this.resetGame();
        } else if (this.state.stepNumber !== this.state.stepWinner) {
            statusWinner = this.state.xIsNext ? "X" : "O";
            statusMessage = "'s turn";
        }

        return (
            <React.Fragment>
                <div className="mt-5">
                    <div className="d-flex">
                        <div className="">
                            <div
                                id="square-winner"
                                className="square status-winner"
                            >
                                {statusWinner}
                            </div>
                        </div>
                        <div className="flex-grow-1 status-message">
                            <div id="status-message" className="">
                                {statusMessage}
                            </div>
                        </div>
                        <div className="reset-div">
                            <button
                                id="reset"
                                type="button"
                                className="btn btn-dark btn-lg"
                            >
                                RESET
                            </button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center game-board mt-5">
                        <div className="">
                            <Board
                                squares={current.squares}
                                onClick={(i) => this.handleClick(i)}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById("root"));
