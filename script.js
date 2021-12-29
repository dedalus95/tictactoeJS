const Gameboard = (() => {
  let array = [];

  const pushItemsToArray = (item) => {
    array.push(item);
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






const addMarks = (mark) => {
        Gameboard.pushItemsToArray(mark); 
}






const render = () => {
  for(let i = 0; i < Gameboard.getArray().length; i++) {
     {
            getContainer().children[i].innerHTML = Gameboard.getArray()[i];
}
 
  }}




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

  const play = (player) => {
    addMarks(player.getPlayerSymbol())
    render();
    console.log(Gameboard.getArray());

  };
  


  
  
  const game = () => {

   document.getElementById('container').addEventListener('click', () => {
    let ATurn = true;

    if(ATurn) {
      play(player1);
    }
    else {
      play(player2);
    }
  
  ATurn = !ATurn;
   

})
  }
  


  return {
    game
  }



})();

DisplayController.game();





