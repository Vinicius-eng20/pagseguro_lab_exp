// Definindo o intervalo de anos
const startYear = 2024;
const endYear = 2044;

// Elementos

const unitValues = document.querySelectorAll('.unit-value');
const totalValue = document.querySelector('.total-value');
const itens = document.querySelectorAll('.items');

const nameInput = document.querySelector('#name')
const cpfInput = document.querySelector('#cpf');
const emailInput = document.querySelector('#email');
const dddInput = document.querySelector('#region-code');
const telefoneInput = document.querySelector('#number-phone');
const typeNumberInput = document.querySelector('#type-number');
const addressInput = document.querySelector('#address');
const numberAddressInput = document.querySelector("#number-address");
const complementoInput = document.querySelector('#complemento');
const bairroInput = document.querySelector('#bairro');
const estadoSelect = document.querySelector('#estado');
const cidadeSelect = document.querySelector('#cidade');
const cepInput = document.querySelector('#cep');

const paymentMethodBtns = document.querySelectorAll("input[name='paymentMethod']");

const cardNome = document.querySelector('#cardNome');
const cardNumber = document.querySelector('#cardNum');
const monthSelect = document.querySelector('#monthSelect');
const yearSelect = document.querySelector('#yearSelect');
const cvvInput = document.querySelector('#cvv');

const pagar = document.querySelector('#pagar');

let total = 0;

function calcularTotalPedido() {
    // Seleciona todas as linhas da tabela que possuem a classe "items"
    const items = document.querySelectorAll('.items');

    // Itera sobre cada item da tabela
    items.forEach(item => {
        const quantidade = parseInt(item.querySelector('.qtde').innerText);
        const precoUnitario = parseFloat(item.querySelector('.unit-value').innerText.replace(',', '.'));

        // Multiplica a quantidade pelo preço unitário e acumula no total
        total += quantidade * precoUnitario;
    });

    // Formata o valor total para BRL e exibe no elemento com a classe "total-value"
    document.querySelector('.total-value').innerText = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Chama a função para calcular o total quando a página é carregada
document.addEventListener('DOMContentLoaded', calcularTotalPedido);


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
cpfInput.addEventListener('input', function () {
    this.value = formatarCPF(this.value);
});


// Formatar telefone
function formatarTelefone(value) {
    value = value.replace(/\D/g, ''); // Remove todos os caracteres que não são números

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

telefoneInput.addEventListener('input', function () {
    this.value = formatarTelefone(this.value);
});



// Select mês
for (let month = 1; month <= 12; month++) {
    const option = document.createElement('option');
    option.value = month;
    if (month < 10) {
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
cepInput.addEventListener('input', function () {
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

estadoSelect.addEventListener('change', function () {
    const estadoSelecionado = this.value;
    if (estadoSelecionado) {
        populateCidades(estadoSelecionado);
    }
});

populateEstados();
// ------------------------------------------------------------

// Eventos
monthSelect.addEventListener('change', function () {
    const mes = this.value;
});

yearSelect.addEventListener('change', function () {
    const ano = this.value;
});

cardNumber.addEventListener('input', function (e) {
    let input = this.value.replace(/\D/g, ''); // Remove tudo que não for dígito
    input = input.match(/.{1,4}/g)?.join(' ') || input; // Divide em blocos de 4 e adiciona espaços
    this.value = input;

});

let findSelected = () => {
    let selected = document.querySelector("input[name='paymentMethod']:checked").value;
    return selected;
};

paymentMethodBtns.forEach(radioBtn => {
    radioBtn.addEventListener('change', findSelected);
});


