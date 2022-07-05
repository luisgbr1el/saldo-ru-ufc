const saldoRU = require('./index');

saldoRU.saldo(NUMERO_CARTAO, NUMERO_MATRICULA).then(res => {
  console.log(res);
})