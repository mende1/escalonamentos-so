
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
  createRealMemory()
  createVirtualMemory()
  pageFIFO()
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

function createVirtualMemory() {
  let disc = document.querySelector('#disc')
  let head = disc.querySelector(`thead`)
  let body = disc.querySelector(`tbody`)
  head.innerHTML = ''
  body.innerHTML = ''
  let pages = []
  for (let i = 1; i <= 53; i++) {
    pages.push(i)
  }
  let filter = pages.filter((value, index, self) => self.indexOf(value) === index)

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
  let pages = []
  for (let i = 1; i <= 53; i++) {
    pages.push(i)
  }
  pages.push(3, 5, 35, 43, 28)
  let vitima = 0

  while (pages.length > 0) {
    let page = pages.shift()
    for (let i = 0; i < 50; i++) {
      let ram = document.querySelector(`#ram-${i}`)

      if (ram.innerHTML === `<span class="atual-page">${page}</span>`) {
        break
      }

      if (ram.innerHTML === '') {
        ram.innerHTML = `<span class="atual-page">${page}</span> `
        let disc = document.querySelector(`#disc-${page}`)
        if (disc.innerHTML === '') {
          disc.innerHTML = `<span class="atual-page">${i}</span> `
        } else {
          let oldDiscPages = disc.querySelectorAll('span')
          oldDiscPages.forEach(oldDiscPage => {
            oldDiscPage.classList.remove('atual-page')
            oldDiscPage.classList.add('removed-page')
          })
          disc.innerHTML += `<span class="atual-page">${i}</span> `
        }
        break
      } else if (ram.innerHTML !== '' && i === 49) {
        let ram = document.querySelector(`#ram-${vitima}`)
        let disc = document.querySelector(`#disc-${page}`)
        let oldPages = ram.querySelectorAll('span')
        oldPages.forEach(oldPage => {
          oldPage.classList.remove('atual-page')
          oldPage.classList.add('removed-page')
        })
        ram.innerHTML += `<span class="atual-page">${page}</span> `
        if (vitima === 49) {
          vitima = 0
        } else {
          vitima++
        }
        if (disc.innerHTML === '') {
          disc.innerHTML = `<span class="atual-page">${vitima}</span> `
        } else {
          let oldDiscPages = disc.querySelectorAll('span')
          oldDiscPages.forEach(oldDiscPage => {
            oldDiscPage.classList.remove('atual-page')
            oldDiscPage.classList.add('removed-page')
          })
          disc.innerHTML += `<span class="atual-page">${vitima}</span> `
        }
      }
    }
  }
}