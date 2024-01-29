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
const databaseUrl = process.env.DATABASE_URL;

console.log(databaseUrl)
console.log(process.env.NODE_ENV)

// Database Initialization
let sequelize;
if (process.env.NODE_ENV === 'production') {
    console.log('connecting production db')
    sequelize = new Sequelize(databaseUrl, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });

    console.log(sequelize);
} else {
    sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_DEV, // Assuming you're using a separate dev database
    });
}

const allowedOrigins = ['https://host-app-a4552180b0e3.herokuapp.com', 'http://localhost:8080'];

// Middleware
app.use(airbrakeExpress.makeMiddleware(airbrake));
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));
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
