var getAllBox = document.querySelectorAll('.box')
var getWinnerID = document.getElementById('winner_id')
var getBox = document.getElementById('gameDetail')
var getPlayer1 = document.getElementById('player_1_id')
var getPlayer2 = document.getElementById('player_2_id')
var getGameBOX = document.querySelector('.game-wrapper')
var symbolX = true
var symbolO = false

let btnCount = 0

const winning_Condition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function getPlayer_1_name(event) {
    if(event.key === 'Enter') {
        if(getPlayer1.value != '') {
            localStorage.setItem('player_1_name', getPlayer1.value)
        } else {
            alert('Please Enter Name!')
        }
    }
}

function getPlayer_2_name(event) {
    if(event.key === 'Enter') {
        if(getPlayer2.value != '') {
            localStorage.setItem('player_2_name', getPlayer2.value)
        } else {
            alert('Please Enter Name!')
        }
    }
}

getAllBox.forEach((element) => {
    element.addEventListener('click', () => {
        if (symbolX === true) {
            element.innerHTML = '☠️'
            symbolX = false
            symbolO = true
            btnCount++
        } else {
            element.innerHTML = '🤡'
            symbolO = false
            symbolX = true
            btnCount++
        }
        element.disabled = true

        checkWinnerFunc()
    })
})

function checkWinnerFunc() {
    for (var index of winning_Condition) {
        var index_1 = getAllBox[index[0]].textContent
        var index_2 = getAllBox[index[1]].textContent
        var index_3 = getAllBox[index[2]].textContent

        if (index_1 != '' && index_2 != '' && index_3 != '') {
            if (index_1 === index_1 && index_1 === index_2 && index_2 === index_3) {
                if (index_1 === '☠️') {
                    var player1Name = localStorage.getItem('player_1_name')
                    getBox.style.display = 'flex'
                    getWinnerID.textContent = '⚔️' + 'Winner is ' + player1Name + '⚔️'
                    disabledButtons()
                } else if (index_1 === '🤡') {
                    var player2Name = localStorage.getItem('player_2_name')
                    getBox.style.display = 'flex'
                    getWinnerID.textContent = '⚔️' + 'Winner is ' + player2Name + '⚔️'
                    disabledButtons()
                }
            } else if (index_1 != index_2 && index_2 != index_3 && btnCount === 9) {
                getBox.style.display = 'flex'
                getWinnerID.textContent = '⚔️' + 'Game is draw' + '⚔️'
                disabledButtons()
            }
        }
    }
}

function disabledButtons() {
    for (let btn of getAllBox) {
        btn.disabled = true
    }
}

function enabledButtons() {
    for (let btn of getAllBox) {
        btn.disabled = false
        btn.textContent = ''
    }
}

function newGameFunc() {
    if (getPlayer1.value != '' && getPlayer2.value != '') {
        symbolX = true
        symbolO = false
        btnCount = 0
        enabledButtons()
        getBox.style.display = 'none'
        getGameBOX.style.display = 'flex'
    } else {
        alert('Enter player names!')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    var player_1 = localStorage.getItem('player_1_name')
    var player_2 = localStorage.getItem('player_2_name')
    if (player_1 && player_2) {
        getPlayer1.value = player_1
        getPlayer2.value = player_2
    } else if (player_1) {
        getPlayer1.value = player_1
    } else if (player_2) {
        getPlayer2.value = player_2
    } else {
        getPlayer1.value = ''
        getPlayer2.value = ''
    }
})

function resetPlayerFunc() {
    localStorage.removeItem('player_1_name')
    localStorage.removeItem('player_2_name')
    location.reload()
}