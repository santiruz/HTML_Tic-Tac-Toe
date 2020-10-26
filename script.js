//HTML Elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');
const winPercentDiv = document.querySelector('.winPercentage');


//game variables
let gameIsLive = true;
let xIsNext = true;
let win = false;
let counter = 0;
let numWins = 0;
let numGames = 1;
let looptwice = false;

const handleWin = (letter) =>
{
    gameIsLive = false;
    if(win)
    {

        if (letter === 'x') {
            if(looptwice)
            numWins -= 1;
            looptwice = !looptwice;
            numWins += 1;
            statusDiv.innerHTML = `<sp>Human Won!</sp>`;
        } else {
            statusDiv.innerHTML = `<span>Computer won!</span>`;
        }
        winPercentDiv.innerHTML = `<span>Win Percentage: ${((numWins/numGames) * 100).toFixed(2)}%</span>`;


    }
};

function makeWinningMove()
{

    for(const cellDiv of cellDivs)
    {

        if(cellDiv.classList[1] !== undefined)
            continue;
        cellDiv.classList.add('o');
        checkWin();
        if(gameIsLive !== false)
        {
            cellDiv.classList.remove('o');

        }
        else
        {
            gameIsLive = false;
            return true;

        }
    }
    return false;

};

function makeDefensiveMove()
{

    for(const cellDiv of cellDivs)
    {

        if(cellDiv.classList[1] !== undefined)
            continue;

        cellDiv.classList.add('x');
        checkWin();
        if(gameIsLive !== false)
        {
            cellDiv.classList.remove('x');

        }
        else
        {
            gameIsLive = true;
            cellDiv.classList.remove('x');
            cellDiv.classList.add('o');
            return true;

        }
    }
    return false;
};
const checkWin = () =>
{

    const topLeft = cellDivs[0].classList[1]
    const topMiddle = cellDivs[1].classList[1]
    const topRight = cellDivs[2].classList[1]
    const middleLeft = cellDivs[3].classList[1]
    const middleMiddle = cellDivs[4].classList[1]
    const middleRight = cellDivs[5].classList[1]
    const bottomLeft = cellDivs[6].classList[1]
    const bottomMiddle = cellDivs[7].classList[1]
    const bottomRight = cellDivs[8].classList[1]



    if (topLeft && topLeft === topMiddle && topLeft === topRight) {
        handleWin(topLeft);
        if(win)
        {
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');
        }

    }
    else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
        handleWin(middleLeft);
        if(win)
        {

            cellDivs[3].classList.add('won');
            cellDivs[4].classList.add('won');
            cellDivs[5].classList.add('won');
        }

    } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
        handleWin(bottomLeft);
        if(win)
        {

            cellDivs[6].classList.add('won');
            cellDivs[7].classList.add('won');
            cellDivs[8].classList.add('won');
        }

    } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        handleWin(topLeft);
        if(win)
        {

            cellDivs[0].classList.add('won');
            cellDivs[3].classList.add('won');
            cellDivs[6].classList.add('won');
        }

    } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
        handleWin(topMiddle);
        if(win)
        {

            cellDivs[1].classList.add('won');
            cellDivs[4].classList.add('won');
            cellDivs[7].classList.add('won');
        }

    } else if (topRight && topRight === middleRight && topRight === bottomRight) {
        handleWin(topRight);
        if(win)
        {

            cellDivs[2].classList.add('won');
            cellDivs[5].classList.add('won');
            cellDivs[8].classList.add('won');
        }

    } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
        handleWin(topLeft);
        if(win)
        {

            cellDivs[0].classList.add('won');
            cellDivs[4].classList.add('won');
            cellDivs[8].classList.add('won');
        }

    } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
        handleWin(topRight);
        if(win)
        {

            cellDivs[2].classList.add('won');
            cellDivs[4].classList.add('won');
            cellDivs[6].classList.add('won');
        }
    } else if (counter === 8) {
        gameIsLive = false;
        statusDiv.innerHTML = `<spa> Game tied! </spa>`;
    }
};


//functions
const checkGameStatus = () =>
{


    counter += 1;
    checkWin();
    win = false;
    xIsNext = !xIsNext;
        if (xIsNext) {

        } else {

            if(cellDivs[4].classList[1] === undefined)
            {
                cellDivs[4].classList.add('o');
                checkGameStatus();
            }
            else if(makeWinningMove())
            {
                win = true;
                checkGameStatus();
            }
            else if(makeDefensiveMove())
            {
                checkGameStatus();
            }
            else
            {

                do {
                    var i = Math.floor(Math.random() * 9);


                } while(cellDivs[i].classList[1] !== undefined);


            cellDivs[i].classList.add('o');
            checkGameStatus();
            }


        }


};


//event Handlers
const handleReset = (e) => {
    xIsNext = true;
    statusDiv.innerHTML = `Your turn`;
    for (const cellDiv of cellDivs)
    {
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');

    }

    numGames += 1;
    if(gameIsLive)
    winPercentDiv.innerHTML = `<span>Win Percentage: ${((numWins/numGames) * 100).toFixed(2)}%</span>`;
    gameIsLive = true;
    counter = 0;
};
const handleCellClick = (e) =>
{
    const classList = e.target.classList;

    if(classList[1] === 'x' || classList[1] === 'o')
    {
        return;

    }
    if(xIsNext && gameIsLive)
    {
        win = true;
        classList.add('x');
        checkGameStatus();
    }

};

//event listeners
resetDiv.addEventListener('click',handleReset);

for(const cellDiv of cellDivs)
{
    cellDiv.addEventListener('click',handleCellClick)
}
