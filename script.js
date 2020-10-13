///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Object with the board functionality
const gameBoard = ( () => {
    let board = ["1","2","o","?","x","o","@","o","t",];
    const boardSquares = Array.from(document.querySelectorAll('.boardSquare'));
    console.log(boardSquares);

    function render(){
        for(i = 0; i < board.length; i++){
            boardSquares[i].textContent = board[i];
        }
    };

    return {render};
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

    function changePlayer() {
        player1.active = (player1.active) ? false : true;
        player2.active = (player2.active) ? false : true;
        console.log(2+2)
    }
    
    function getActivePlayerSign() {
        return (player1.active) ? player1.sign : player2.sign;
    }

    function startGame(){
        gameBoard.render()
    };
    return{changePlayer, getActivePlayerSign, startGame};
})();

game.startGame();