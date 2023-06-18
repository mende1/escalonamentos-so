import ui

algorithms = ["FIFO", "SJF", "Round Robin", "EDF"]

algorith = ui.ask_for_algorithm(algorithms)

n_of_process = ui.ask_for_number_of_process()

quantum = ui.ask_for_quantum()
overload = ui.ask_for_overload()
process_data = ui.ask_for_process_datas(n_of_process)
