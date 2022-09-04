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



//this is a module
//want to return the gameBoard so it can be edited by player action, placeMarker, 2D array? just arrays in an array
const GameBoard = (function(){
    
    let gameBoard = [
        [], //(gameBoard[0][i])
        [], //(gameBoard[1][i])
        []  //(gameBoard[2][i])
    ] //this is inaccessible to players in the private scope of this module. this needs to be made public

    //so could define a function that renders the game board to user here?

    //do i define a method for adding a marker to the game board here? as a private function, and call it publicly so it can be accessed by player?
        let _placeMarker = (marker) =>{
            gameBoard.push(marker)
        }

        //do i need different methods for first row, second row and third row
        // if gameBoard[0].length == 3 disable function / onclicks on row 1
    
    
    return {
        myMethod: function(){
            console.log(gameBoard)},
        _placeMarker 
        }
        

    

    
})();


//this is an object
function Player(name, marker){
    this.name = name
    this.marker = marker

    this.placeMarker = function(){

    }
}

//or a factory function
const playerFactory = (name, marker) => {

   // const placeMarker = (marker) => marker.GameBoard().push(marker);//will this work? NOPE
    
    return {name, marker, placeMarker}
}

const playerOne = playerFactory('One', 'X');
const playerTwo = playerFactory('Two', 'O');
//not sure how to make the markers public to be place, also gameboard is priv
//can you make an array with a max length? eg 3 maybe if row1.length === 3 