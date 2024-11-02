from fractions import Fraction
import numpy as np
import json

def gauss(A):
    original = A  # Aquí A es una lista
    A = np.array([[Fraction(x) for x in row] for row in A], dtype=object)  # Convertimos A a numpy array
    rows, cols = A.shape 
    is_augmented = (cols == rows + 1)  
    recap = {
        'Original': original,
        'Equivalentes': [],
        'operacion': 'gauss'
    }
    
    print("Matriz original:\n", A)

    # Comenzamos el proceso de eliminación Gaussiana
    for i in range(min(rows, cols - (1 if is_augmented else 0))):  
        print(f"\nPaso {i+1}:")
        
        if A[i, i] == 0:
            for j in range(i + 1, rows):
                if A[j, i] != 0:
                    A[[i, j]] = A[[j, i]]  # Intercambio de filas
                    text = f"Intercambio de fila {i + 1} con fila {j + 1}:\n"
                    print(text, A)
                    recap['Equivalentes'].append({'text': text, 'matriz': A.tolist()})
                    break
        
        if A[i, i] != 0:
            # Normalizando fila dividiendo entre el pivote
            A[i] = A[i] / A[i, i]
            text = f"Normalizando fila {i + 1} dividiendo entre el pivote A[{i + 1},{i + 1}] = {A[i, i]}"
            print(text)
            recap['Equivalentes'].append({'text': text, 'matriz': A.tolist()})
            print("Matriz después de normalizar el pivote:\n", A)
        
        for j in range(i + 1, rows):
            if i < cols - (1 if is_augmented else 0):  
                factor = A[j, i]
                # Haciendo cero el elemento
                A[j] = A[j] - factor * A[i]
                text = f"Haciendo cero el elemento A[{j + 1},{i + 1}] restando la fila {j + 1} menos {factor} veces la fila {i + 1}"
                print(text)
                recap['Equivalentes'].append({'text': text, 'matriz': A.tolist()})
                print(f"Matriz después de hacer cero el elemento A[{j + 1},{i + 1}]:\n", A)

    return json.dumps(recap, indent=4)
