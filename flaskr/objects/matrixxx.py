import numpy as np

class Matrixxx:
    
    def __init__(self, array):
        self.matriz = np.array(array)

    def show(self):
        print(self.matriz)
    def transpose(self):
        self.matriz = np.transpose(self.matriz)
        return self.matriz