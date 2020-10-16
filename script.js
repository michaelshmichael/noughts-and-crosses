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
    let winningCombinations = [
        [0,3,6],[1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8],
        [0,4,8],[2,4,6]
    ];

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
        checkForWin();
    }

    function render(){
        for(i = 0; i < board.length; i++){
            boardSquares[i].textContent = board[i];
        }
    };

    //Really WET Solution - Surely a better way with array manipulation
    function checkForWin(){
        if((board[0] === board[3]) && (board[0] === board[6]) && board[0] != ""){
            console.log(`Player ${board[0]} WON`)
        } else if ((board[1] === board[4]) && (board[1] === board[7]) && board[1] != ""){
            console.log(`Player ${board[1]} WON`)
        } else if ((board[2] === board[5]) && (board[2] === board[8]) && board[2] != ""){
            console.log(`Player ${board[2]} WON`)
        } else if ((board[0] === board[1]) && (board[0] === board[2]) && board[0] != ""){
            console.log(`Player ${board[0]} WON`)
        } else if ((board[3] === board[4]) && (board[3] === board[5]) && board[3] != ""){
            console.log(`Player ${board[3]} WON`)
        } else if ((board[6] === board[7]) && (board[6] === board[8]) && board[6] != ""){
            console.log(`Player ${board[6]} WON`)
        } else if ((board[0] === board[4]) && (board[0] === board[8]) && board[0] != ""){
            console.log(`Player ${board[0]} WON`)
        } else if ((board[2] === board[4]) && (board[2] === board[6]) && board[2] != ""){
            console.log(`Player ${board[2]} WON`)
        }
    }
    return {render, addEventListeners, updateBoard};
})();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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