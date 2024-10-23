from flask import Flask
from objects.matrixxx import Matrixxx

app = Flask(__name__)


@app.route('/')
def hello():
    matriz = Matrixxx([[4,-2,0], [-7, 4, 1], [1, 2, 3]])
    matriz.show()
    matriz.transpose()
    matriz.inverse()
    matriz.show()
    return 'Hello, World!'

app.run(debug=True)