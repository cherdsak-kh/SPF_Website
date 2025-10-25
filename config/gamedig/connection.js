const { GameDig } = require('gamedig');

const a3ServerInfo = async (callback) => {
    try {
        const state = await GameDig.query({
            type: 'arma3',
            host: process.env.HOST,
            port: process.env.A3PORT,
        });
        return callback(null, state);
    } catch (error) {
        return callback(error, null);
    }
};

module.exports = { a3ServerInfo };