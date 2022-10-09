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
    
    const gameBoardArray = ["1","2","3","4","5","6","7", "8", "9"] 
    
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

        

        const winnerDiv = document.createElement('div');
        body.appendChild(winnerDiv);
        winnerDiv.style.textAlign = 'center';
        let winnerTag = document.createElement('h1');
        
        winnerDiv.classList.add('winner');       
        winnerDiv.appendChild(winnerTag);
        
        winnerTag.style.textAlign = 'center'; 

        function removerWinnerDiv(){
            body.removeChild(winnerDiv)
        }
        
        function createRestartButton(){

            let restartButton = document.createElement('button');
            winnerDiv.appendChild(restartButton);
            restartButton.innerText = "Play again";
            restartButton.addEventListener('click', gameFlow.resetGame);
            restartButton.addEventListener('click', removerWinnerDiv);

        }
        

        if (gameFlow.decideWinner() == playerOne.marker){
            for (i in cells){
                cells[i].innerText = playerOne.marker
                
            }            
            winnerTag.innerText = 'Player ' + `${playerOne.name}` + " has won!"        
            createRestartButton()
            gameFlow.gameOver()
        } else if (gameFlow.decideWinner() == playerTwo.marker){
            for (i in cells){
                cells[i].innerText = playerTwo.marker
            }            
            winnerTag.innerText = 'Player ' + `${playerTwo.name}` + ' has won!'
            createRestartButton()
            gameFlow.gameOver()
        } else if (gameFlow.decideWinner() == 'Tie'){
            winnerTag.innerText = 'It\'s a tie!'
            createRestartButton()
            gameFlow.gameOver()
        }

        // can probably rearrange this code so game over calls the display, and so remove repeatition of function calls.

    }

    return {displayBoard, gameOverDisplay}

 })();


const gameFlow =(() => {
    
    let turn = playerOne.turn
    

    //should be called immediately so the onclick is there as in gameflow iefi

    //checks against whether a marker has been placed, in relevant cell, does not allow player to place in occupied cell.



    for (i in gameBoard.gameBoardArray){
        if (gameBoard.gameBoardArray[i] !== playerOne.marker || playerTwo.marker){
            cells.forEach((cell, index) => cell.addEventListener('click', () => {
                if(turn == playerOne.turn && gameBoard.gameBoardArray[index] !== playerTwo.marker){
                    gameBoard.gameBoardArray.splice(index, 1, playerOne.marker)
                    swapTurn()
                                
                } else if(turn == playerTwo.turn && gameBoard.gameBoardArray[index] !== playerOne.marker){
                    gameBoard.gameBoardArray.splice(index, 1, playerTwo.marker)
                    swapTurn()
                    
                }
            }))
        }
    }
    

    cells.forEach(cell => cell.addEventListener('click', displayController.displayBoard, {once : true}));
    

    //switchs turns between players based on a number
    const swapTurn = () => turn *= -1//saw this as a way to switch turns, couldn't get webdevsimplified ternary operator to work properly
  
    //returns either playerOne.marker or playerTwo.marker
    const decideWinner = () => {

            

            const _winningCombos = [[0, 1, 2],
                               [3, 4, 5],
                               [6, 7, 8],
                               [0, 4, 8],
                               [2, 4, 6],
                               [0, 3, 6],
                               [1, 4, 7],
                               [2, 5, 8]]
        

            for (i in _winningCombos){

                //breaks down winningCombos array into single combinations does not alter winningCombos 
                const combination = _winningCombos[i]

                //creates indiviual arrays from gameboardarray using values from indexes of each winning combination
                const gameCombo = [gameBoard.gameBoardArray[combination[0]], gameBoard.gameBoardArray[combination[1]], gameBoard.gameBoardArray[combination[2]]];
                
                //checks values at indexes to see if equal, type boolean
                const hasSomeoneWon =  gameCombo[0] == gameCombo[1] &&
                    gameCombo[1] == gameCombo[2];

                const gameBoardFull = gameBoard.gameBoardArray.every((value) => value == playerOne.marker && playerTwo.marker)    
                        
                //uses boolean and returns value if true.
                if (hasSomeoneWon) {
                return gameCombo[1];
                } else if (!gameBoardFull){ return 'Tie' }
                    return 'Tie'
                
            }
        }

     
    cells.forEach(cell => cell.addEventListener('click', displayController.gameOverDisplay, {once : true}))

     const gameOver = () => {

        //stops the board from updating once game, over has been called  
        cells.forEach(cell => cell.removeEventListener('click', displayController.gameOverDisplay))
        cells.forEach(cell => cell.removeEventListener('click', displayController.displayBoard))
      
        
    }


    const resetGame = () => {

        gameBoard.gameBoardArray = ["1","2","3","4","5","6","7", "8", "9"]
        turn = playerOne.turn

        cells.forEach(cell => cell.addEventListener('click', displayController.displayBoard))
        cells.forEach(cell => cell.addEventListener('click', displayController.gameOverDisplay))
        displayController.displayBoard()
        
    }

   



    

    

    return { swapTurn, decideWinner, gameOver, resetGame }

})()




 



         

 



