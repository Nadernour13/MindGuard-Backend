const { Sequelize } = require("sequelize");
require("dotenv").config();

const dialect = process.env.DB_DIALECT || "sqlite";

let sequelize;

if (dialect === "mssql") {
  // Azure SQL Database
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mssql",
    dialectOptions: {
      options: { encrypt: true },
    },
    logging: false,
  });
} else {
  // Local dev / testing — zero setup needed
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./mindguard-dev.sqlite",
    logging: false,
  });
}

module.exports = sequelize;
