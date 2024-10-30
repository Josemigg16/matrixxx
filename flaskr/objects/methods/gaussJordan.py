from fractions import Fraction
import json
import numpy as np

def gauss_jordan(A):
    # Convertimos la matriz A a un array de fracciones
    original = A
    A = np.array([[Fraction(x) for x in row] for row in A], dtype=object)
    n = len(A)
    counter = 0
    identidad = np.eye(n, dtype=object)
    # Convertimos la identidad en fracciones también
    identidad = np.array([[Fraction(x) for x in row] for row in identidad], dtype=object)
    Aumentada = np.hstack((A, identidad))
    recap = {
        'Original': original.tolist(),
        'Aumentada': [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in Aumentada.tolist()],
        'Equivalentes': [],
        'operacion': 'inversa'
    }
    print("Matriz aumentada inicial:\n", Aumentada)
    
    for i in range(n):
        print(f"\nPaso {i+1}:")
        if Aumentada[i, i] == 0:
            for j in range(i+1, n):
                if Aumentada[j, i] != 0:
                    Aumentada[[i, j]] = Aumentada[[j, i]]
                    text = f"Intercambio de fila {i+1} con fila {j+1}:\n"
                    print(text, Aumentada)
                    eq = [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in Aumentada.tolist()]
                    counter += 1
                    recap['Equivalentes'].append({
                        'text': text,
                        'matriz': eq
                    })
                    break
        
        # Asegúrate de trabajar con fracciones
        text = f"Haciendo 1 el elemento A[{i+1},{i+1}] dividiendo la fila {i+1} entre {Aumentada[i, i]}"
        print(text)
        Aumentada[i] = Aumentada[i] / Aumentada[i, i]
        eq = [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in Aumentada.tolist()]
        counter += 1
        recap['Equivalentes'].append({
                        'text': text,
                        'matriz': eq
                    })
        print("Matriz después de hacer 1 el elemento diagonal:\n", Aumentada)
        
        for j in range(n):
            if j != i:
                text = f"Haciendo cero el elemento A[{j+1},{i+1}] restando la fila {j + 1} menos la fila {i+1} multiplicada por {Aumentada[j, i]}"
                print(text)
                Aumentada[j] = Aumentada[j] - Aumentada[j, i] * Aumentada[i]
                eq = [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in Aumentada.tolist()]
                counter += 1
                recap['Equivalentes'].append({
                        'text': text,
                        'matriz': eq
                    })
                print(f"Matriz después de hacer cero el elemento A[{j+1},{i+1}]:\n", Aumentada)
    
    recap['Inversa'] = [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in Aumentada[:,n:].tolist()]
    
    return json.dumps(recap)
