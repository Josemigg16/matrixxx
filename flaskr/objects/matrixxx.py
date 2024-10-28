import numpy as np

#importing methods
from objects.methods.reverse import inversa_matriz
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
        data = inversa_matriz(self.matriz)
        return data
    
    def lu(self):
        data = lu_factorizacion(self.matriz)
        return data
    

