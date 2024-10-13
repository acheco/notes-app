const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

// Middlewares generales
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Middleware que sirve el directorio principal del frontend del proyecto.
app.use(express.static("dist"));

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

let notes = [
  { id: 1, content: "HTML is easy", important: true },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

//  GET all notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// GET a single note
app.get("/api/notes/:id", (req, res) => {
  // Capturamos el parámetro id de la variable req y lo almacenamos en la variable id
  const id = Number(req.params.id);

  // Revisamos si existe una nota con el ID indicado
  const note = notes.find((note) => note.id === id);
  // Si la nota existe la retornamos, en caso contrario, retornamos el status 404 "Not Found" con un mensaje personalizado
  if (note) {
    res.json(note);
  } else {
    res.status(404).end(`No such note with id ${id} not found`);
  }
});

// POST a new note
app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    res.status(400).json({
      error: "Content missing",
    });
  }

  const note = {
    id: uuidv4(),
    content: body.content,
    important: body.important || false,
  };

  notes = notes.concat(note);

  res.json(notes);
});

// DELETE a note
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

// Middleware para saber cuando un endpoint no existe
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint " });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
