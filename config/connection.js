const Sequelize = require('sequelize');
const config = require('./config.js');

const env = process.env.NODE_ENV || 'development';
const currentConfig = config[env];

let sequelize;
if (currentConfig.use_env_variable) {
    sequelize = new Sequelize(process.env[currentConfig.use_env_variable], currentConfig);
} else {
    sequelize = new Sequelize(
        currentConfig.database,
        currentConfig.username,
        currentConfig.password,
        currentConfig
    );
}

module.exports = sequelize;
