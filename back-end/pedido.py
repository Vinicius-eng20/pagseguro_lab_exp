import requests
from dotenv import load_dotenv
import os

load_dotenv()

token = os.getenv("TOKEN")

url = "https://sandbox.api.pagseguro.com/orders"

payload = {
    "customer": {
        "name": "Jose da Silva",
        "email": "email@test.com",
        "tax_id": "12345678909",
        "phones": [
            {
                "country": 55,
                "area": 11,
                "number": 999999999
            }
        ]
    },
    "shipping": { 
        "address": {
            "street": "Avenida Brigadeiro Faria Lima",
            "number": "1384",
            "complement": "apto 12",
            "locality": "Pinheiros",
            "city": "São Paulo",
            "region_code": "SP",
            "country": "BRA",
            "postal_code": "01452002"
        } },
    "reference_id": "ex-00001",
    "items": [
        {
            "name": "item 1",
            "quantity": 1,
            "unit_amount": 500
        }
    ],
    "notification_urls": ["https://meusite.com/notificacoes"]
}
headers = {
    "accept": "*/*",
    "Authorization": "Bearer d0c88e61-dd0c-4b84-9111-8599d759cff3ce50619140ff884808dfa689d40098936a63-5d2d-4b52-b326-1eef9a60cc96",
    "content-type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json)

