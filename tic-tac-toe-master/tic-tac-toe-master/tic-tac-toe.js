document.addEventListener('DOMContentLoaded', function() {
    var squares = document.querySelectorAll('#board div');

    squares.forEach(function(square) {
        square.classList.add('square');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let squares = Array.from(document.querySelectorAll('#board div'));
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];

    squares.forEach(square => {
        square.addEventListener('mouseenter', function() {
            let index = this.dataset.index;
            if (gameState[index] === '') {
                this.classList.add('hover');
            }
        });

        square.addEventListener('mouseleave', function() {
            let index = this.dataset.index;
            if (gameState[index] === '') {
                this.classList.remove('hover');
            }
        });

        square.addEventListener('click', function() {
            let index = this.dataset.index;
            if (gameState[index] === '') {
                gameState[index] = currentPlayer;
                this.classList.remove('hover');
                this.classList.add(currentPlayer);
                this.innerHTML = currentPlayer;

                const winner = checkWinner();
                if (winner) {
                    let status = document.getElementById('status');
                    status.classList.add('you-won');
                    status.innerHTML = `Congratulations! ${winner} is the Winner!`;
                }

                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            }
        });

        square.dataset.index =squares.indexOf(square);
    });

    function checkWinner() {
        let winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let i = 0; i < winningCombos.length; i++) {
            let [a, b, c] = winningCombos[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a];
            }
        }

        return (gameState.indexOf('') === -1) ? 'Draw' : null;
    }
    var newGameButton = document.getElementsByClassName('btn')[0];

    newGameButton.addEventListener('click', function() {
        var squares = document.querySelectorAll('#board div');
        var status = document.getElementById('status');

        squares.forEach(function(square) {
            square.classList.remove('X', 'O');
            square.innerHTML = '';
        });

        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];

        status.classList.remove('you-won');
        status.innerHTML = 'Move your mouse over a square and click to play an X or an O.';
    });
});

