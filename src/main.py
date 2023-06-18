import ui
import process_algorithms.fifo as fifo
import process_algorithms.sjf as sjf
import process_algorithms.round_robin as round_robin
import process_algorithms.edf as edf

algorithms = ["FIFO", "SJF", "Round Robin", "EDF"]

algorith = ui.ask_for_algorithm(algorithms)

n_of_process = ui.ask_for_number_of_process()

quantum = ui.ask_for_quantum()
overload = ui.ask_for_overload()
process_data = ui.ask_for_process_datas(n_of_process)

match algorith:
    case 0:
        fifo.resolves(process_data)
    case 1:
        sjf.resolves(process_data)
    case 2:
        round_robin.resolves(process_data)
    case 3:
        edf.resolves(process_data)

ui.end_program()
