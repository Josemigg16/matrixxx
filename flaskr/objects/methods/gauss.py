from fractions import Fraction
import numpy as np
import json

def gauss(A):
    # Convertimos la matriz A a un array de fracciones para mantener la precisión
    original = A
    A = np.array([[Fraction(x) for x in row] for row in A], dtype=object)
    n = len(A)
    counter = 0  # Contador para las operaciones
    recap = {
        'Original': original.tolist(),
        'Equivalentes': [],
        'operacion': 'gauss'
    }
    
    print("Matriz original:\n", A)

    for i in range(n):
        print(f"\nPaso {i+1}:")
        # Si el pivote es 0, intercambiamos filas
        if A[i, i] == 0:
            for j in range(i+1, n):
                if A[j, i] != 0:
                    A[[i, j]] = A[[j, i]]  # Intercambio de filas
                    text = f"Intercambio de fila {i+1} con fila {j+1}:\n"
                    print(text, A)
                    eq = [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in A.tolist()]
                    counter += 1
                    recap['Equivalentes'].append({
                        'text': text,
                        'matriz': eq
                    })
                    break

        # Dividimos la fila actual por el pivote para normalizar el pivote a 1
        text = f"Normalizando fila {i+1} dividiendo entre el pivote A[{i+1},{i+1}] = {A[i, i]}"
        print(text)
        A[i] = A[i] / A[i, i]
        eq = [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in A.tolist()]
        counter += 1
        recap['Equivalentes'].append({
            'text': text,
            'matriz': eq
        })
        print("Matriz después de normalizar el pivote:\n", A)
        
        # Hacemos ceros por debajo del pivote
        for j in range(i+1, n):
            text = f"Haciendo cero el elemento A[{j+1},{i+1}] restando la fila {j+1} menos {A[j, i]} veces la fila {i+1}"
            print(text)
            A[j] = A[j] - A[j, i] * A[i]
            eq = [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in A.tolist()]
            counter += 1
            recap['Equivalentes'].append({
                'text': text,
                'matriz': eq
            })
            print(f"Matriz después de hacer cero el elemento A[{j+1},{i+1}]:\n", A)

    return json.dumps(recap, indent=4)
