const { Sequelize, DataTypes } = require("sequelize");
//Connect to dataBase
const db = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "Chamanquin12",
  port: 5432,
  database: "users and tasks",
  logging: false,
});

module.exports = { db, DataTypes };
