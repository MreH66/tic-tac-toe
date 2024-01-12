import { useState } from "react";

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

let player1Arr = [];

let player2Arr = [];

let curentPlayer = false;

let gameFinished = false;

function Boxes({ fun1, num }) {
  const [value, setValue] = useState();

  return (
    <div
      onClick={() => {
        if (value === undefined && gameFinished === false) {
          fun1(num, curentPlayer);
          setValue(curentPlayer ? "O" : "X");
          curentPlayer = !curentPlayer;
        }
      }}
      className="mainBox"
    >
      <p>{value}</p>
    </div>
  );
}

function App() {
  const [massgage, setMassage] = useState("");

  function handleClick(num, playerTurn) {
    if (!playerTurn) {
      player1Arr.push(num);
    } else {
      player2Arr.push(num);
    }

    lines.forEach((arr) => {
      if (arr.every((r) => player1Arr.includes(r))) {
        gameFinished = true;
        setMassage("X WON");
      }

      if (arr.every((r) => player2Arr.includes(r))) {
        gameFinished = true;
        setMassage("O WON");
      }
    });

    const ArrayTogether = player1Arr.concat(player2Arr);
    if (ArrayTogether.length === 9 && gameFinished === false) {
      gameFinished = true;
      setMassage("board filled");
    }
  }

  function restartGame() {
    window.location.reload();
  }

  return (
    <div className="all">
      <h2>Hello</h2>
      <div className="box1">
        <div>
          <Boxes fun1={handleClick} num={0} />
          <Boxes fun1={handleClick} num={1} />
          <Boxes fun1={handleClick} num={2} />
        </div>
        <div>
          <Boxes fun1={handleClick} num={3} />
          <Boxes fun1={handleClick} num={4} />
          <Boxes fun1={handleClick} num={5} />
        </div>

        <div>
          <Boxes fun1={handleClick} num={6} />
          <Boxes fun1={handleClick} num={7} />
          <Boxes fun1={handleClick} num={8} />
        </div>
      </div>
      <h2>{massgage}</h2>
      {gameFinished ? <button onClick={restartGame}>Restart</button> : <></>}
    </div>
  );
}

export default App;
