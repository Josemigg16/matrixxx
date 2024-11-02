import re
import numpy as np
import json
from fractions import Fraction
from matrixxx import Matrixxx
from methods.gauss import gauss  # Asegúrate de que esta función esté correctamente definida

class LinearEquationSystem:
    def __init__(self, equations):
        self.equations = equations
        self.coefficient_matrix = None
        self.variables = []
        self.independent_terms = []

        self.parse_equations()

    def parse_equations(self):
        coefficients = []
        terms = []
        variables_set = set()

        for eq in self.equations:
            # Separar lado izquierdo (ecuación) y derecho (término independiente)
            left_side, right_side = eq.split('=')
            right_side = Fraction(right_side.strip())  # Término independiente
            terms.append(right_side)

            # Encontrar coeficientes y variables usando regex
            pattern = r'([+-]?\d*\.?\d+)([a-zA-Z]+)'
            matches = re.findall(pattern, left_side)

            row_coefficients = []
            for match in matches:
                coefficient, variable = match
                coefficient = Fraction(coefficient) if coefficient else Fraction(1)
                row_coefficients.append(coefficient)
                variables_set.add(variable)

            # Aseguramos que todos los coeficientes tengan el mismo tamaño
            while len(row_coefficients) < len(variables_set):
                row_coefficients.append(Fraction(0))

            coefficients.append(row_coefficients)

        # Ordenamos las variables (importante para ecuaciones de múltiples variables)
        self.variables = sorted(list(variables_set))
        self.coefficient_matrix = Matrixxx(coefficients)
        self.independent_terms = np.array(terms, dtype=object)

    def show_system(self):
        print("Variables:", self.variables)
        print("Matriz de coeficientes:")
        self.coefficient_matrix.show()
        print("Términos independientes:", self.independent_terms)

    def gauss(self):
        # Convertimos la matriz de coeficientes y los términos independientes en una matriz aumentada
        augmented_matrix = np.hstack([self.coefficient_matrix.matriz, self.independent_terms.reshape(-1, 1)])

        # Usamos la función de Gauss para obtener la triangular superior
        recap = gauss(augmented_matrix.tolist())  # Convierte la matriz a lista para Gauss
        triangular_superior = np.array(recap, dtype=object)  # Aseguramos que sea un ndarray

        # Realiza la sustitución regresiva para obtener las soluciones
        soluciones = self.sustitucion_regresiva(triangular_superior)
        return soluciones

    def sustitucion_regresiva(self, triangular_superior):
        n = triangular_superior.shape[0]
        soluciones = np.zeros(n, dtype=object)  # dtype=object para manejar Fracciones
        for i in range(n - 1, -1, -1):
            suma = sum(triangular_superior[i, j] * soluciones[j] for j in range(i + 1, n))
            soluciones[i] = triangular_superior[i, -1] - suma  # Restamos la suma de los valores
        return soluciones

    def soluciones_a_json(self, soluciones):
        # Convertir las soluciones a cadenas
        return [str(sol) for sol in soluciones]

# Ejemplo de uso:
if __name__ == "__main__":
    equations = ['1x + 2y + 3z = 1', '4x + 5y + 6z = 2', '7x + 8y + 9z = 3']
    system = LinearEquationSystem(equations)
    system.show_system()
    resultado_gauss = system.gauss()
    
    # Convertir soluciones a JSON
    soluciones_json = system.soluciones_a_json(resultado_gauss)
    
    # Imprimir las soluciones
    print("Soluciones del sistema:", resultado_gauss)
    print("Soluciones en formato JSON:", json.dumps(soluciones_json, indent=4))
