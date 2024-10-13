const mongoose = require("mongoose");

// valída que la ejecución de la app desde la terminal tenga al menos 3 argumentos (node mongo.js <password>)
if (process.argv.length < 3) {
  console.log("Give password and argument");
  process.exit(1);
}
// Nos aseguramos que el password sea el tercer argumento (0,1,2)
const password = process.argv[2];
const databaseName = "noteApp";

// indicamos el query string de conexión a la base de datos
const url = `mongodb+srv://admin:${password}@cluster0.489ei.mongodb.net/${databaseName}?
retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

/*
Primero definimos el esquema de una nota que se almacena en la variable noteSchema. El esquema le dice a Mongoose
cómo se almacenarán los objetos de nota en la base de datos.
 */
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

/*
En la definición del modelo Note, el primer parámetro de "Note" es el nombre singular del modelo. El nombre de la
colección será el plural notes en minúsculas, porque la convención de Mongoose es nombrar automáticamente las
colecciones como el plural (por ejemplo, notes) cuando el esquema se refiere a ellas en singular (por ejemplo, Note).
 */
const Note = mongoose.model("Note", noteSchema);

// Creamos un objeto de nota al crear una instancia del Note y le pasamos una nota para guardarla en la base de datos.
// Los modelos son funciones constructoras que podemos utilizar para crear objetos

const note = new Note({
  content: "Mongoose make things easy",
  important: true,
});

// Con el metodo find podemos retornar las notas que cumplan con el filtro indicado(si se utiliza algún filtro)
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});

// ¡Guardamos la nota en la base de datos e imprimimos un mensaje en consola, por último cerramos la conexión.
// note.save().then((result) => {
//   console.log("note Saved!");
//   mongoose.connection.close();
// });
