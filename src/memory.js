
function createMemoryDataCollection() {
  let pages = document.querySelector('#pages')
  pages.innerHTML = ''
  let qtt = document.querySelector('#qtt_process').value
  for (let i = 1; i <= qtt; i++) {
    let processArticle = document.createElement('article')
    processArticle.id = 'memory_process'
    processArticle.innerHTML = `
    <h2 class="h2-title">Processo ${i}</h2>
    <div class="memory-data">
      <label for="process-pages">Páginas</label>
      <input class="input memory-input" type="text" name="process-pages" id="process-pages" placeholder="1 12 13 64">
    </div>
    `
    pages.appendChild(processArticle)
  };

  createMemoryExecution()
}

function createRealMemory() {
  let ram = document.querySelector('#ram')
  let head = ram.querySelector(`thead`)
  let body = ram.querySelector(`tbody`)
  head.innerHTML = ''
  body.innerHTML = ''

  for (let i = 49; i >= 0; i--) {

    let hrow = document.createElement('tr')
    let brow = document.createElement('tr')
    hrow.innerHTML = `<th>${i}</th>`
    brow.innerHTML = `<td id="ram-${i}"></td>`

    head.appendChild(hrow)
    body.appendChild(brow)
  }
}

function createVirtualMemory(pages) {
  let disc = document.querySelector('#disc')
  let head = disc.querySelector(`thead`)
  let body = disc.querySelector(`tbody`)
  head.innerHTML = ''
  body.innerHTML = ''
  let localPages = new Array()
  pages.forEach(page => {
    localPages.push(page)
  })
  
  localPages = localPages.sort((a, b) => a - b)
  let filter = localPages.filter((value, index, self) => self.indexOf(value) === index)

  filter.forEach(page => {
    let hrow = document.createElement('tr')
    let brow = document.createElement('tr')

    hrow.innerHTML = `<th>${page}</th>`
    brow.innerHTML = `<td id="disc-${page}"></td>`

    head.appendChild(hrow)
    body.appendChild(brow)
  })
}

function pageFIFO() {
  let colectPages = document.querySelectorAll('#process-pages')
  let pages = new Array()
  colectPages.forEach(colectPage => {
    let page = colectPage.value.split(' ')
    page.forEach((p, index) => {
      if(index < 10)
      pages.push(p)
    })
  })


  let vitima = 0
  createRealMemory()
  createVirtualMemory(pages)

  while (pages.length > 0) {
    let page = pages.shift()
    for (let i = 0; i < 50; i++) {
      let ram = document.querySelector(`#ram-${i}`)
      if (ram.innerHTML === `<span class="atual-page">${page}</span> `) {
        break
      } else if (ram.innerHTML === '') {
        ram.innerHTML = `<span class="atual-page">${page}</span> `
        let disc = document.querySelector(`#disc-${page}`)
        if (disc.innerHTML === '') {
          disc.innerHTML = `<span class="atual-page">${i}</span> `
        } else if (disc.innerHTML !== '') {
          let oldDiscPages = disc.querySelectorAll('span')
          oldDiscPages.forEach(oldDiscPage => {
            oldDiscPage.classList.remove('atual-page')
            oldDiscPage.classList.add('removed-page')
          })
          disc.innerHTML += `<span class="atual-page">${i}</span> `
        }
        break
      } else if (ram.innerHTML !== '' && i == 49) {
        let ram = document.querySelector(`#ram-${vitima}`)
        let oldPages = ram.querySelectorAll('span')
        oldPages.forEach(oldPage => {
          oldPage.classList.remove('atual-page')
          oldPage.classList.add('removed-page')
        })
        ram.innerHTML += `<span class="atual-page">${page}</span> `
        let disc = document.querySelector(`#disc-${page}`)
        if (disc.innerHTML === '') {
          disc.innerHTML = `<span class="atual-page">${vitima}</span> `
        } else if (disc.innerHTML !== '') {
          let oldDiscPages = disc.querySelectorAll('span')
          oldDiscPages.forEach(oldDiscPage => {
            oldDiscPage.classList.remove('atual-page')
            oldDiscPage.classList.add('removed-page')
          })
          disc.innerHTML += `<span class="atual-page">${vitima}</span> `
        }
        if (vitima == 49) {
          vitima = 0
        } else {
          vitima++
        }
      }
    }
  }
  removeMemoryExecution()
}

function createMemoryExecution() {
  let execution = document.querySelector('#memory-execution')
  execution.innerHTML = ''
  execution.innerHTML = `
    <button class="btn" onclick="pageFIFO()">FIFO</button>
    <button class="btn" onclick="pageLRU()">LRU</button>`

  let ram = document.querySelector('#ram')
  let disc = document.querySelector('#disc')
  let rhead = ram.querySelector(`thead`)
  let rbody = ram.querySelector(`tbody`)
  let dhead = disc.querySelector(`thead`)
  let dbody = disc.querySelector(`tbody`)
  dhead.innerHTML = ''
  dbody.innerHTML = ''
  rhead.innerHTML = ''
  rbody.innerHTML = ''
}

function removeMemoryExecution() {
  let execution = document.querySelector('#memory-execution')
  execution.innerHTML = ''
  execution.innerHTML = `
    <button class="btn" onclick="createMemoryExecution()">Limpar</button>`
}