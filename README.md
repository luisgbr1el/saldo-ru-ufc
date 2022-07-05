# saldo-ru-ufc
Pacote que checa o saldo do cartão do Restaurante Universitário - UFC.

[![GitHub issues](https://img.shields.io/github/issues/luisgbr1el/saldo-ru-ufc?style=flat-square)](https://github.com/luisgbr1el/saldo-ru-ufc/issues)
[![GitHub forks](https://img.shields.io/github/forks/luisgbr1el/saldo-ru-ufc?style=flat-square)](https://github.com/luisgbr1el/saldo-ru-ufc/network)
[![GitHub stars](https://img.shields.io/github/stars/luisgbr1el/saldo-ru-ufc?style=flat-square)](https://github.com/luisgbr1el/saldo-ru-ufc/stargazers)
[![GitHub license](https://img.shields.io/github/license/luisgbr1el/saldo-ru-ufc?style=flat-square)](https://github.com/luisgbr1el/saldo-ru-ufc)

## Instalação (via NPM)
```git
npm install saldo-ru-ufc
```

## Exemplo de uso

```js
const saldoRU = require('saldo-ru-ufc');

saldoRU.saldo(NUMERO_CARTAO, NUMERO_MATRICULA).then(res => {
  console.log(res);
})
```

## Exemplo de resposta

```JSON
{
  nome: "MARIA EDUARDA SILVA",
  creditos: 13
}
```
