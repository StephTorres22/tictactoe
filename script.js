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

    return {displayBoard}

 })();


const gameFlow =(() => {

    let turn = playerOne.turn

    //should be called immediately so the onclick is there
    cells.forEach((cell, index) => cell.addEventListener('click', () => {
        if(turn == playerOne.turn){
            gameBoard.gameBoardArray.splice(index, 1, playerOne.marker)
            displayController.displayBoard()            
        } else if(turn == playerTwo.turn){
            gameBoard.gameBoardArray.splice(index, 1, playerTwo.marker)
            displayController.displayBoard()
            
        }
        //doesn't need to be in the if else statement, this avoids duplication. you're doing it anyway.
        swapTurn()
        decideWinner()

    }, {once:true}))

    //switchs turns between players based on a number
    const swapTurn = () => turn *= -1//saw this as a way to switch turns, couldn't get webdevsimplified ternary operator to work properly
   
    const decideWinner = () => {

        const winningCombos = [[1, 2, 3],
                               [4, 5, 6],
                               [7, 8, 9],
                               [1, 5, 9],
                               [3, 5, 7],
                               [1, 4, 7],
                               [2, 5, 8],
                               [3, 6, 9]]

        for ( i in winningCombos) {
            const combination = winningCombos[i];
            const gameCombo = [gameBoard[combination[0]], gameBoard[combination[1]], gameBoard[combination[2]]];

            const hasSomeoneWon =  gameBoard[combination[0]] == gameBoard[combination[1]] &&
                gameBoard[combination[1]] == gameBoard[combination[2]];

                if (hasSomeoneWon) {
                return gameBoard[combination[0]];
                }
        }


        /* is this a for loop over gameboard array?

        nested for loop
        need an if else statement to check if x values are present at x indices

        .includes() looks at the array as a whole, how do i specify at a certain point
        does this index have this value

        forEach combination
         */

        const getEachCombo = () =>{

            for (i in winningCombos){
                let combination = winningCombos[i]
                //console.log(winningCombos[i])
                console.log(combination)

                combination.forEach(combo => console.log(gameBoard.gameBoardArray[combo-1])) //this is good, potential start to comparing values at winning combination indices.

            }

        }







        getEachCombo()
    }

    

    

    return { swapTurn, decideWinner }

})()



 





 



