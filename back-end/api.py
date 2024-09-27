from flask import Flask, request, jsonify
from flask_cors import CORS
import requests, os, json
from dotenv import load_dotenv

load_dotenv()
token = os.getenv("TOKEN")

headers = {
    "accept": "*/*",
    "Authorization": "Bearer " + token,
    "content-type": "application/json"
}

url_pedido = "https://sandbox.api.pagseguro.com/orders"

app = Flask(__name__)

CORS(app)

# Variáveis globais para armazenar os JSONs
jsonPedido_data = None
cardInfo_data = None
orderID = None

@app.route('/process_payment', methods=['POST'])
def process_payment():
    global jsonPedido_data, cardInfo_data, orderID

    try:
        # Recebe os JSONs da requisição
        jsonPedido = request.json.get('jsonPedido')
        cardInfo = request.json.get('cardInfo')

        if not jsonPedido or not cardInfo:
            return jsonify({"error": "jsonPedido ou cardInfo não fornecido"}), 400

        # Armazena os dados nos globais
        jsonPedido_data = jsonPedido
        cardInfo_data = cardInfo

        jsonFinal = {**jsonPedido_data, **cardInfo_data}
        
        response = requests.post(url_pedido, headers=headers, json=jsonFinal)
        json_data = json.loads(response.text)

        print(json_data)

        orderID = json_data["id"]
        # status = json_data["response"]["charges"][0]["status"]
        status = json_data["charges"][0]["status"]

        if status == "DECLINED":
            return jsonify({"error": "Pagamento recusado"}), 400

        # Resposta de sucesso
        return jsonify({"message": "Pagamento processado e dados armazenados com sucesso"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_payment_info', methods=['GET'])
def get_payment_info():
    # Verifica se os dados foram recebidos e armazenados
    # if jsonPedido_data is None or cardInfo_data is None:
    if orderID is None:
        return jsonify({"error": "Nenhum dado encontrado, envie um POST primeiro"}), 404
    
    getURL = f"{url_pedido}/{orderID}"
    response = requests.get(getURL, headers=headers)
    json_data = json.loads(response.text)

    # return jsonify(**jsonPedido_data, **cardInfo_data), 200
    return jsonify(json_data), 200

if __name__ == '__main__':
    app.run(debug=True)
