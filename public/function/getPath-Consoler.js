const consoler = require('./consoler');

// # Function custom to display when user get path. // * require function consoler()
function getPath_Consoler(req) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    consoler('#008bff', `Server >> : Client >> ${ip} | Get >> ${req.originalUrl}`);
}

module.exports = getPath_Consoler;