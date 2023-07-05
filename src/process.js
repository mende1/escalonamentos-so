let processes = new Array()
//-------------------------- Criar Tabela e Processos --------------------------//
function CreateTable() {
  let table = document.querySelector('#table')

  if (table.innerHTML != '') {
    return
  }

  processes.forEach(process => {
    table.innerHTML += `
      <tr id="process" class="${'processo' + process.name}">
      <td id="${process.name}">${process.name}</td>
      </tr>`
  });

  let tableProcessos = document.querySelectorAll('#process')

  tableProcessos.forEach(process => {
    for (let i = 1; i <= 100; i++) {
      process.innerHTML += `
        <td id="tempo${i}">${i % 5 ? '' : i}</td>
      `
    }
  });

  let legend = document.querySelector('#legend')
  legend.innerHTML = `
    <h4 class="h4-title">Legenda</h4>
    <div class="legend-items">
      <div class="legend-item">
        <span>Processo em execução:</span>
        <div class="legend-color executing"></div>
      </div>
      <div class="legend-item">
        <span>Sobrecarga:</span>
        <div class="legend-color overcharge"></div>
      </div>
      <div class="legend-item">
        <span>Deadline:</span>
        <div class="legend-color deadline"></div>
      </div>
      <div class="legend-item">
        <span>Estouro de deadline:</span>
        <div class="legend-color deadline-brust"></div>
      </div>
    </div>`
}

function createProcessesDataCollection() {
  ClearTable()
  createMemoryDataCollection()
  let qtt = document.querySelector('#qtt_process').value

  let processes = document.querySelector('#processes')
  processes.innerHTML = ''

  processes.innerHTML = `
    <div class="time-data">
      <label for="quantum">Quantum: </label>
      <input type="number" name="quantum" id="quantum" class="input">
      <label for="overcharge">Sobrecarga do Sistema: </label>
      <input type="number" name="overcharge" id="overcharge" class="input">
    </div>
  `

  for (i = 1; i <= qtt; i++) {
    let process = document.createElement('article')
    process.classList.add('process')
    process.innerHTML = `
      <h2 class="h2-title">Processo <span id="name">${i}</span></h2>
        <div class="process-data">
          <label for="arrivalTime">Tempo de chegada: </label>
          <input type="number" name="arrivalTime" id="arrivalTime" class="input">
          <label for="executionTime">Tempo de execução: </label>
          <input type="number" name="executionTime" id="executionTime" class="input">
          <label for="priority">Prioridade: </label>
          <input type="number" name="Priority" id="Priority" class="input">
          <label for="deadline">Deadline: </label>
          <input type="number" name="deadline" id="deadline" class="input">
        </div>`

    processes.appendChild(process)
  }
}

function CreateProcesses() {
  let processesData = document.querySelectorAll('.process')
  processesData.forEach(process => {
    let newProcess = new Object()
    newProcess.name = process.querySelector('#name').innerHTML
    newProcess.executionTime = process.querySelector('#executionTime').value
    newProcess.arrivalTime = process.querySelector('#arrivalTime').value
    newProcess.deadline = process.querySelector('#deadline').value
    processes.push(newProcess)
  });
}

function CreateExecution() {
  let exe = document.querySelector('.execution')
  exe.innerHTML = `<button class="btn" onclick="FIFO()">FIFO</button>
  <button class="btn" onclick="SJF()">SJF</button>
  <button class="btn" onclick="RR()">Round Robin</button>
  <button class="btn" onclick="EDF()">EDF</button>`
  let total = document.querySelector(`#turnaround`)
  total.innerHTML = ''
}

function ClearTable() {
  let table = document.querySelector('#table')
  let legend = document.querySelector('#legend')
  table.innerHTML = ''
  legend.innerHTML = ''
  processes = new Array()
  CreateExecution()
}

//-------------------------- Algoritmos --------------------------//

function FIFO() {
  CreateProcesses()
  CreateTable()
  processes.sort((a, b) => {
    return a.arrivalTime - b.arrivalTime
  })

  ExecuteFIFOAndSJF(processes)
}

function SJF() {
  CreateProcesses()
  CreateTable()

  processes.sort((a, b) => {
    return a.arrivalTime - b.arrivalTime
  })

  let order = new Array()

  for (let tempo = 0; tempo <= 100; tempo++) {
    let filter = processes.filter(process => process.arrivalTime <= tempo)
    if (filter.length > 0) {
      filter.sort((a, b) => {
        return a.executionTime - b.executionTime
      })
      filter.forEach(process => {
        order.push(process)
        tempo += parseInt(process.executionTime)
        processes.splice(processes.indexOf(process), 1)
      })
    }
  }
  ExecuteFIFOAndSJF(order)
}

function ExecuteFIFOAndSJF(processes) {
  let time = 0
  let turnAround = 0
  let interval = document.querySelector('#interval').checked ? 500 : 0

  processes.forEach(process => {
    let = tableProcess = document.querySelector(`.processo${process.name}`)

    if (time < process.arrivalTime) {
      time = parseInt(process.arrivalTime)
    }

    for (let i = 1; i <= process.executionTime; i++) {
      let cel = tableProcess.querySelector(`#tempo${i + time}`)
      setInterval(() => {
        cel.classList.add('executing')
      }, (time + i) * interval);
    }

    time += parseInt(process.executionTime)
    turnAround += (time - parseInt(process.arrivalTime))
  });

  turnAround /= processes.length

  let total = document.querySelector(`#turnaround`)
  total.innerHTML = `Turnaround médio: ${turnAround.toFixed(2)}`

  let exe = document.querySelector('.execution')
  exe.innerHTML = '<button class="btn" onclick="ClearTable()">Limpar Tabela</button>'
}

