const { Pool } = require('pg');

module.exports = new Pool({
  host: 'localhost',
  database: 'gymcontrol',
  port: '5432',
  user: '',
  password: '',
});
