const Sequelize = require('sequelize');
const config = require('./config.js');

// Select the correct configuration based on the current environment
const env = process.env.NODE_ENV || 'development';
const currentConfig = config[env];

let sequelize;
if (currentConfig.use_env_variable) {
    // For production: use the DATABASE_URL environment variable
    sequelize = new Sequelize(process.env[currentConfig.use_env_variable], currentConfig);
} else {
    // For development and test: use individual parameters
    sequelize = new Sequelize(
        currentConfig.database,
        currentConfig.username,
        currentConfig.password,
        currentConfig
    );
}

module.exports = sequelize;