function RR() {
  CreateProcesses()
  CreateTable()
  let interval = document.querySelector('#interval').checked ? 500 : 0

  let quantum = parseInt(document.querySelector('#quantum').value)
  let overcharge = parseInt(document.querySelector('#overcharge').value)

  let localProcesses = new Array()
  processes.forEach(process => {
    localProcesses.push(process)
  })

  localProcesses.sort((a, b) => {
    return a.arrivalTime - b.arrivalTime
  })

  let time = 0
  let turnAround = 0
  let queue = new Array()

  while (localProcesses.length > 0 || queue.length > 0) {
    updateQueue()
    let process = queue.shift()
    let tableProcess = document.querySelector(`.processo${process.name}`)

    if (time < process.arrivalTime) {
      time = parseInt(process.arrivalTime)
    }

    for (let i = 1; i <= quantum + overcharge; i++) {
      if (process.executionTime <= 0) {
        break
      }
      let cel = tableProcess.querySelector(`#tempo${i + time}`)
      cel.classList.add('executing')
      if (i > quantum) {
        cel.classList.remove('executing')
        cel.classList.add('overcharge')
        if (i == quantum + overcharge) {
          process.executionTime -= quantum
          time += quantum + overcharge
          updateQueue()
          queue.push(process)
        }
      } else if (i == process.executionTime && process.executionTime - quantum <= 0) {
        time += parseInt(process.executionTime)
        turnAround += (time - parseInt(process.arrivalTime))
        updateQueue()
        break
      }
    }
  }

  turnAround /= processes.length

  let total = document.querySelector(`#turnaround`)
  total.innerHTML = `Turnaround médio: ${turnAround.toFixed(2)}`

  let exe = document.querySelector('.execution')
  exe.innerHTML = '<button class="btn" onclick="ClearTable()">Limpar Tabela</button>'

  function updateQueue() {
    if (localProcesses.length > 0) {
      for (let i = 0; i < localProcesses.length; i++) {
        if (localProcesses[i].arrivalTime <= time) {
          queue.push(localProcesses[i])
          localProcesses.splice(i, 1)
          i--
        }
      }
    }
    if (queue.length == 0 && localProcesses.length > 0) {
      time = parseInt(localProcesses[0].arrivalTime)
      updateQueue()
    }
  }
}

function EDF() {
  CreateProcesses()
  CreateTable()

  let interval = document.querySelector('#interval').checked ? 500 : 0

  let quantum = parseInt(document.querySelector('#quantum').value)
  let overcharge = parseInt(document.querySelector('#overcharge').value)
  let localProcesses = new Array()

  processes.forEach(process => {
    process.deadline = parseInt(process.arrivalTime) + parseInt(process.deadline)
    localProcesses.push(process)
    let tableProcess = document.querySelector(`.processo${process.name}`)
    let deadline = tableProcess.querySelector(`#tempo${process.deadline}`)
    deadline.classList.add('deadline')
  })

  localProcesses.sort((a, b) => {
    return a.arrivalTime - b.arrivalTime
  })

  let time = 0
  let turnAround = 0
  let queue = new Array()

  while (localProcesses.length > 0 || queue.length > 0) {
    updateQueue()

    queue.sort((a, b) => {
      if (a.deadline == b.deadline) {
        return a.arrivalTime - b.arrivalTime
      }
      return a.deadline - b.deadline
    })

    let process = queue.shift()
    let tableProcess = document.querySelector(`.processo${process.name}`)

    if (time < process.arrivalTime) {
      time = parseInt(process.arrivalTime)
    }

    for (let i = 1; i <= quantum + overcharge; i++) {
      if (process.executionTime <= 0) {
        break
      }
      let cel = tableProcess.querySelector(`#tempo${i + time}`)
      cel.classList.add('executing')
      if (i + time > process.deadline) {
        cel.classList.remove('executing')
        cel.classList.add('deadline-brust')
      }
      if (i > quantum) {
        cel.classList.remove('executing')
        cel.classList.add('overcharge')
        if (i == quantum + overcharge) {
          process.executionTime -= quantum
          time += quantum + overcharge
          updateQueue()
          queue.push(process)
        }
      } else if (i == process.executionTime && process.executionTime - quantum <= 0) {
        time += parseInt(process.executionTime)
        turnAround += (time - parseInt(process.arrivalTime))
        updateQueue()
        break
      }
    }
  }

  turnAround /= processes.length

  let total = document.querySelector(`#turnaround`)
  total.innerHTML = `Turnaround médio: ${turnAround.toFixed(2)}`

  let exe = document.querySelector('.execution')
  exe.innerHTML = '<button class="btn" onclick="ClearTable()">Limpar Tabela</button>'

  function updateQueue() {
    if (localProcesses.length > 0) {
      for (let i = 0; i < localProcesses.length; i++) {
        if (localProcesses[i].arrivalTime <= time) {
          queue.push(localProcesses[i])
          localProcesses.splice(i, 1)
          i--
        }
      }
    } if (queue.length == 0 && localProcesses.length > 0) {
      time = parseInt(localProcesses[0].arrivalTime)
      updateQueue()
    }
  }
}