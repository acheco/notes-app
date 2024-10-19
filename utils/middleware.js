const logger = require("./logger");
const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method.toUpperCase());
  logger.info("Path:", req.path);
  logger.info("Body:", req.body);
  logger.info("---");
  next();
};

// Middleware para saber cuando un endpoint no existe
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint " });
};

// Middleware para el manejo de errores
const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformed id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
