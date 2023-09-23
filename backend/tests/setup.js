const sequelize = require("../config/connection");

module.exports = async () => {
  await sequelize.sync();
};
