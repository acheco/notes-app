const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("Connecting to MongoDB...");

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err.message);
  });

const noteSchema = new mongoose.Schema({
  content: { type: String },
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
