const mongoose = require("mongoose");
const config = require("../utils/config");

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: { type: Boolean },
});

// Cambiamos el metodo toJSON del schema para que no retorne los campos _id y _v de mongoDB
noteSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    // Convertimos el objeto en un string y lo asignamos al campo id
    returnedObject.id = returnedObject._id.toString();
    // Eliminamos los objetos _id y _v del schema
    delete returnedObject._id;
    delete returnedObject._v;
  },
});

// Exportamos el modelo para poder utilizarlo en la API
module.exports = mongoose.model("Note", noteSchema);
