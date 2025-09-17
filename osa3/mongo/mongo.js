const mongoose = require("mongoose");

const db_password = process.argv[2];

const url = `mongodb+srv://danimwai:${db_password}@cluster1.p2owr.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster1`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

/*const note = new Note({
  content: 'HTML is easy',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})*/

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});

