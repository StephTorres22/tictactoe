/* TIC TAC TOE GAME */

/* 

    -- Set up your project with HTML, CSS and Javascript files and get the Git repo all set up.

    --  You’re going to store the gameboard as an array inside of a Gameboard object, so start there!
        Your players are also going to be stored in objects… and you’re probably going to want an
        object to control the flow of the game itself.
        Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory.
        Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.
        LOOK UP DIFFERENCE BETWEEN FACTORIES AND OJECTS AGAIN.

    -- Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage
      (for now you can just manually fill in the array with "X"s and "O"s).

    -- Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, 
       letting players click on the gameboard to place their marker. Don’t forget the logic that keeps players from playing in spots that are already taken!
        Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, 
        player or gameboard objects.. but take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!

    -- Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.

    -- Clean up the interface to allow players to put in their names, include a button to start/restart the game,
       and add a display element that congratulates the winning player!

    -- Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
        Start by just getting the computer to make a random legal move.
        Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI
        using the minimax algorithm (read about it here, some googling will help you out with this one)
        If you get this running definitely come show it off in the chatroom. It’s quite an accomplishment!

 */

//these are global so every function and module has access to them
const body = document.querySelector('body');
const gridContainer = document.querySelector('.gridContainer');
const cells = document.querySelectorAll('.cell')






const gameBoard = (() => {
    
    let gameBoardArray = ["1","2","3","4","5","6","7", "8", "9"] 
    
    return { gameBoardArray }
        
})();


const playerFactory = (name, marker, turn) => {
     
     return {name, marker, turn}

 }

 
 const playerOne = playerFactory('One', 'X', 1);
 const playerTwo = playerFactory('Two', 'O', -1);


 const displayController = (() => {

    //this is called straight away because displayController is an IIFE
    for (i in cells){
        cells[i].innerText = gameBoard.gameBoardArray[i]
    }
       
    //displays current element at index in correct cell
    //this is not called straight away, but can be called to update the display.
    const displayBoard = () => {

        for (i in cells){
            cells[i].innerText = gameBoard.gameBoardArray[i]
        }
    }

    const gameOverDisplay = () => {

        gameFlow.decideWinner()
        let winnerTag = document.createElement('h1');
        body.appendChild(winnerTag);
        winnerTag.style.textAlign = 'center';

        

        if (gameFlow.decideWinner() == playerOne){
            gameFlow.gameOver()//placed twice within each if statement because condition must be true before firing.
            for (i in cells){
                cells[i].innerText = playerOne.marker
                
            }
            winnerTag.innerText = 'Player ' + `${playerOne.name}` + " has won!"        
        } else if (gameFlow.decideWinner() == playerTwo){
            gameFlow.gameOver()
            for (i in cells){
                cells[i].innerText = playerTwo.marker
            }
            winnerTag.innerText = 'Player ' + `${playerTwo.name}` + ' has won!'
        }

        

    }

    return {displayBoard, gameOverDisplay}

 })();


const gameFlow =(() => {

    let turn = playerOne.turn

    //should be called immediately so the onclick is there
    cells.forEach((cell, index) => cell.addEventListener('click', () => {
        if(turn == playerOne.turn){
            gameBoard.gameBoardArray.splice(index, 1, playerOne.marker)
                        
        } else if(turn == playerTwo.turn){
            gameBoard.gameBoardArray.splice(index, 1, playerTwo.marker)
            
            
        }
        

    }, {once:true}))

    
    cells.forEach(cell => cell.addEventListener('click', displayController.displayBoard, {once : true}));
    

    //switchs turns between players based on a number
    const swapTurn = () => turn *= -1//saw this as a way to switch turns, couldn't get webdevsimplified ternary operator to work properly
    cells.forEach(cell => cell.addEventListener('click', swapTurn, {once : true}))
   
    //returns either playerOne or playerTwo
    const decideWinner = () => {

            const _winningCombos = [[1, 2, 3],
                               [4, 5, 6],
                               [7, 8, 9],
                               [1, 5, 9],
                               [3, 5, 7],
                               [1, 4, 7],
                               [2, 5, 8],
                               [3, 6, 9]]
        

            for (i in _winningCombos){

                //breaks down winningCombos array into single combinations does not alter winningCombos 
                const combination = _winningCombos[i]

                /* much like the forEach loop used on cells in displayController, this takes each individual combination and splices the values of
                gameboardArray at the correct index  */
                combination.forEach((combo, index) => {                 
                combination.splice(index, 1, gameBoard.gameBoardArray[combo-1]) //need -1 as haven't 0 indexed.                      
                })
            
            /* inside the loop so have access to combinations, on each iteration of winningCombos checks each value of individual combination
            to see if every value is == to a player maker. */
            if (combination.every((value) => value == playerOne.marker)){
              return  playerOne

            } else if (combination.every((value) => value == playerTwo.marker)){
               return playerTwo
            } 

            }
            
            

            /* NEED TO DO:
            
            - DEFINE DRAWER PARAMETERS
            
            - FUNCTION FOR WHEN SOMEONE HAS WON, REMOVE LISTENERS, ALERTS ETC
              GAMEOVER
            
            - RESTART BUTTON TO CLEAR ARRAYS AND BOARD
            */
        }

        cells.forEach(cell => cell.addEventListener('click', decideWinner, {once : true}))
        cells.forEach(cell => cell.addEventListener('click', displayController.gameOverDisplay, {once : true}))

        const gameOver = () => {

          /*   let restartButton = document.createElement('button');
            body.appendChild(restartButton)
            restartButton.innerText = 'Player Again'
            restartButton.addEventListener('click', restartGame())
 */
            //removes relevant listeners

            cells.forEach(cell => cell.removeEventListener('click', displayController.displayBoard))
            cells.forEach(cell => cell.removeEventListener('click', swapTurn))
            
        
       

    }

    

    

    return { swapTurn, decideWinner, gameOver }

})()



 



                      /*
        for (i in winningCombos) {
            const combination = winningCombos[i];
            const gameCombo = [gameBoard.gameBoardArray[combination[0]], gameBoard.gameBoardArray[combination[1]], gameBoard.gameBoardArray[combination[2]]];

            const hasSomeoneWon =  gameCombo[[0] == gameCombo[1] &&
                gameCombo[1]] == gameCombo[2];

                if (hasSomeoneWon) {
                return gameCombo[1];
                }

            
        }
        */

 



