const { apiPipeDrive, pipeDriveApiToken } = require('../config/api');

module.exports = {
  async getDealsWon() {
    let dealsWon = await apiPipeDrive.get(
      `/deals?status=won&start=0&api_token=${pipeDriveApiToken}`
    );

    return dealsWon;
  },
};
