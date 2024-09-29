// services/cryptoService.js

const axios = require('axios');

exports.getCryptoPrice = async (cryptoId) => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price',
      {
        params: {
          ids: cryptoId,
          vs_currencies: 'usd',
        },
      }
    );
    return response.data[cryptoId].usd;
  } catch (error) {
    console.error('Error fetching crypto price:', error);
    throw error;
  }
};
