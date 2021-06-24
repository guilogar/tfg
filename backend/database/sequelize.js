const { Sequelize } = require('sequelize');

let dialectOptions = {};
if(process.env.ENVIRONMENT === 'production')
{
  dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    dialectOptions: dialectOptions,
    logging: (process.env.ENVIRONMENT === 'production'),
  }
);

module.exports = sequelize;
