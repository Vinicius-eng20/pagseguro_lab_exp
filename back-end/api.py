from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Ativa o CORS para todos os domínios e rotas

# Exemplo de rota GET
@app.route('/api/data', methods=['GET'])
def get_data():
    # Aqui você pode adicionar lógica para obter dados
    response_data = {
        "message": "Esta é uma resposta GET",
        "data": [1, 2, 3, 4, 5]
    }
    return jsonify(response_data)

# Exemplo de rota POST
@app.route('/api/data', methods=['POST'])
def post_data():
    # Obtém os dados enviados na requisição POST
    incoming_data = request.json
    
    # Aqui você pode adicionar lógica para processar os dados
    response_data = {
        "message": "Dados recebidos com sucesso",
        "received_data": incoming_data
    }
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)
