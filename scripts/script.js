const Gameboard = (() => {
  let array = [];

  const pushItemsToArray = (i, item) => {
    array[i] = item;
    console.log('pushItemsToArray');

  }

  const getArray = () => array;
  const setArray = (newArr) => array = newArr;

  return {
    pushItemsToArray,
    getArray,
    setArray
  }
})();

//------------------------------------------------------------------

const Player = (symbol, name) => {
  let playerSymbol = symbol;
  let playerName = name;

  const getPlayerSymbol = () => playerSymbol;
  const getPlayerName = () => playerName;


  return {
    getPlayerName,
    getPlayerSymbol
  }
};

//------------------------------------------------------------------

function getEm(id) {
  const em = document.getElementById(id);
  console.log('getEm');
  return em;

}

//------------------------------------------------------------------

const addMarks = (e, mark) => {
  for (let i = 0; i < getEm('container').children.length; i++) {
    if (i == e.target.id) {
      Gameboard.pushItemsToArray(i, mark);
      console.log('addMarks');

    }
  }

}

//------------------------------------------------------------------

const render = () => {
  for (let i = 0; i < Gameboard.getArray().length; i++) {
    if (i == getEm('container').children[i].id && Gameboard.getArray()[i] != undefined) {
      getEm('container').children[i].innerHTML = Gameboard.getArray()[i];
      console.log('render');
    }
  }
}

//------------------------------------------------------------------

const WinningRegion = (() => {

  const winCombos = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]]

  const checkWinner = (mark) => {
    let tempArr = [];

    Gameboard.getArray().forEach((v, i) => {
      if (v === mark) {
        tempArr.push(i);
      }
    })
    console.log('checkWinner');

    return tempArr;
  }

  const declareWinner = (player) => {
    for (let i = 0; i < winCombos.length; i++) {
      if (winCombos[i].every(wC => checkWinner(player.getPlayerSymbol()).includes(wC))) {
        console.log('declareWinner');
        getEm('restart-div').children[0].textContent = player.getPlayerName() + " won! Would you have another try?";
        return true;
      }
    }
    if (!Gameboard.getArray().includes(undefined) && Gameboard.getArray().length === 9) {
      getEm('restart-div').children[0].textContent = "It's a draw! Would you have another try?";
      return true;
    }
  }


  return {
    declareWinner
  }

})();

//------------------------------------------------------------------

const funcc = () => {
  Gameboard.setArray([]);
  getEm('restart-div').classList.add('invisible');
  for (let q = 0; q < getEm('container').children.length; q++) {
    getEm('container').children[q].textContent = '';
    console.log('restartGame');
  }
}


const restartGame = () => {
  getEm('restart-div').classList.remove('invisible');
  getEm('yesBtn').addEventListener('click', funcc);
}

//------------------------------------------------------------------

const DisplayController = (() => {
  const p1Name = localStorage.getItem('p1Name');
  const p1Symbol = localStorage.getItem('p1Symbol');
  const p2Name = localStorage.getItem('p2Name');
  const p2Symbol = localStorage.getItem('p2Symbol');



  const player1 = Player(p1Symbol, p1Name);
  const player2 = Player(p2Symbol, p2Name);
  getEm('info').textContent = player1.getPlayerName() + ' plays first.';



  const play = (e, player) => {
    addMarks(e, player.getPlayerSymbol())
    render();
    console.log('play');
  };



  let ATurn = true;

  const switchTurns = (e) => {
    if (e.target.textContent == '') {
      if (ATurn) {
        play(e, player1);
      }

      else {
        play(e, player2);
      }

      ATurn = !ATurn;
    }

    if (
      WinningRegion.declareWinner(player1)
      ||
      WinningRegion.declareWinner(player2)
    ) {
      setTimeout(() => {
        restartGame();
      }, 400);

      ATurn = true;
    }
  }


  return {
    switchTurns
  }

})();

getEm('container').addEventListener('click', function (e) {
  DisplayController.switchTurns(e);
});






