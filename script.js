///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Object with the board functionality
const gameBoard = ( () => {

    let board = ["","","","","","","","","",];
    let hasWon = false;
    const boardSquares = Array.from(document.querySelectorAll('.boardSquare'));
    
    restartButton.addEventListener("click", () => {
        board = ["","","","","","","","","",];
        render();
        game.restartGame();
        hasWon = false;
    })

    newPlayersButton.addEventListener("click", () => {
        board = ["","","","","","","","","",];
        render();
        game.removeScores();
        startGameButton.disabled = false;
        game.init();
        inputTableContainer.classList.remove('playerDataRemove')
    })

    function addEventListeners(){
        boardSquares.forEach((square) => {
            square.addEventListener("click", updateBoard)
        })
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
        _checkForWin();
        _checkForDraw();
        notFullArray = board.includes('');
        if(aiOn === true && hasWon === false && notFullArray === true) {
            _moveFromAI();
        }
    }

    function render(){
        for(i = 0; i < board.length; i++){
            boardSquares[i].textContent = board[i];
        }
    }

    function _genRandomNumber(){
        return Math.floor(Math.random() * 9);
    }

    function _moveFromAI(){
        do { 
            var ranNum = _genRandomNumber();
        } while (board[ranNum] !== '')
        board[ranNum] = game.getActivePlayerSign();
        render();
        game.swapPlayer();
        boardSquares[ranNum].removeEventListener("click", updateBoard);
        _checkForWin();
        _checkForDraw();
    }

    function _checkForWin(){
        if((board[0] === board[3] && board[0] === board[6] && board[0] != "") ||
           (board[1] === board[4] && board[1] === board[7] && board[1] != "") ||
           (board[2] === board[5] && board[2] === board[8] && board[2] != "") ||
           (board[0] === board[1] && board[0] === board[2] && board[0] != "") ||
           (board[3] === board[4] && board[3] === board[5] && board[3] != "") ||
           (board[6] === board[7] && board[6] === board[8] && board[6] != "") ||
           (board[0] === board[4] && board[0] === board[8] && board[0] != "") ||
           (board[2] === board[4] && board[2] === board[6] && board[2] != "")) {
            removeEventListeners();
            game.endGame();
            hasWon = true;
        } 
    }
   
    function _checkForDraw(){
        notFullArray = board.includes('');
        if (hasWon === false && notFullArray === false) {
            displayWinner.textContent = "TIE!"
        }
    }
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
    let aiButton = document.getElementById('ai');

    function init(){
        _cacheDom();
        _addStartGameListener();
    }

    function _cacheDom(){
        this.nameInputForm = document.querySelector(".nameInputForm")
        this.startGameButton = document.getElementById("startGame");
        this.player1Name = document.getElementById('player1Name');
        this.player2Name = document.getElementById('player2Name');
        this.scoresCounter = document.querySelector('.scoresCounter');
        this.displayWinnerContainer = document.querySelector(".displayWinnerContainer");
        this.displayWinner = document.getElementById('displayWinner');
        this.player2Label = document.getElementById('player2Label');
        this.inputTableContainer = document.getElementById('inputTableContainer')
    }

    aiButton.addEventListener("click", () => {
            player2Label.classList.toggle('playerDataRemove')
            player2Name.classList.toggle('playerDataRemove')
            player2Name.value = ''
    })
    
    function _addStartGameListener(){  
        startGameButton.addEventListener("click", _startGame);
    }

    function _checkAI(){
        aiOn = false
        aiButton.checked === true ? aiOn = true : aiOn = false;
        return(aiOn)
    }

    function _startGame(e){
        _checkAI();
        if((aiOn === false && player1Name.value != '' && player2Name.value != '') || (aiOn === true && player1Name.value != '')) {
        e.preventDefault();
        _setPlayerNames();
        gameBoard.addEventListeners();
        startGameButton.disabled = true;
        inputTableContainer.classList.add('playerDataRemove')
        } else {alert('Please enter names')}
    }   

    function _setPlayerNames(){
        player1.name = player1Name.value;
        player2.name = player2Name.value;
        if(aiOn === true) {
            player2.name = "HAL 9000";
        }
        _displayNames();
    }

    function _displayNames(){
        player1Score = document.createElement('div');
        player1Score.textContent = `${player1.name}'s score: ${player1ScoreCount}`
        scoresCounter.appendChild(player1Score);
        player1Name.value = '';
        player2Score = document.createElement('div');
        player2Score.textContent = `${player2.name}'s score: ${player2ScoreCount}`
        scoresCounter.appendChild(player2Score);
        player2Name.value = '';
    }

    function _updateScores(){
        player1Score.textContent = `${player1.name}'s score: ${player1ScoreCount}`
        player2Score.textContent = `${player2.name}'s score: ${player2ScoreCount}`
    }

    function removeScores(){
        player1ScoreCount = 0;
        player2ScoreCount = 0;
        player1Score.textContent = '';
        player2Score.textContent = '';
        displayWinner.textContent = '';
    }

    function restartGame(){
        gameBoard.addEventListeners();
        player1.active = false;
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
        player1.active === true ? (displayWinner.textContent = `${player1.name} WINS!`, player1ScoreCount ++) : (displayWinner.textContent = `${player2.name} WINS!`, player2ScoreCount ++);
        _updateScores();
    }

    return{init, removeScores, restartGame, swapPlayer, getActivePlayerSign, endGame};
})();

game.init()
