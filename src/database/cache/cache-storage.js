const client = require("./redis-client");

class CacheStorage {
  async setData(key, value, options = null) {
    await client.set(key, JSON.stringify(value), options);
  }

  async getDate(key) {
    const data = await client.get(key);
    return JSON.parse(data);
  }

  async setStaleStatus(key, value, options = null) {
    await client.set(`${key}:stale`, value, options);
  }

  async isStale(key) {
    const result = await client.get(`${key}:stale`);
    return !!result;
  }

  async setRefetchingStatus(key, value, options = null) {
    await client.set(`${key}:refetching`, value, options);
  }

  async isRefetching(key) {
    const result = await client.get(`${key}:refetching`);
    return !!result;
  }

  async cleanStaleStatus(key) {
    await client.del(`${key}:stale`);
  }

  async cleantRefetchingStatus(key) {
    await client.del(`${key}:refetching`);
  }
}

module.exports = CacheStorage;
