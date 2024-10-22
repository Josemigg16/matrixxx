from flask import Flask
from objects.matrixxx import Matrixxx

app = Flask(__name__)


@app.route('/')
def hello():
    matriz = Matrixxx([[2,2],[3,2]])
    matriz.show()
    matriz.transpose()
    matriz.show()
    return 'Hello, World!'

app.run(debug=True)