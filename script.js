// object with the board functionality
const gameBoard = ( () => {
    let board = ["x","","o","o","x","o","o","o","",];
    const boardSquares = document.querySelectorAll('.boardSquare');
    
    let counter = 0;
    
    boardSquares.forEach((square) => {
        square.textContent = board[counter];
        counter ++;
    })

})();

// player factory function
const Player = (name, sign) => {
    return{name, sign}
};

//game
const game = ( () => {

})();

