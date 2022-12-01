const redis = require('redis');
const { promisifyAll } = require('bluebird');

promisifyAll(redis);

const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

export default client;
