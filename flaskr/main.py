from flask import Flask,request, Blueprint, jsonify, json
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

@api_blueprint.route('/inverse', methods=['GET', 'POST'])
def inverse():
    if request.method == 'GET':
        sampleMatrix= [[4, -2, 0], [-7, 4, 1], [1, 2, 3]]
        data = Matrixxx(sampleMatrix).inverse()
        return jsonify(json.loads(data))
    elif request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            try:
                matrix_data = [[float(num) for num in row] for row in data]
                print('Datos recibidos:', matrix_data)
                print('Inversa calculada')
                return json.dumps(Matrixxx(matrix_data).inverse())
            except ValueError as e:
                error_message = str(e)
                return jsonify({"error": f"{error_message}"}), 400
        else:
            return jsonify({"error": "El cuerpo de la solicitud no es JSON."}), 400

@api_blueprint.route('/lu', methods=['GET', 'POST'])
def lu():
    if request.method == 'GET':
        sampleMatrix= [[4, -2, 0], [-7, 4, 1], [1, 2, 3]]
        data = Matrixxx(sampleMatrix).lu()
        return jsonify(json.loads(data))
    elif request.method == 'POST':
        data = request.get_json()
        return Matrixxx(data).lu()

app.register_blueprint(api_blueprint, url_prefix='/api')
app.run(debug=True)