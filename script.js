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
        console.log(board)
    }

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
    };

    //Can be made ternary
    function swapPlayer() {
        if(player1.active === false) {
            player1.active = true;
        } else {
            player1.active = false;
        };
        if(player2.active === false) {
            player2.active = true;
        } else {
            player2.active = false;
        };
    }

    //Can be made ternary
    function getActivePlayerSign() {
        let activePlayerSign = '';
        if(player1.active === true){
            activePlayerSign = player1.sign;
        } else {
            activePlayerSign = player2.sign;
        }
        return(activePlayerSign)
    }

    return{startGame, swapPlayer, getActivePlayerSign};
})();

game.startGame();