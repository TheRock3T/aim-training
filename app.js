const colors = ['#7FFFD4','#7FFF00','#DC143C','#9932CC','#FFFF00','#FF00FF','#FFFFF0']
const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let score = 0
startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0){
        finishGame()
    } else {
        let current = --time
        if (current < 10){
            current = `0${current}`
        }
        setTime(current)
    }

}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame(){
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNum(10, 70)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNum(0, width - size)
    const y = getRandomNum(0, height - size)

    setColor(circle)
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle)
}

function getRandomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function randomColor(){
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}
function setColor(element){
    const color = randomColor()
    element.style.background = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}
