let jsonPedido, cardInfo, hasErrors, errors;

// Requisição para método de pagamento
pagar.addEventListener('click', () => { 
    const cartao = PagSeguro.encryptCard({
        publicKey: PUBLIC_KEY(),
        holder: cardNome.value,
        number: parseInt(cardNumber.value.replace(/\D/g, '')),
        expMonth: parseInt(monthSelect.value),
        expYear: parseInt(yearSelect.value),
        securityCode: cvvInput.value
      });

    const encryptedCard = cartao.encryptedCard;
    hasErrors = cartao.hasErrors;
    errors = cartao.errors;

    console.log(hasErrors)
    console.log(errors)

    const cpf = cpfInput.value.replace(/\D/g, '');

    // Objeto JSON para armazenar as informações
    jsonPedido = {
        "reference_id": "ex-00001",
        "notification_urls": [
            "https://example.com/notifications"
        ]
    };

    let listaItems = [];
    let listaPhones = [];

    // Customer ------------------------------------
    listaPhones.push({
        "country": "55",
        "area": dddInput.value,
        "number": telefoneInput.value.replace(/\D/g, ''),
        "type": typeNumberInput.value
    });


    jsonPedido.customer = {
        "name": nameInput.value,
        "email": emailInput.value,
        "tax_id": cpf,
        "phones": listaPhones
    };

    // Shipping ------------------------------------

    let complemento = complementoInput.value;

    if (complemento == "") complemento = "no complement";

    jsonPedido.shipping = {
        "address": {
            "street": addressInput.value,
            "number": numberAddressInput.value,
            "complement": complemento,
            "locality": bairroInput.value,
            "city": cidadeSelect.value,
            "region_code": estadoSelect.value,
            "country": "BRA",
            "postal_code": cepInput.value.replace(/\D/g, '')
        }
    };

    // Items ------------------------------------
    itens.forEach(item => {
        let nomeProduto = item.querySelector('.item').textContent.trim();
        let qtdeProduto = parseInt(item.querySelector('.qtde').textContent.trim());
        let precoProduto = parseFloat(item.querySelector('.unit-value').textContent.trim().replace(",", "."));

        listaItems.push({
            "name": nomeProduto,
            "quantity": qtdeProduto,
            "unit_amount": precoProduto * 100
        });
    });

    jsonPedido.items = listaItems;

    // Charges ------------------------------------
    cardInfo = {
        "charges": [
            {
                "amount": {
                    "value": total * 100,
                    "currency": "BRL"
                },
                "payment_method": {
                    "card": {
                        // "holder": {
                        //     "name": cardNome.value,
                        //     "tax_id": cpf
                        // },
                        // "number": parseInt(cardNumber.value.replace(/\D/g, '')),
                        // "exp_month": parseInt(monthSelect.value),
                        // "exp_year": parseInt(yearSelect.value),
                        // "security_code": cvvInput.value,
                        "encrypted": encryptedCard,
                        "store": false
                    },
                    "type": findSelected(),
                    "installments": 1,
                    "capture": true,
                    "soft_descriptor": "Loja teste"
                },
                "reference_id": "ex-00001",
                "description": "cobrança teste",
                "notification_urls": ""
            }
        ]
    }

    console.log(jsonPedido)
    console.log(cardInfo)
});

function req(){
    fetch('http://localhost:5000/process_payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jsonPedido, cardInfo })
    })
        .then(async response => {
            if (!response.ok) {
              // Verificar se o status é 400 e lidar com o erro
              if (response.status === 400) {
                const errorData = await response.json();
                alert("Pagamento recusado");
                  throw new Error(`Erro 400: ${errorData.mensagem || 'Requisição inválida'}`);
              }
              // Lidar com outros tipos de erro
              throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }
            // Se a resposta for bem-sucedida, converta para JSON
            return response.json();
          })
          .then(data => {
            console.log('Dados recebidos:', data);
            alert('Transação realizada com êxito!');
            window.location.href = 'pedido.html';
          })
          .catch(error => {
            // Lida com qualquer erro
            console.error('Erro ao fazer a requisição:', error.message);
          });
}