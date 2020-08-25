document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let width = 10
  let bombAmount = 20
  let squares = []
  let isGameOver = false
  // create Board
  function createBoard() {
    // O método fill() preenche todos os valores do array a partir do índice inicial a um índice final com um valor estático
    // Usar classList é uma alternativa conveniente para acessar a lista de classes de um elemento como uma seqüência delimitada por espaço através de element.className
    const bombsArray = Array(bombAmount).fill('bomb')
    const emptyArray = Array(width * width - bombAmount).fill('valid')
    const gameArray = emptyArray.concat(bombsArray)
    const shuffleArray = gameArray.sort(() => Math.random() - 0.5)

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div')
      square.setAttribute('id', i)
      square.classList.add(shuffleArray[i])
      grid.appendChild(square)
      squares.push(square)

      // normal click
      square.addEventListener('click', function (e) {
        click(square)
      })
    }

    //add numbers
    for (let i = 0; i < squares.length; i++) {
      let total = 0
      const isLeftEdge = (i % width === 0)
      const isRightEdge = (i % width === width - 1)

      if (squares[i].classList.contains('valid')) {
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++
        if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++
        if (i > 10 && squares[i - width].classList.contains('bomb')) total++
        if (i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) total++
        if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++
        if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total++
        if (i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total++
        if (i < 89 && squares[i + width].classList.contains('bomb')) total++
        squares[i].setAttribute('data', total)
      }
    }
  }
  createBoard()
  //click on square action
  function click(square) {
    let currentId = square.id
    if (isGameOver) return
    if (square.classList.contains('checked') || square.classList.contains('flag')) return
    if (square.classList.contains('bomb')) {
      console.log('game over')
    } else {
      let total = square.getAttribute('data')
      if (total != 0) {
        square.classList.add('checked')
        square.innerHTML = total
        return
      }
      checkSquare(square, currentId)
    }
    square.classList.add('checked')
  }






})