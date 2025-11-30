const dns = require('dns');


const pingHost = async (host) => {
return new Promise((resolve) => {
dns.lookup(host, (err) => {
resolve(!err);
});
});
};


module.exports = { pingHost };