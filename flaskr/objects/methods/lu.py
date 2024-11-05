from fractions import Fraction
import numpy as np
import json

def lu_factorizacion(A):
    # Convertimos la matriz A a un array de fracciones
    original = [[f"{Fraction(x).numerator}/{Fraction(x).denominator}" for x in row] for row in A]
    A = np.array([[Fraction(x) for x in row] for row in A], dtype=object)
    n = len(A)
    L = np.eye(n, dtype=object)  # Matriz identidad como base para L
    U = A.copy()  # Copiamos A como base para U
    P = np.eye(n, dtype=object)  # Matriz de permutación
    recap = {
        'Original': original,
        'Equivalentes': [],  
        'L': None,  
        'U': None,
        'operacion': 'LU'
    }
    hubo_intercambio = False  # Variable para detectar si hubo intercambios
    
    # Eliminar los elementos debajo de la diagonal (eliminación gaussiana)
    for i in range(n):
        # Si el pivote es cero, buscamos intercambiar filas
        if U[i, i] == 0:
            for k in range(i+1, n):
                if U[k, i] != 0:
                    # Intercambiamos las filas i y k en U, L, y P
                    U[[i, k]] = U[[k, i]]
                    P[[i, k]] = P[[k, i]]
                    if i > 0:  # Intercambiamos también en L, hasta la columna i
                        L[[i, k], :i] = L[[k, i], :i]
                    recap['Equivalentes'].append({
                        'text': f"Intercambiar fila {i+1} con fila {k+1} debido a pivote cero",
                        'P': [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in P.tolist()],
                        'L': [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in L.tolist()],
                        'U': [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in U.tolist()]
                    })
                    hubo_intercambio = True
                    break
            else:
                return json.dumps({'error': 'No se encontró un pivote no cero para la posición ({}, {})'.format(i+1, i+1)})

        # Hacer ceros debajo de la diagonal en la columna i
        for j in range(i+1, n):
            factor = U[j, i] / U[i, i]
            L[j, i] = factor
            U[j] = U[j] - factor * U[i]
            recap['Equivalentes'].append({
                'text': f"Para hacer 0 el elemento U[{j+1}, {i+1}], y realizaremos la operacion Fila {j + 1} - ({factor}) * Fila {i + 1}",
                'U': [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in U.tolist()],
                'L': [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in L.tolist()],
                'factor': f"{factor}"
            })

    # Convertimos las matrices L y U a fracciones legibles
    recap['L'] = [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in L.tolist()]
    recap['U'] = [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in U.tolist()]
    
    # Solo añadimos P al recap si hubo intercambios
    if hubo_intercambio:
        recap['P'] = [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in P.tolist()]

    return json.dumps(recap, indent=4)

