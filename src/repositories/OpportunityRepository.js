const Opportunity = require('../models/Opportunity');

module.exports = {
  async createOpportunity(opportunities) {''
    let opportunitiesList = await opportunities.map(
      ({ numero, idPedido, value, orgName }) => {
        let opportunity = Opportunity.create({
          number: numero,
          orderId: idPedido,
          value: value,
          orgName: orgName,
        });

        return opportunity;
      }
    );

    return opportunitiesList;
  },

  async getOpportunities() {
    let opportunities = await Opportunity.aggregate([
      {
        $sort: {
          value: -1,
          number: 1,
        },
      },
      {
        $project: {
          number: '$number',
          orderId: '$orderId',
          value: '$value',
          orgName: '$orgName',
          date: { $dateToString: { format: '%d/%m/%Y', date: '$createdAt' } },
        },
      },
      {
        $group: {
          _id: '$date',
          opportunities: {
            $push: '$$ROOT',
          },
          total: { $sum: "$value" },
        },
      },
    ]);

    return opportunities;
  },

  async getOpportunitiesByOrderId() {
    const opportunities = await Opportunity.aggregate([
      {
        $sort: {
          value: -1,
          numero: 1,
        },
      },
      {
        $project: {
          numero: '$numero',
          idPedido: '$idPedido',
          value: '$value',
          orgName: '$orgName',
          date: { $dateToString: { format: '%d/%m/%Y', date: '$createdAt' } },
        },
      },
      {
        $group: {
          _id: '$orgName',
          opportunities: {
            $push: '$$ROOT',
          },
        },
      },
    ]);
    return opportunities;
  },

};
