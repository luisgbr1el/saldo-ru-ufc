const request = require("request"),
      cheerio = require("cheerio");

exports.saldo = function (cardNumber, matricula, offset) {
  return new Promise(function (resolve, reject) {
    const options = {
      method: "POST",
      url:
        "https://si3.ufc.br/public/restauranteConsultarSaldo.do?codigoCartao=" +
        cardNumber +
        "&matriculaAtreladaCartao=" +
        matricula,
      headers: {
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36",
      },
    };

    request(options, function (error, response) {
      if (error) throw new Error(error);
      const res = response.body;
      
      var $ = cheerio.load(res, {
        xml: {
          normalizeWhitespace: true,
          decodeEntities: true,
          withStartIndices: false,
          withEndIndices: false,
        },
      });

      var name = [];
      $(".linhaPar td").each(function (index, element) {
        name.push($(element).text());
      });

      var credits = [];
      $(".linhaImpar td").each(function (index, element) {
        credits.push($(element).text());
      });


      lastOperationDate = $("table.listagem tbody").last().children("tr").children("td").first().text();
      lastOperationDate = lastOperationDate.replace(/-/g, "/");

      lastOperationType = $("table.listagem tbody").last().children("tr").children("td:nth-child(2)").first().text();
      lastOperationType = lastOperationType
        .replace(/\t|\n/g, "")
        .replace("Utiliza��o", "Utilização")
        .replace("Cart�o", "Cartão").replace("Cr�ditos", "Créditos")

      lastOperationDetails = $("table.listagem tbody").last().children("tr").children("td:nth-child(3)").first().text();
      lastOperationDetails = lastOperationDetails
        .replace(/\t|\n/g, "")
        .replace("Cr�ditos", "Créditos")
        .replace("Refei��o", "Refeição")
        .replace("Almo�o", "Almoço")

      if (lastOperationDetails.includes("Qtd. Antes"))
        lastOperationDetails = lastOperationDetails.replace("Qtd. Antes", "\nQtd. Antes")
      
      const nome = name[1],
        creditos = parseInt(credits[1]),
        dataUltimaOperacao = lastOperationDate,
        tipoUltimaOperacao = lastOperationType,
        detalhesUltimaOperacao = lastOperationDetails;

      if (nome === undefined) {
        const err =
          "Erro! Não foi possível encontrar nenhum usuário associado à essas credenciais.";

        resolve(err);
      } else {
        resp = {
          nome,
          creditos,
          ultimaOperacao: {
            data: dataUltimaOperacao,
            tipo: tipoUltimaOperacao,
            detalhes: detalhesUltimaOperacao
          }    
        };

        resolve(resp);
      }
    });
  });
};