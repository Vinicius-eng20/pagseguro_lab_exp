// Definindo o intervalo de anos
const startYear = 2024;
const endYear = 2044;

// Elementos
const cardNumber = document.querySelector('#cardNum');

const monthSelect = document.querySelector('#monthSelect')
const yearSelect = document.querySelector('#yearSelect');

const pagar = document.querySelector('#pagar');

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

// Eventos
monthSelect.addEventListener('change', function() {
    const mes = this.value;
});

yearSelect.addEventListener('change', function() {
    const ano = this.value;
});

// let input = '';

cardNumber.addEventListener('input', function(e) {
    let input = this.value.replace(/\D/g, ''); // Remove tudo que não for dígito
    input = input.match(/.{1,4}/g)?.join(' ') || input; // Divide em blocos de 4 e adiciona espaços
    this.value = input;

});

// Requisição para método de pagamento
pagar.addEventListener('click', () => {
    // Se as informações estiverem incorretas.

    const cartao = cardNumber.value.replace(/\D/g, '');
    alert(cartao);
    // new bootstrap.Modal("#staticBackdrop").show();
    
});


