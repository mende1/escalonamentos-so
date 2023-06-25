let quantum = 2
let processes = new Array()

function createProcessesDataCollection() {
  ClearTable()
  let qtd = document.querySelector('#qtd_process').value

  if(qtd > 7 || qtd < 1){
    return alert('Quantidade de processos deve ser entre 1 e 7')
  }

  let processes = document.querySelector('#processes')
  processes.innerHTML = ''

  for(i = 1; i <= qtd; i++){
    let process = document.createElement('article')
    process.classList.add('process')
    process.innerHTML = `
      <p>Processo <span id="name">${String.fromCharCode(64 + i)}</span></p>
        <div class="process-data">
        <label for="tempoChegada">Tempo de chegada: </label>
        <input type="number" name="tempoChegada" id="tempoChegada" class="input">
        <label for="tempoExecucao">Tempo de execução: </label>
        <input type="number" name="tempoExecucao" id="tempoExecucao" class="input">
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
    newProcess.nome = process.querySelector('#name').innerHTML
    newProcess.tempoExecucao = process.querySelector('#tempoExecucao').value
    newProcess.tempoChegada = process.querySelector('#tempoChegada').value
    newProcess.deadline = process.querySelector('#deadline').value
    processes.push(newProcess)
  });
}

function CreateTable() {
  let table = document.querySelector('#table')

  if(table.innerHTML != ''){
    return
  }

  processes.forEach(process => {
    table.innerHTML += `
      <tr id="processo" class="${process.nome}">
      <td id="${process.nome}">${process.nome}</td>
      </tr>`
  });
  
  let processos = document.querySelectorAll('#processo')
  
  processos.forEach(processo => {
    for(let i = 1; i <= 40; i++){
      processo.innerHTML += `
        <td id="tempo${i}"></td>
      `
    }
  });
}

function EscalonamentoFIFO() {
  CreateProcesses()
  CreateTable()
  processes.sort((a, b) => {
    return a.tempoChegada - b.tempoChegada
  })

  ExecuteFIFOAndSJF(processes)
}

function EscalonamentoSJF() {
  CreateProcesses()
  CreateTable()
  
  processes.sort((a, b) => {
    return a.tempoChegada - b.tempoChegada
  })

  let fila = new Array()

  for(let tempo = 0; tempo <= 40; tempo++){
    let filter = processes.filter(process => process.tempoChegada <= tempo)
    if(filter.length > 0){
      filter.sort((a, b) => {
        return a.tempoExecucao - b.tempoExecucao
      })
      filter.forEach(process => {
        fila.push(process)
        tempo += parseInt(process.tempoExecucao)
        processes.splice(processes.indexOf(process), 1)
      })
    }
  }  
  ExecuteFIFOAndSJF(fila) 
}

function ExecuteFIFOAndSJF(processes) {
  let tempo = 0
  let turnAround = 0
  
  processes.forEach(process => {
    let = tableProcess = document.querySelector(`.${process.nome}`)
    
    if(tempo < process.tempoChegada){
      tempo = parseInt(process.tempoChegada)
    }
    
    for(let i = 1; i <= process.tempoExecucao; i++){
      let cel = tableProcess.querySelector(`#tempo${i + tempo}`)
      cel.classList.add('executando') 
    }
    
    tempo += parseInt(process.tempoExecucao)
    turnAround += (tempo - parseInt(process.tempoChegada))
  });

  turnAround = turnAround / processes.length

  let total = document.querySelector(`#turnaround`)
  total.innerHTML = `Turnaround médio: ${turnAround.toFixed(2)}`

  let exe = document.querySelector('.execution')
  exe.innerHTML = '<button class="btn" onclick="ClearTable()">LimparTabela</button>'
}

function ClearTable() {
  let table = document.querySelector('#table')
  table.innerHTML = ''
  processes = new Array()
  let exe = document.querySelector('.execution')
  exe.innerHTML = `<button class="btn" onclick="EscalonamentoFIFO()">FIFO</button>
  <button class="btn" onclick="EscalonamentoSJF()">SJF</button>
  <button class="btn">Round Robin</button>
  <button class="btn">EDF</button>`
  let total = document.querySelector(`#turnaround`)
  total.innerHTML = ''
}
