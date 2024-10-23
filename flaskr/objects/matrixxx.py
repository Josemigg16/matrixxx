import numpy as np

#importing methods
from objects.methods.reverse import inversa_matriz

class Matrixxx:
    
    def __init__(self, array):
        self.matriz = np.array(array)

    def show(self):
        print(self.matriz)

    def transpose(self):
        self.matriz = np.transpose(self.matriz)
        return self.matriz

    def inverse(self):
        self.matriz = inversa_matriz(self.matriz)
        return self.matriz
    

