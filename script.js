const board_el = document.querySelector('#board');
const cells_els = document.querySelectorAll('#board .cell'); 
const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let currentTurn;

setup();

function setup() {
    board_el.classList.remove('turn-x', 'turn-o');

    for (let cell of cells_els) {  
        cell.classList.remove('x', 'o');
        cell.addEventListener('click', fillCell, { once: true });
    }

    currentTurn = Math.round(Math.random()) == 1 ? 'x' : 'o';  
    board_el.classList.add('turn-' + currentTurn);
}

function fillCell() {
    this.classList.add(currentTurn);

    if (checkForWin()) {
        const restart = confirm(currentTurn.toUpperCase() + " is the winner! Restart?");
        if (restart) setup();
    } else if (checkForDraw()) {
        const restart = confirm("It's a draw! Restart?");
        if (restart) setup();
    } else {
        currentTurn = currentTurn == 'x' ? 'o' : 'x';
        board_el.classList.remove('turn-o', 'turn-x');
        board_el.classList.add('turn-' + currentTurn);
    }
}

function checkForWin() {
    return combinations.some(combination => {
        return combination.every(index => cells_els[index].classList.contains(currentTurn));
    });
}

function checkForDraw() {
    return [...cells_els].every(cell => cell.classList.contains('x') || cell.classList.contains('o'));
}
