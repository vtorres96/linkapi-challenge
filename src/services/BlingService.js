const jsonxml = require('jsontoxml');
const { generate } = require('gerador-validador-cpf');

const { apiBling, blingApiKey } = require('../config/api');

module.exports = {
  async createOrder(deals) {
    let orders = deals.map(async (deal) => {

      let xmlObject = jsonxml(
        {
          pedido: [
            {
              cliente: [
                { name: 'nome', text: 'vtorres96' },
                { name: 'cpf_cnpj', text: generate() },
                { name: 'ie', text: '110.042.490.114' },
                { name: 'endereco', text: 'Rua Cachoeira Alegre' },
                { name: 'numero', text: '411' },
                { name: 'bairro', text: 'Jardim Santa Cruz' },
                { name: 'cep', text: '02672-030' },
                { name: 'cidade', text: 'Sao Paulo' },
                { name: 'uf', text: 'SP' },
              ],
            },
            {
              volumes: [
                {
                  volume: [
                    { name: 'servico', text: 'Sedex' }
                  ],
                },
              ],
            },
            {
              itens: [
                {
                  item: [
                    { name: 'codigo', text: 1 },
                    { name: 'descricao', text: 'deal' },
                    { name: 'qtde', text: 1 },
                    { name: 'vlr_unit', text: deal.value || 0 },
                  ],
                },
              ],
            },
            {
              parcelas: [
                {
                  parcela: [
                    { name: 'vlr', text: deal.value || 0 }
                  ],
                },
              ],
            },
          ],
        },
        false
      );

      let orderBling = await apiBling.post(
        `/pedido/json/&apikey=${blingApiKey}&xml=${xmlObject}`
      );

      let order = { 
        ...orderBling.data.retorno.pedidos[0].pedido, 
        value: deal.value, 
        orgName: deal.org_name 
      };

      return order;
    });

    let OrdersCreated = Promise.all(orders).then((resultOrderPromise) => {
      return resultOrderPromise;
    });

    return OrdersCreated;
  },
};
