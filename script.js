function getStates(data, player) {
    let states = new Array();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (data[i][j] === "") {
                let state = data.slice();
                state[i][j] = player;
                states.push(state);
            }
        }
    }
    return states;
}

function place(elem) {
    let row = Number(elem.id[0]);
    let col = Number(elem.id[1]);

    // Place x on this spot
    elem.innerHTML = "X";
    
    // Make an array out of the table to use internally
    let data = new Array(3);
    for (let i = 0; i < 3; i++) {
        data[i] = new Array(3);
        for (let j = 0; j < 3; j++) {
            let cell = document.getElementById(`${i}${j}`).innerHTML;
            data[i][j] = cell;
        }
    }

    let states = getStates(data, "O");
}

let table = document.getElementById("board");

let tableRows = []
for (let i = 0; i < 3; i++) {
    let row = document.createElement('tr');
    tableRows.push(row);
    for (let j = 0; j < 3; j++) {
        let data = document.createElement('td');
        data.id = `${i}${j}`;
        data.onclick = function () {place(this) };
        tableRows[i].appendChild(data);
    }
}

// Now all the rows are on the page
for (let i = 0; i < 3; i++) {
    table.appendChild(tableRows[i]);
}

