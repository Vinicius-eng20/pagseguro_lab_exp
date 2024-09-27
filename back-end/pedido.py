import requests
from dotenv import load_dotenv
import os

load_dotenv()

token = os.getenv("TOKEN")

headers = {
    "accept": "*/*",
    "Authorization": "Bearer " + token,
    "content-type": "application/json"
}

url_pedido = "https://sandbox.api.pagseguro.com/orders"

def pay_order(jsonPedido, jsonCardInfo):
    criar_ordem = requests.post(url_pedido, headers=headers, json=jsonPedido)

    if criar_ordem.status_code != 201:
        return f"Erro ao criar pedido: {criar_ordem.status_code}"
    
    json = criar_ordem.text
    orderID = json["body"]["id"]
    payURL = f'{url_pedido}/{orderID}/pay'

    response = requests.post(payURL, headers=headers, json=jsonCardInfo)

    return response.text

# response = requests.post(url, json=payload, headers=headers)

# print(response.status_code)
# print(response.text)

# orderId = response["body"]["id"]

# orderID = "ORDE_D404CAF3-8FB3-4D7F-9DA9-E837D3F6A97C"

# payURL = f'{url}/{orderID}/pay'

# response = requests.post(payURL, headers=headers, json=charges)

# print(response)
# print(response.text)

