///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Object with the board functionality
const gameBoard = ( () => {
    let board = ["1","2","o","?","x","o","@","o","t",];
    const boardSquares = Array.from(document.querySelectorAll('.boardSquare'));
    console.log(boardSquares);

    function addEventListeners(){
        boardSquares.forEach((square) =>{
            square.addEventListener("click", updateSquare)
        })
    }

    function updateSquare(e){
        //MAKE THE SQUARE SHOW THE PLAYER SIGN
        e.target.textContent = "T";
        e.target.removeEventListener("click", updateSquare);
    }

    function render(){
        for(i = 0; i < board.length; i++){
            boardSquares[i].textContent = board[i];
        }
    };

    return {render, addEventListeners};
})();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Player Factory Function
const Player = (name, sign) => {
    const active = false;
    return{name, sign, active}
};


// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Object with Game Logic
const game = ( () => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");

    function startGame(){
        gameBoard.addEventListeners();
        gameBoard.render()
        console.log(player1)
        console.log(player2)
    };
    return{startGame};
})();

game.startGame();