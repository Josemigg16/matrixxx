import numpy as np

def factorizacion_LU(A):
    A = np.array(A, dtype=float)  # Convertir A a un array de tipo float
    n = len(A)  # Obtener el tamaño de la matriz
    L = np.zeros((n, n))  # Inicializar matriz L
    U = np.zeros((n, n))  # Inicializar matriz U
    
    # Iniciar la factorización LU
    for i in range(n):
        print(f"\nPaso {i+1}:")
        
        # Calcular U
        for j in range(i, n):
            suma = np.sum(L[i, :i] * U[:i, j])  # Sumar productos anteriores
            U[i, j] = A[i, j] - suma  # Calcular elemento de U
            print(f"Calculando U[{i+1},{j+1}] = A[{i+1},{j+1}] - suma = {A[i, j]} - {suma:.4f} => U[{i+1},{j+1}] = {U[i, j]:.4f}")

        # Calcular L
        for j in range(i + 1, n):
            suma = np.sum(L[j, :i] * U[:i, i])  # Sumar productos anteriores
            L[j, i] = (A[j, i] - suma) / U[i, i]  # Calcular elemento de L
            print(f"Calculando L[{j+1},{i+1}] = (A[{j+1},{i+1}] - suma) / U[{i+1},{i+1}] = ({A[j, i]} - {suma:.4f}) / {U[i, i]:.4f} => L[{j+1},{i+1}] = {L[j, i]:.4f}")
    
    # L debe tener 1s en la diagonal
    np.fill_diagonal(L, 1)
    
    print("\nMatriz L final:\n", L)
    print("Matriz U final:\n", U)
    
    return L, U

# Ejemplo de uso
A = [[4, 3], [6, 3]]
L, U = factorizacion_LU(A)
