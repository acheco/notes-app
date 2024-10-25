const notesRouter = require("express").Router();
const Note = require("../models/note");
const logger = require("../utils/logger");

//  GET all notes
notesRouter.get("/", (req, res) => {
  Note.find({}, null, null).then((result) => {
    res.json(result);
  });
});

// GET a single note
notesRouter.get("/:id", (req, res, next) => {
  Note.findById(req.params.id, null, null)
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
notesRouter.post("/", (req, res, next) => {
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
  note
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});

// DELETE a note
notesRouter.delete("/:id", (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

notesRouter.put("/:id", (req, res, next) => {
  const { content, important } = req.body;

  Note.findByIdAndUpdate(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" },
  )
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
