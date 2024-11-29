import Player from '/player.js'


const boardCols = 20
const boardRows = 20
const boardSize = boardCols * boardRows
const player = new Player(1, 'right', boardSize/2)
const boardBorders = [
    {border: 'top', borderLocation: []},
    {border: 'bottom', borderLocation: []},
    {border: 'left', borderLocation: []},
    {border: 'right', borderLocation: []}
]


function findBorderEnds () {
    let left = 1 - boardCols
    let right = 0
    for(let i = 0; i < boardCols; i++){
        boardBorders[0].borderLocation.push(i + 1)
        boardBorders[1].borderLocation.unshift(boardSize - (i))
    }
    for(let i = 0; i < boardRows; i++){
        boardBorders[2].borderLocation.push(left += boardCols)
        boardBorders[3].borderLocation.push(right += boardCols)
    }
}

function generateBoard () {
    for(let i = 0; i < boardSize; i++){
        const divBox = document.createElement("div")
        divBox.classList.add('grid-box')
        divBox.setAttribute('id', i + 1)
        document.querySelector('.game-grid').appendChild(divBox)
    }
}

function assignControls (){
    addEventListener('keydown', (e => {
        switch(e.key){
            case 'ArrowRight':
                player.setDirection('Right')
                break;
            case 'ArrowLeft':
                player.setDirection('Left')
                break;
            case 'ArrowUp':
                player.setDirection('Up')
                break;
            case 'ArrowDown':
                player.setDirection('Down')
                break;
                
        }
    }))
}


generateBoard()
findBorderEnds()
assignControls()