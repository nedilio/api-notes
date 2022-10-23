// const http = require('http')
const express = require("express");
const app = express();
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "Using settings sync service",
    date: "2022-10-19T16:25:38.102Z",
    important: false,
  },
  {
    id: 2,
    content: "Request failed",
    date: "2022-10-20T15:31:38.102Z",
    important: true,
  },
  {
    id: 3,
    content: "Settings: Not synced yet. Last sync",
    date: "2022-10-21T00:10:38.102Z",
    important: false,
  },
];

app.get("/", (request, response) => {
  console.log(request);
  response.send("<h1>Hello world! 🌎</h1>");
});
app.get("/api/notes", (request, response) => {
  response.json(notes);
});
app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response
      .status(404)
      .send(
        "<img src='https://http.cat/404' style='width: 90%; margin: 0 auto' >"
      );
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id != id);
  console.log(notes);
  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const note = request.body;

  if (!note || !note.content) {
    return response
      .status(400)
      .send(
        "<img src='https://http.cat/400' style='width: 90%; margin: 0 auto' >"
      );
  }
  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important != undefined ? note.important : false,
    date: new Date().toISOString(),
  };

  notes = [...notes, newNote];

  response.status(201).json(newNote);
});

app.use((request, response) => {
  console.log("first");
  response
    .status(404)
    .send(
      "<img src='https://http.cat/404' style='width: 90%; margin: 0 auto' >"
    );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🎶`);
});
