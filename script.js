// Definindo o intervalo de anos
const startYear = 2024;
const endYear = 2044;

// Elementos
const cardNumber = document.querySelector('#cardNum');
const cpfInput = document.querySelector('#cpf');
const monthSelect = document.querySelector('#monthSelect');
const yearSelect = document.querySelector('#yearSelect');
const cidadeSelect = document.querySelector('#cidade');
const estadoSelect = document.querySelector('#estado');
const cepInput = document.querySelector('#cep');
const unitValues = document.querySelectorAll('.unit-value');
const totalValue = document.querySelector('.total-value');
const dddInput = document.querySelector('#region-code');
const telefoneInput = document.querySelector('#number-phone');

const pagar = document.querySelector('#pagar');

let total = 0;
unitValues.forEach(value => {
    total += parseFloat(value.textContent);
});

totalValue.textContent = total;

// --------------------- Area para testar ------------------------

// Seleciona todos os elementos de lista
const itens = document.querySelectorAll('.items');

// Objeto JSON para armazenar as informações
let jsonValues = {};

jsonValues.Customer = {
    "name": "João Pedro",
    "cpf": "12345678901",
    "birthDate": "1999-01-01"
};

let lista = [];

// Itera sobre os itens e extrai as informações necessárias
itens.forEach(item => {
    let nomeProduto = item.querySelector('.item').textContent.trim(); 
    let qtdeProduto = parseInt(item.querySelector('.qtde').textContent.trim()); 
    let precoProduto = parseFloat(item.querySelector('.unit-value').textContent.trim()); 
    
    // Adiciona um objeto com nome, quantidade e preço à lista
    lista.push({
        "item": nomeProduto,
        "quantidade": qtdeProduto,
        "preco": precoProduto
    });
});

jsonValues.Lista = lista;

console.log(jsonValues);

// ---------------------------------------------------------------

// Função para formatar o CPF
function formatarCPF(value) {
    // Remove todos os caracteres que não são números
    value = value.replace(/\D/g, '');

    // Insere os pontos e o hífen no formato correto
    if (value.length > 3) value = value.slice(0, 3) + '.' + value.slice(3);
    if (value.length > 7) value = value.slice(0, 7) + '.' + value.slice(7);
    if (value.length > 11) value = value.slice(0, 11) + '-' + value.slice(11);
    
    return value;
}

// Evento de input no campo de CPF
cpfInput.addEventListener('input', function() {
    this.value = formatarCPF(this.value);
});

let phoneNumber;

// Formatar telefone
function formatarTelefone(value) {
    value = value.replace(/\D/g, ''); // Remove todos os caracteres que não são números

    phoneNumber = parseInt(value);

    // Aplica a máscara de telefone fixo (8888-8888) ou celular (99999-9999)
    if (value.length <= 8) { // Número fixo
        if (value.length > 4) {
            value = value.slice(0, 4) + '-' + value.slice(4);
        }
    } else { // Número celular
        if (value.length > 5) {
            value = value.slice(0, 5) + '-' + value.slice(5);
        }
    }

    return value;
}

telefoneInput.addEventListener('input', function() {
    this.value = formatarTelefone(this.value);
    console.log(phoneNumber);
});



// Select mês
for(let month = 1; month <= 12; month++){
    const option = document.createElement('option');
    option.value = month;
    if(month < 10){
        option.text = `0${month}`;
    } else {
        option.text = month;
    }
    monthSelect.appendChild(option);
}

// Select ano
for (let year = startYear; year <= endYear; year++) {
    const option = document.createElement('option');
    option.value = year;
    option.text = year;
    yearSelect.appendChild(option);
}



// Função para formatar o CEP
function formatarCEP(value) {
    // Remove todos os caracteres que não são números
    value = value.replace(/\D/g, '');

    // Insere o hífen entre o 5º e o 6º dígito
    if (value.length > 5) {
        value = value.slice(0, 5) + '-' + value.slice(5);
    }
    
    return value;
}

// Evento de input no campo de CEP
cepInput.addEventListener('input', function() {
    this.value = formatarCEP(this.value);
});

// ------------------------------------------------------------
const estadosCidades = {
    "SP": ["São Paulo", "Campinas", "Santos", "Ribeirão Preto"],
    "RJ": ["Rio de Janeiro", "Niterói", "Petrópolis", "Cabo Frio"],
    "MG": ["Belo Horizonte", "Uberlândia", "Ouro Preto", "Contagem"],
    "BA": ["Salvador", "Feira de Santana", "Ilhéus", "Porto Seguro"]
};

function populateEstados() {
    for (const estado in estadosCidades) {
        const option = document.createElement('option');
        option.value = estado;
        option.textContent = estado;
        estadoSelect.appendChild(option);
    }
}

function populateCidades(estado) {
    cidadeSelect.innerHTML = '<option value="" disabled selected>Selecione a cidade</option>'; // Limpa as opções de cidades
    const cidades = estadosCidades[estado];
    cidades.forEach(cidade => {
        const option = document.createElement('option');
        option.value = cidade;
        option.textContent = cidade;
        cidadeSelect.appendChild(option);
    });
    cidadeSelect.disabled = false; 
}

estadoSelect.addEventListener('change', function() {
    const estadoSelecionado = this.value;
    if (estadoSelecionado) {
        populateCidades(estadoSelecionado);
    }
});

populateEstados();
// ------------------------------------------------------------

// Eventos
monthSelect.addEventListener('change', function() {
    const mes = this.value;
});

yearSelect.addEventListener('change', function() {
    const ano = this.value;
});

cardNumber.addEventListener('input', function(e) {
    let input = this.value.replace(/\D/g, ''); // Remove tudo que não for dígito
    input = input.match(/.{1,4}/g)?.join(' ') || input; // Divide em blocos de 4 e adiciona espaços
    this.value = input;

});

// Requisição para método de pagamento
pagar.addEventListener('click', () => {
    // Se as informações estiverem incorretas.

    const cartao = cardNumber.value.replace(/\D/g, '');
    alert(cartao + ", " + typeof(cartao));
    // new bootstrap.Modal("#staticBackdrop").show();
    
});


