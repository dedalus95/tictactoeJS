const Gameboard = (() => {
  let array = [];

  const pushItemsToArray = (i, item) => {
    array[i] = item;
  }

  const getArray = () => array;

  return {
    pushItemsToArray,
    getArray
  }
})();






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





function getContainer() {
  const container = document.getElementById('container');
  return container;
}






const addMarks = (e, mark) => {
  for(let i = 0; i < getContainer().children.length; i++) {  
      if(i == e.target.id) {
        Gameboard.pushItemsToArray(i, mark);
      }
  }

}






const render = () => {
  for(let i = 0; i < Gameboard.getArray().length; i++) {
      if(i == getContainer().children[i].id && Gameboard.getArray()[i] != undefined) {
            getContainer().children[i].innerHTML = Gameboard.getArray()[i];
      }
  }
}
 





//WINNING REGION
const winningCombinations = () => {
  const winCombos = [[0,1,2], [0,4,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8]]

  return winCombos;
}







const checkWinner = (mark) => {
  let tempArr = [];
    
    Gameboard.getArray().forEach((v,i,a) => {
      if(v === mark) {
        tempArr.push(i);
      }
    })
  
  return tempArr;
}







const declareWinner = (mark) => {
  for(let i = 0; i < winningCombinations().length; i++) {
    if(winningCombinations()[i].every(wC => checkWinner(mark).includes(wC))) {
      console.log(winningCombinations()[i]);
      return true;
    }
  }
}





const DisplayController = (() => {
  const player1 = Player('x', 'Ema');
  const player2 = Player('o', 'marc');

  const playX = (e) => {
    addMarks(e, player1.getPlayerSymbol())
    render();
    console.log(Gameboard.getArray());

  };
  

  const playO = (b) => {
    addMarks(b, player2.getPlayerSymbol())
    render();
    console.log(Gameboard.getArray());

  };
  


  const game = () => {
    let ATurn = true;
    getContainer().addEventListener('click', function(e) {
    if(ATurn) {
      playX(e);
    }
    else {
      playO(b);
    }

  ATurn != ATurn;
  })

}

  


  return {
    game
  }



})();

DisplayController.game();





