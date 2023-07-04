
function createMemoryDataCollection() {
  let pages = document.querySelector('#pages')
  pages.innerHTML = ''
  let qtt = document.querySelector('#qtt_process').value
  for (let i = 1; i <= qtt; i++) {
    let processArticle = document.createElement('article')
    processArticle.id = 'memory_process'
    processArticle.classList = 'process'
    processArticle.innerHTML = `
    <h2 class="h2-title">Processo ${i}</h2>
    <div class="memory-data">
      <label for="process-pages">Páginas</label>
      <input class="input memory-input" type="text" name="process-pages" id="process-pages" placeholder="1 12 13 64">
    </div>
    `
    pages.appendChild(processArticle)
  };
  createRealMemory()
}

function createVirtualMemory() {
  
}

function createRealMemory() {
  let ram = document.querySelector('#ram')
  let head = ram.querySelector(`thead`)
  let body = ram.querySelector(`tbody`)
  head.innerHTML = ''
  body.innerHTML = ''

  for(let i = 49; i >= 0 ; i--) {

    let hrow = document.createElement('tr')
    let brow = document.createElement('tr')
    hrow.innerHTML = `<th>${i}</th>`
    brow.innerHTML = `<td id="ram-${i}"></td>`

    head.appendChild(hrow)
    body.appendChild(brow)
  }
}