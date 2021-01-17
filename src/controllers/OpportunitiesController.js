const BlingService = require('../services/BlingService');
const PipeDriveService = require('../services/PipeDriveService');

const OpportunityRepository = require('../repositories/OpportunityRepository');

module.exports = {
  async index(req, res, next){
    try {
      let opportunities = await OpportunityRepository.getOpportunities();

      return res.status(200).json(opportunities);
    } catch (error) {
      return res.status(401).json({ message: `Error: ${error.message}` });
    }
  },
  
  async create(req, res, next){
    try {
      let dealsWon = await PipeDriveService.getDealsWon();

      let data  = dealsWon.data.data;
      let orders = await BlingService.createOrder(data);

      await OpportunityRepository.createOpportunity(orders);

      return res.status(200).json({ message: 'Oportunidades cadastradas com sucesso' });

    } catch (error) {
      return res.status(401).json({ message: `Error: ${error.message}` });
    }
  }
}