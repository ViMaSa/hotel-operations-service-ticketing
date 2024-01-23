require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");
const allRoutes = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");
const Airbrake = require('@airbrake/node');
const airbrakeExpress = require('@airbrake/node/dist/instrumentation/express');

const airbrake = new Airbrake.Notifier({
  projectId: 544306,
  projectKey: '4169bb2614497f7e43aaed6aa54c3233',
});

const app = express();
const PORT = process.env.PORT || 3000;

// Database Initialization
let sequelize;
if (process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
} else {
    sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_DEV, // Assuming you're using a separate dev database
    });
}

// Middleware
app.use(airbrakeExpress.makeMiddleware(airbrake));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", allRoutes);
app.use(errorHandler);
app.use(airbrakeExpress.makeErrorHandler(airbrake));

if(process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

if (require.main === module) {
  // Test database connection
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
