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
    let hasWon = false;
    function addEventListeners(){
        boardSquares.forEach((square) =>{
            square.addEventListener("click", updateBoard)
        })
    }

    function removeEventListeners(){
        boardSquares.forEach((square) =>{
            square.removeEventListener("click", updateBoard)
        })
    }

    function updateBoard(e){
        board[e.target.id] = game.getActivePlayerSign();
        console.log(board)
        render();
        game.swapPlayer();
        e.target.removeEventListener("click", updateBoard);
        checkForWin();
        checkForDraw();
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
            removeEventListeners();
            hasWon = true;
        } else if ((board[1] === board[4]) && (board[1] === board[7]) && board[1] != ""){
            console.log(`Player ${board[1]} WON`)
            removeEventListeners();
            hasWon = true;
        } else if ((board[2] === board[5]) && (board[2] === board[8]) && board[2] != ""){
            console.log(`Player ${board[2]} WON`)
            removeEventListeners();
            hasWon = true;
        } else if ((board[0] === board[1]) && (board[0] === board[2]) && board[0] != ""){
            console.log(`Player ${board[0]} WON`)
            removeEventListeners();
            hasWon = true;
        } else if ((board[3] === board[4]) && (board[3] === board[5]) && board[3] != ""){
            console.log(`Player ${board[3]} WON`)
            removeEventListeners();
            hasWon = true;
        } else if ((board[6] === board[7]) && (board[6] === board[8]) && board[6] != ""){
            console.log(`Player ${board[6]} WON`)
            removeEventListeners();
            hasWon = true;
        } else if ((board[0] === board[4]) && (board[0] === board[8]) && board[0] != ""){
            console.log(`Player ${board[0]} WON`)
            removeEventListeners();
            hasWon = true;
        } else if ((board[2] === board[4]) && (board[2] === board[6]) && board[2] != ""){
            console.log(`Player ${board[2]} WON`)
            removeEventListeners();
            hasWon = true;
        }
    };

    function checkForDraw(){
        if(board.includes("")){
        } else if (hasWon === false) {
            console.log("Tie")
        }
    };

    
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