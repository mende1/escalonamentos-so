def ask_for_algorithm(algorithms):
    print("Escolha o algoritmo desejado:")

    for i, algorithm in enumerate(algorithms):
        print(f"{i} => {algorithm}")

    answer = int(input("Escolha o número: "))

    return answer


def ask_for_number_of_process():
    n_of_process = int(input("Quantos processos para serem escalados? "))

    return n_of_process


def ask_for_quantum():
    quantum = int(input("Qual é o quantum do sistema? "))

    return quantum


def ask_for_overload():
    overload = int(input("Qual é a sobrecarga do sistema? "))

    return overload


def ask_for_process_datas(n_of_process):
    process_datas = []

    for i in range(n_of_process):
        print(f"\n========= Processo {i} =========\n")

        process_inputs = {}

        arrival_time = int(input(f"Qual o tempo de chegada para o processo {i}? "))
        process_inputs["arrival_time"] = arrival_time

        runtime = int(input(f"Qual o tempo de execução do processo {i}? "))
        process_inputs["runtime"] = runtime

        deadline = int(input(f"Qual o deadline do processo {i}? "))
        process_inputs["deadline"] = deadline

        priority = int(input(f"Qual a prioridade do processo {i}? "))
        process_inputs["priority"] = priority

        process_datas.append(process_inputs)

        print()

    return process_datas
