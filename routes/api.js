var express = require('express');
var router = express.Router();
var xml2js = require('xml2js');
var json;

var pag = require('../config/pagseguroConfig');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('api');
});

router.post('/checkOut', function(req, res) {

  console.log('chegou na rota')


  //Configurando as informações do comprador
  pag.pagCart.buyer({
    name: 'Emerson jose',
    email: 'comprador@uol.com.br',
    phoneAreaCode: '51',
    phoneNumber: '12345678'
  });

  //Configurando a entrega do pedido
  pag.pagCart.shipping({
    type: 1,
    street: 'Rua Alameda dos Anjos',
    number: '367',
    complement: 'Apto 307',
    district: 'Parque da Lagoa',
    postalCode: '01452002',
    city: 'São Paulo',
    state: 'RS',
    country: 'BRA'
  });

  //Adicionar os produtos no carrinho do pagseguro
  req.body.forEach(function (item, i) {
    pag.pagCart.addItem({
      id: item.id,
      description: item.name,
      amount: parseFloat(item.price).toFixed(2),
      quantity: 1,
      weight: 10.00
    });
  });

  //Enviando o xml ao pagseguro
  pag.pagCart.send(function (err, body) {
    if (err) {
      console.log(err);
    }


    //instanciando o xnl2js
    var parser = new xml2js.Parser();

    //fazendo o parse dos dados em xml para json
    parser.parseString(body.substring(0, body.length), function (err, result) {
        //json = JSON.stringify(result);
        json = result.checkout.code[0];
        //console.log(JSON.stringify(result));
        console.log(json)
    });

    res.send({url : 'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=' + json});


  });

  //res.send({sucesso: true});



});

module.exports = router;
