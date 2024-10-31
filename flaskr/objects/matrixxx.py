import numpy as np

#importing methods
from objects.methods.gaussJordan import gauss_jordan
from objects.methods.lu import lu_factorizacion

class Matrixxx:
    
    def __init__(self, array):
        self.matriz = np.array(array)

    def show(self):
        print(self.matriz)

    def transpose(self):
        data = np.transpose(self.matriz)
        return data

    def inverse(self):
        # Verificar que la matriz sea cuadrada
        if self.matriz.shape[0] != self.matriz.shape[1]:
            raise ValueError("La matriz debe ser cuadrada para calcular su inversa.")
        
        # Verificar que la determinante sea diferente de 0
        if np.linalg.det(self.matriz) == 0:
            raise ValueError("La matriz no tiene inversa porque su determinante es 0.")
        
        # Si pasa las validaciones, usar el método de Gauss-Jordan
        data = gauss_jordan(self.matriz)
        return data

    def lu(self):
        data = lu_factorizacion(self.matriz)
        return data
