var pagseguro = require('pagseguro');

var pag = new pagseguro({
    email : 'lucas-fbr@hotmail.com',
    token: '330371A616A64B39AE30BBB0AE3E5D95',
    mode : 'sandbox'
});

//Configurando a moeda e a referência do pedido
pag.currency('BRL');
pag.reference('12345');


//Configuranto URLs de retorno e de notificação (Opcional)
//ver https://pagseguro.uol.com.br/v2/guia-de-integracao/finalizacao-do-pagamento.html#v2-item-redirecionando-o-comprador-para-uma-url-dinamica
pag.setRedirectURL("http://www.lojamodelo.com.br/retorno");
pag.setNotificationURL("http://www.lojamodelo.com.br/notificacao");


//exportar a configuração do pagseguro
module.exports.pagCart = pag;