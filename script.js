///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Object with the board functionality
const gameBoard = ( () => {

    let board = ["","","","","","","","","",];
    let hasWon = false;
    const boardSquares = Array.from(document.querySelectorAll('.boardSquare'));
    const restartButton = document.getElementById('restartButton');
    const newPlayersButton = document.getElementById('newPlayersButton');
    
    restartButton.addEventListener("click", () => {
        board = ["","","","","","","","","",];
        render();
        game.restartGame();
    })

    newPlayersButton.addEventListener("click", () => {
        board = ["","","","","","","","","",];
        render();
        game.removeScores();
        startGameButton.disabled = false;
        game.init();
    })

    function addEventListeners(){
        boardSquares.forEach((square) => {
            square.addEventListener("click", updateBoard)
        });
    }

    function removeEventListeners(){
        boardSquares.forEach((square) => {
            square.removeEventListener("click", updateBoard)
        })
    }

    function updateBoard(e){
        board[e.target.id] = game.getActivePlayerSign();
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
            removeEventListeners();
            game.endGame();
            hasWon = true;
        } else if ((board[1] === board[4]) && (board[1] === board[7]) && board[1] != ""){
            removeEventListeners();
            game.endGame();
            hasWon = true;
        } else if ((board[2] === board[5]) && (board[2] === board[8]) && board[2] != ""){
            removeEventListeners();
            game.endGame();
            hasWon = true;
        } else if ((board[0] === board[1]) && (board[0] === board[2]) && board[0] != ""){
            removeEventListeners();
            game.endGame();
            hasWon = true;
        } else if ((board[3] === board[4]) && (board[3] === board[5]) && board[3] != ""){
            removeEventListeners();
            game.endGame();
            hasWon = true;
        } else if ((board[6] === board[7]) && (board[6] === board[8]) && board[6] != ""){
            removeEventListeners();
            game.endGame();
            hasWon = true;
        } else if ((board[0] === board[4]) && (board[0] === board[8]) && board[0] != ""){
            removeEventListeners();
            game.endGame();
            hasWon = true;
        } else if ((board[2] === board[4]) && (board[2] === board[6]) && board[2] != ""){
            removeEventListeners();
            game.endGame();
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Player Factory Function
const Player = (name, sign) => {
    const active = false;
    return{name, sign, active}
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Object with Game Logic
const game = ( () => {
    let player1 = Player('', "X");
    let player2 = Player('', "O");

    let player1ScoreCount = 0;
    let player2ScoreCount = 0;

    function init(){
        cacheDom();
        addStartGameListener();
    };

    function cacheDom(){
        this.nameInputForm = document.querySelector(".nameInputForm")
        this.startGameButton = document.getElementById("startGame");
        this.player1Name = document.getElementById('player1Name');
        this.player2Name = document.getElementById('player2Name');
        this.scoresCounter = document.querySelector('.scoresCounter');
        this.displayWinnerContainer = document.querySelector(".displayWinnerContainer");
        this.displayWinner = document.getElementById('displayWinner');
    }

    function addStartGameListener(){
        startGameButton.addEventListener("click", startGame);
    }

    function startGame(e){
        e.preventDefault();
        setPlayerNames();
        gameBoard.addEventListeners();
        startGameButton.disabled = true;
    }

    function setPlayerNames(){
        player1.name = player1Name.value;
        player2.name = player2Name.value;
        displayNames();
    }

    function displayNames(){
        player1Score = document.createElement('div');
        player1Score.textContent = `${player1.name}'s score: ${player1ScoreCount}`
        scoresCounter.appendChild(player1Score);
        player2Score = document.createElement('div');
        player2Score.textContent = `${player2.name}'s score: ${player2ScoreCount}`
        scoresCounter.appendChild(player2Score);
        player1Name.value = '';
        player2Name.value = '';
    }

    function updateScores(){
        player1Score.textContent = `${player1.name}'s score: ${player1ScoreCount}`
        player2Score.textContent = `${player2.name}'s score: ${player2ScoreCount}`
    }

    function removeScores(){
        player1Score.textContent = '';
        player2Score.textContent = '';
        displayWinner.textContent = '';
    }

    function restartGame(){
        gameBoard.addEventListeners();
        displayWinner.textContent = '';
    }

    function swapPlayer() {
        player1.active === false ? player1.active = true : player1.active = false;
        player2.active === false ? player2.active = true : player2.active = false;
    }

    function getActivePlayerSign() {
        let activePlayerSign = '';
        player1.active ? activePlayerSign = player1.sign : activePlayerSign = player2.sign;
        return(activePlayerSign)
    }
    
    function endGame(){
        if(player1.active === true){
            displayWinner.textContent = `${player1.name} WINS!`
            player1ScoreCount ++;
        } else {
            displayWinner.textContent = `${player2.name} WINS!`
            player2ScoreCount ++;
        }
        updateScores();
    }
    return{init, removeScores, restartGame, swapPlayer, getActivePlayerSign, endGame};
})();

game.init()

// add AI...