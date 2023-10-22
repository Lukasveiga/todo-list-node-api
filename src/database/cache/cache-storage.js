const client = require("./redis-client");

class CacheStorage {
  static async setData(key, value, options = null) {
    await client.set(key, JSON.stringify(value), options);
  }

  static async getDate(key) {
    const data = await client.get(key);
    return JSON.parse(data);
  }

  static async setStaleStatus(key, value, options = null) {
    await client.set(`${key}:stale`, value, options);
  }

  static async isStale(key) {
    const result = await client.get(`${key}:stale`);
    return !!result;
  }

  static async setRefetchingStatus(key, value, options = null) {
    await client.set(`${key}:refetching`, value, options);
  }

  static async isRefetching(key) {
    const result = await client.get(`${key}:refetching`);
    return !!result;
  }

  static async cleanStaleStatus(key) {
    await client.del(`${key}:stale`);
  }

  static async cleantRefetchingStatus(key) {
    await client.del(`${key}:refetching`);
  }
}

module.exports = CacheStorage;
