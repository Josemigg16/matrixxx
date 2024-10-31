from fractions import Fraction
import numpy as np
import json

def lu_factorizacion(A):
    # Convertimos la matriz A a un array de fracciones
    A = np.array([[Fraction(x) for x in row] for row in A], dtype=object)
    n = len(A)
    L = np.eye(n, dtype=object)  # Matriz identidad como base para L
    U = A.copy()  # Copiamos A como base para U
    recap = {
        'Equivalentes': [],  
        'L': None,  
        'U': None   
    }
    
    # Eliminar los elementos debajo de la diagonal (eliminación gaussiana)
    for i in range(n):
        # Asegurarse de que no estamos dividiendo por cero
        if U[i, i] == 0:
            raise ValueError(f"El pivote en la posición ({i+1},{i+1}) es cero. Se requiere un pivote distinto de cero para la factorización LU.")
        
        # Hacer ceros debajo de la diagonal en la columna i
        for j in range(i+1, n):
            factor = U[j, i] / U[i, i]  # Este es el número por el cual multiplicamos la fila i para eliminar el elemento U[j, i]
            L[j, i] = factor  # Guardamos el factor en la matriz L
            U[j] = U[j] - factor * U[i]  # Restamos el múltiplo de la fila i de la fila j para hacer cero en la posición (j, i)
            
            # Guardamos este paso en el recap
            recap['Equivalentes'].append({
                'text': f"Restar {factor} * fila {i+1} a la fila {j+1} para hacer cero el elemento U[{j+1},{i+1}]",
                'U': [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in U.tolist()],
                'L': [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in L.tolist()]
            })

    # Convertimos las matrices L y U a fracciones legibles
    recap['L'] = [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in L.tolist()]
    recap['U'] = [[f"{frac.numerator}/{frac.denominator}" for frac in row] for row in U.tolist()]

    return json.dumps(recap, indent=4)