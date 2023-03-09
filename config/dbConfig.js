module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'Oluwafemij01+',
  DB: 'em_tracker_api_db',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
