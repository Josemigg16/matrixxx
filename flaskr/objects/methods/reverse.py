import numpy as np

def inversa_matriz(A):
    A = np.array(A, dtype=float)
    n = len(A)
    identidad = np.eye(n)
    Aumentada = np.hstack((A, identidad))
    print("Matriz aumentada inicial:\n", Aumentada)
    
    for i in range(n):
        print(f"\nPaso {i+1}:")
        if Aumentada[i, i] == 0:
            for j in range(i+1, n):
                if Aumentada[j, i] != 0:
                    Aumentada[[i, j]] = Aumentada[[j, i]]
                    print(f"Intercambio de fila {i+1} con fila {j+1}:\n", Aumentada)
                    break
        
        print(f"Haciendo 1 el elemento A[{i+1},{i+1}] dividiendo la fila {i+1} entre {Aumentada[i, i]:.4f}")
        Aumentada[i] = Aumentada[i] / Aumentada[i, i]
        print("Matriz después de hacer 1 el elemento diagonal:\n", Aumentada)
        
        for j in range(n):
            if j != i:
                print(f"Haciendo cero el elemento A[{j+1},{i+1}] restando {Aumentada[j, i]:.4f} veces la fila {i+1}")
                Aumentada[j] = Aumentada[j] - Aumentada[j, i] * Aumentada[i]
                print(f"Matriz después de hacer cero el elemento A[{j+1},{i+1}]:\n", Aumentada)
    
    inversa = Aumentada[:, n:]
    
    return inversa


