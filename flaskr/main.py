from flask import Flask,request, Blueprint
from flask_cors import CORS
from objects.matrixxx import Matrixxx

app = Flask(__name__)

api_blueprint = Blueprint('api', __name__)
CORS(app)

@app.route('/')
def hello():
    matriz = Matrixxx([[4,-2,0], [-7, 4, 1], [1, 2, 3]])
    matriz.show()
    matriz.transpose()
    matriz.inverse()
    matriz.show()
    return 'Hello, World!'

@api_blueprint.route('/upload', methods=['POST'])
def upload():
    if request.is_json:
        data = request.get_json()
        print(data)
    return 'Upload'


app.register_blueprint(api_blueprint, url_prefix='/api')
app.run(debug=True)