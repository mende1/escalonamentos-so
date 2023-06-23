let quantum = 2
var processes = new Array()

function createProcessesDataCollection() {
  let qtd = document.querySelector('#qtd_process').value

  if(qtd > 7){
    return alert('Quantidade máxima de processos é 7')
  }

  let processes = document.querySelector('#processes')
  processes.innerHTML = ''

  for(i = 1; i <= qtd; i++){
    let process = document.createElement('article')
    process.classList.add('process')
    process.innerHTML = `
      <p>Processo <span id="name">${String.fromCharCode(64 + i)}</span></p>
        <div class="process-data">
          <label for="tempoExecucao">Tempo de execução: </label>
          <input type="number" name="tempoExecucao" id="tempoExecucao" class="input">
          <label for="tempoChegada">Tempo de chegada: </label>
          <input type="number" name="tempoChegada" id="tempoChegada" class="input">
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
  console.log(processes)
}

function CreateTable() {
  let table = document.querySelector('#table')

  if(table.innerHTML != ''){
    return
  }

  processes.forEach(process => {
    table.innerHTML += `
      <tr id="processo" class="${process.nome}">
      <td id="0">${process.nome}</td>
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
    return a.tempoExecucao - b.tempoExecucao
  })

  ExecuteFIFOAndSJF(processes)
}

function ExecuteFIFOAndSJF(processes) {
  let tempo = 0
  
  processes.forEach(process => {
    let = tableProcess = document.querySelector(`.${process.nome}`)
    for(let i = 1; i <= process.tempoExecucao; i++){
      let cel = tableProcess.querySelector(`#tempo${i + tempo}`)
      cel.classList.add('executando')
    }
    tempo += parseInt(process.tempoExecucao)
  });
}

