const Gameboard = (() => {
  let array = [];

  const pushItemsToArray = (i, item) => {
    array[i] = item;
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
  return em;
}


//------------------------------------------------------------------



const addMarks = (e, mark) => {
  for (let i = 0; i < getEm('container').children.length; i++) {
    if (i == e.target.id) {
      Gameboard.pushItemsToArray(i, mark);
    }
  }

}


//------------------------------------------------------------------




const render = () => {
  for (let i = 0; i < Gameboard.getArray().length; i++) {
    if (i == getEm('container').children[i].id && Gameboard.getArray()[i] != undefined) {
      getEm('container').children[i].innerHTML = Gameboard.getArray()[i];
      console.log('is rendered')
    }
  }
}


//------------------------------------------------------------------


const WinningRegion = (() => {

  const winningCombinations = () => {
    const winCombos = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]]

    return winCombos;
  }

  const checkWinner = (mark) => {
    let tempArr = [];

    Gameboard.getArray().forEach((v, i) => {
      if (v === mark) {
        tempArr.push(i);
      }
    })

    return tempArr;
  }

  const declareWinner = (mark) => {
    for (let i = 0; i < winningCombinations().length; i++) {
      if (winningCombinations()[i].every(wC => checkWinner(mark).includes(wC))) {
        return true;
      }
    }
  }

  const declare = (player) => {
    if (declareWinner(player.getPlayerSymbol()))  {
      getEm('show-result').textContent = player.getPlayerName() + " won!";
      return true;
    } 
    else if(!Gameboard.getArray().includes(undefined) && Gameboard.getArray().length === 9) {
      getEm('show-result').textContent = "It's a draw!";
      return true;
    }

  }

  return {
    declare
  }

})();

//------------------------------------------------------------------

const restartGame = (func) => {
  Gameboard.setArray([]);
  getEm('container').removeEventListener('click', func);
  getEm('restart-div').classList.remove('invisible');

  getEm('yesBtn').addEventListener('click', () => {
    Gameboard.setArray([]);
    for(let q = 0; q < getEm('container').children.length; q++) {
      getEm('container').children[q].textContent = '';
      game();
    }
    getEm('show-result').textContent = '';
    getEm('restart-div').classList.add('invisible');
  })
}


//------------------------------------------------------------------


const DisplayController = (() => {
  const p1Name = localStorage.getItem('p1Name');
  const p1Symbol = localStorage.getItem('p1Symbol');
  const p2Name = localStorage.getItem('p2Name');
  const p2Symbol = localStorage.getItem('p2Symbol');



  const player1 = Player(p1Symbol, p1Name);
  const player2 = Player(p2Symbol, p2Name);



  const play = (e, player) => {
    addMarks(e, player.getPlayerSymbol())
    render();
  };



  const game = () => {
    let ATurn = true;

    
    getEm('container').addEventListener('click', function handle(e) {
      if(e.target.textContent == '') {
      if (ATurn) {
        play(e, player1);
      }

      else {
        play(e, player2);
      }

      ATurn = !ATurn;
    }
  

    if (WinningRegion.declare(player1) || WinningRegion.declare(player2)) {

    
        restartGame(handle)
  }



    })
  }

  return {
    game

  }
    
})();
  
DisplayController.game();





