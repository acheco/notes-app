const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const Note = require("./models/note");

// Middleware que sirve el directorio principal del frontend del proyecto.
app.use(express.static("dist"));
// Middlewares generales
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para poder servir datos a un frontend fuera del servidor
app.use(cors());

// Middleware para seguir el logger de la app:
const requestLogger = (req, res, next) => {
  console.log("Method:", req.method.toUpperCase());
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  console.log("---");
  next();
};

app.use(requestLogger);

//  GET all notes
app.get("/api/notes", (req, res) => {
  Note.find({}).then((result) => {
    res.json(result);
  });
});

// GET a single note
app.get("/api/notes/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// POST a new note
app.post("/api/notes", (req, res) => {
  const body = req.body;

  // Validamos que el body no esté vacío
  if (body.content === "" || body.content === undefined) {
    res.status(400).json({
      error: "Content missing",
    });
  }

  // Creamos un objeto tipo Note (modelo de Mongoose) y creamos la nota
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  // Guardamos la nota y retornamos el resultado en formato JSON
  note.save().then((result) => {
    res.json(result);
  });
});

// DELETE a note
app.delete("/api/notes/:id", (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/notes/:id", (req, res, next) => {
  const body = req.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});

// Middleware para saber cuando un endpoint no existe
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint " });
};

app.use(unknownEndpoint);

// Middleware para el manejo de errores
const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformed id" });
  }

  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
