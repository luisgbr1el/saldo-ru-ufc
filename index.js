const request = require("request"),
      cheerio = require("cheerio");

exports.saldo = function (cardNumber, matricula, offset) {
  return new Promise(function (resolve, reject) {
    const optionsTopGames = {
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

    request(optionsTopGames, function (error, response) {
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

      const nome = name[1],
        creditos = parseInt(credits[1]);

      if (nome === undefined) {
        const err =
          "Erro! Não foi possível encontrar nenhum usuário associado à essas credenciais.";

        resolve(err);
      } else {
        resp = {
          nome,
          creditos,
        };

        resolve(resp);
      }
    });
  });
};