function copyArray(ar) {
    let ret = new Array();
    for (let i = 0; i < ar.length; i++) {
        ret.push(ar[i].slice());
    }
    return ret;
}

function getPlayer(data) {
    let Xcount = 0;
    let Ocount = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if ("X" === data[i][j]) {
                Xcount++;
            }
            if ("O" === data[i][j]) {
                Ocount++;
            }
        }
    }
    if (Xcount > Ocount) {
        return "O";
    }
    return "X"
}

function getStates(data, player) {
    let states = new Array();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (data[i][j] === " ") {
                let state = copyArray(data);
                state[i][j] = player;
                states.push(state);
            }
        }
    }
    return states;
}

function getWinner(data) {
    for (let i = 0; i < 3; i++) {
        // Checking columns
        if (data[i][0] === data[i][1] &&
            data[i][0] === data[i][2] &&
            data[i][i] !== " ") {
            return data[i][0];
        }
        // Checking rows
        if (data[0][i] === data[1][i] &&
            data[0][i] === data[2][i] &&
            data[0][i] !== " ") {
            return data[0][i];
        }
    }
    // Checking diagonals
    if (data[0][0] === data[1][1] &&
        data[0][0] === data[2][2] &&
        data[0][0] !== " ") {
        return data[0][0];
    }
    if (data[0][2] === data[1][1] &&
        data[0][2] === data[2][0] &&
        data[0][2] !== " ") {
        return data[0][2];
    }
    return " ";
}

function isPlaying(data) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (data[i][j] === " ") {
                return true;
            }
        }
    }
    return false;
}

function minimax(data) {
    player = getPlayer(data);
    let winner = getWinner(data);
    if (winner === "X") {
        return -1;
    }
    if (winner === "O") {
        return 1;
    }
    if (!isPlaying(data)) {
        return 0;
    }
    // Recurse the states returning the best state
    let states = getStates(data, player);
    if (player === "O") { // Is maximizing player
        let val = -2;
        for (let i = 0; i < states.length; i++) {
            val = Math.max(val, minimax(states[i]));
        }
        return val;
    }
    else {                // Minimizing player
        let val = 2;
        for (let i = 0; i < states.length; i++) {
            val = Math.min(val, minimax(states[i]));
        }
        return val;
    }
}

function setState(state) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let td = document.getElementById(`${i}${j}`);
            td.innerHTML = state[i][j];
        }
    }
}

function place(elem) {
    let empty = false;
    if (elem.innerHTML == " ") {
        empty = true;
        elem.innerHTML = "X";
    }
    
    // Make an array out of the table to use internally
    let data = new Array(3);
    for (let i = 0; i < 3; i++) {
        data[i] = new Array(3);
        for (let j = 0; j < 3; j++) {
            let cell = document.getElementById(`${i}${j}`).innerHTML;
            data[i][j] = cell;
        }
    }

    if (!empty)
        return data;

    // Geting all the states to run minimax on
    let states = getStates(data, "O");
    let results = new Array();
    for (let i = 0; i < states.length; i++) {
        results.push(minimax(states[i]));
    }

    let idx = results.findIndex(res => res === 1);
    if (-1 < idx) {
        // setState(states[idx]);
        return states[idx];
    }
    idx = results.findIndex(res => res === 0);
    if (-1 < idx){
        // setState(states[idx]);
        return states[idx];
    }
    idx = results.findIndex(res => res === -1);
    // setState(states[idx]);
    return states[idx];
}

function clear() {
    let winElem = document.getElementById("winner");
    winElem.innerHTML = " ";
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let elem = document.getElementById(`${i}${j}`);
            elem.innerHTML = " ";
        }
    }
}

let table = document.getElementById("board");

for (let i = 0; i < 3; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < 3; j++) {
        let data = document.createElement('td');
        data.id = `${i}${j}`;
        data.onclick = function () {
            let state = place(this);
            if (state) {
                setState(state);
                let winner = getWinner(state);
                let winElem = document.getElementById("winner");
                if (winner !== " ") {
                    winElem.innerHTML = `${winner} wins!`;
                    setTimeout( function() {clear() }, 1500);
                }
            }
            else {
                let winElem = document.getElementById("winner");
                winElem.innerHTML = "Draw!";
                setTimeout( function() {clear() }, 1500);
            }
        };
        data.innerHTML = " ";
        row.appendChild(data);
    }
    table.appendChild(row);
}