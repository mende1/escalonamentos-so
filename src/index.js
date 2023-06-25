let quantum = 2
let processes = new Array()
//-------------------------- Criar Tabela e Processos --------------------------//
function CreateTable() {
  let table = document.querySelector('#table')

  if(table.innerHTML != ''){
    return
  }

  processes.forEach(process => {
    table.innerHTML += `
      <tr id="process" class="${process.name}">
      <td id="${process.name}">${process.name}</td>
      </tr>`
  });
  
  let tableProcessos = document.querySelectorAll('#process')
  
  tableProcessos.forEach(process => {
    for(let i = 1; i <= 40; i++){
      process.innerHTML += `
        <td id="tempo${i}"></td>
      `
    }
  });
}

function createProcessesDataCollection() {
  ClearTable()
  let qtt = document.querySelector('#qtt_process').value

  if(qtt > 7 || qtt < 1){
    return alert('Quantidade de processos deve ser entre 1 e 7')
  }

  let processes = document.querySelector('#processes')
  processes.innerHTML = ''

  processes.innerHTML = `
    <label for="quantum">Quantum: </label>
    <input type="number" name="Quantum do Sistema" id="Quantum" class="input">
    <label for="overcharge">Sobrecarga do Sistema: </label>
    <input type="number" name="overcharge" id="overcharge" class="input">
  `

  for(i = 1; i <= qtt; i++){
    let process = document.createElement('article')
    process.classList.add('process')
    process.innerHTML = `
      <p>Processo <span id="name">${String.fromCharCode(64 + i)}</span></p>
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
  <button class="btn">Round Robin</button>
  <button class="btn">EDF</button>`
  let total = document.querySelector(`#turnaround`)
  total.innerHTML = ''
}

function ClearTable() {
  let table = document.querySelector('#table')
  table.innerHTML = ''
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

  for(let tempo = 0; tempo <= 40; tempo++){
    let filter = processes.filter(process => process.arrivalTime <= tempo)
    if(filter.length > 0){
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
  
  processes.forEach(process => {
    let = tableProcess = document.querySelector(`.${process.name}`)
    
    if(time < process.arrivalTime){
      time = parseInt(process.arrivalTime)
    }
    
    for(let i = 1; i <= process.executionTime; i++){
      let cel = tableProcess.querySelector(`#tempo${i + time}`)
      cel.classList.add('executing') 
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

