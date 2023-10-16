const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");
const allRoutes = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

// Database Initialization
const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", allRoutes);
app.use((err, req, res, next) => {
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({ message: err.errors[0].message });
  }

  res.status(500).json({ message: "500 Internal Server Error" })
});

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
