const { createClient } = require("redis");

const client = createClient();

(async () => {
  client.connect();
})();

module.exports = client;
