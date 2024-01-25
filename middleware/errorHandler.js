module.exports = (err, req, res, next) => {
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({ message: err.errors[0].message });
  }

  res.status(500).json({ message: "500 Internal Server Error", error: err.message })
};
