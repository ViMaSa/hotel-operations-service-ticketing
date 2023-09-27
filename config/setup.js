const sequelize = require("./connection");
const { Ticket } = require("../models/ticket");

module.exports = async () => {
  // Connect to the database if not already
  if(!sequelize.authenticate()){
    await sequelize.authenticate();
  }

  // Drop all tables to start fresh
  await sequelize.drop();

  // Resync tables
  await sequelize.sync();
};
