///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Player Factory Function
const Player = (name, sign) => {
    const active = false;
    return{name, sign, active}
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Object with the board functionality
const gameBoard = ( () => {
    let board = ["","","","","","","","","",];
    const boardSquares = Array.from(document.querySelectorAll('.boardSquare'));

    function addEventListeners(){
        boardSquares.forEach((square) =>{
            square.addEventListener("click", updateBoard)
        })
    }

    function updateBoard(e){
        board[e.target.id] = game.getActivePlayerSign();
        render();
        game.swapPlayer();
        e.target.removeEventListener("click", updateBoard);
    }

    // function updateSquare(e){
    //     //MAKE THE SQUARE SHOW THE PLAYER SIGN
    //     e.target.textContent = player1.sign;
    //     game.swapPlayer();
    //     e.target.removeEventListener("click", updateSquare);
    // }

    function render(){
        for(i = 0; i < board.length; i++){
            boardSquares[i].textContent = board[i];
        }
    };

    return {render, addEventListeners, updateBoard};
})();

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

    function swapPlayer() {
        player1.active = (player1.active) ? false : true;
        player2.active = (player2.active) ? false : true;
    }

    function getActivePlayerSign() {
        return (player1.active) ? player1.sign : player2.sign;
    }

    return{startGame, swapPlayer, getActivePlayerSign};
})();

game.startGame();