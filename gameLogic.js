import Player from '/player.js'

const startButton = document.getElementById('start-button')
const restartButton = document.getElementById('restart-button')

const boardCols = 20
const boardRows = 20
const boardSize = boardCols * boardRows
const player = new Player(1, 'right', boardSize/2)
const boardEdges = [
    {border: 'top', borderLocation: []},
    {border: 'bottom', borderLocation: []},
    {border: 'left', borderLocation: []},
    {border: 'right', borderLocation: []}
]


function mapBoardEdges () {
    let left = 1 - boardCols
    let right = 0
    for(let i = 0; i < boardCols; i++){
        boardEdges[0].borderLocation.push(i + 1)
        boardEdges[1].borderLocation.unshift(boardSize - (i))
    }
    for(let i = 0; i < boardRows; i++){
        boardEdges[2].borderLocation.push(left += boardCols)
        boardEdges[3].borderLocation.push(right += boardCols)
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
                if(player.direction != 'Left')
                {
                    player.setDirection('Right')
                }
                break;
            case 'ArrowLeft':
                if(player.direction != 'Right')
                    {
                        player.setDirection('Left')
                    }
                break;
            case 'ArrowUp':
                if(player.direction != 'Down')
                    {
                        player.setDirection('Up')
                    }    
                player.setDirection('Up')
                break;
            case 'ArrowDown':
                if(player.direction != 'Up')
                    {
                        player.setDirection('Down')
                    }    
                break;
                
        }
    }))
}

function startGame () {

}

function restartGame () {
    
}

generateBoard()
mapBoardEdges()
assignControls()
startButton.addEventListener('click', startGame())
restartButton.addEventListener('click', restartGame())