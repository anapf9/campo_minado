document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let width = 10
  let bombAmount = 20
  let squares = []
  // create Board
  function createBoard() {
    // get shuffled game array with random bombs
    // O método fill() preenche todos os valores do array a partir do índice inicial a um índice final com um valor estático
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
    }
  }
  createBoard()
})