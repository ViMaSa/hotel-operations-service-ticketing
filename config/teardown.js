const sequelize = require("./connection");

module.exports = async () => {
  await sequelize.drop();
  await sequelize.close();
};
