const notesContainer = document.querySelector(".notes-container");
const newNote = document.querySelector(".new-note");
let noteEditIndex;
// Note class
class Note {
  constructor() {}
  //Method for adding a note
  new() {
    const noteContainer = document.createElement("div");
    noteContainer.classList.add("note");
    noteContainer.classList.add("note-card");
    noteContainer.innerHTML = `
        <textarea name="textarea" class="textarea"  cols="30" rows="10"></textarea>
                    <i class="fa-solid fa-trash-can bin"></i>
        `;
    notesContainer.insertBefore(noteContainer, newNote);
  }
  //Save note in local storage
  save(note) {
    let notes = [];
    if (localStorage.getItem("notes") === null) {
      notes.push(note);
      localStorage.setItem("notes", JSON.stringify(notes));
    } else {
      notes = JSON.parse(localStorage.getItem("notes"));
      if (notes.find((noteItem, index) => noteEditIndex === index)) {
        notes.splice(noteEditIndex, 1, note);
        localStorage.setItem("notes", JSON.stringify(notes));
      } else {
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
      }
    }
  }
  render() {
    let notes = [];
    if (localStorage.getItem("notes") !== null) {
      notes = JSON.parse(localStorage.getItem("notes"));
      notes.map((note) => {
        const noteContainer = document.createElement("div");
        noteContainer.classList.add("note");
        noteContainer.classList.add("note-card");
        noteContainer.innerHTML = `
        <textarea name="textarea" class="textarea"  cols="30" rows="10">${note}</textarea>
                    <i class="fa-solid fa-trash-can bin"></i>
        `;
        notesContainer.insertBefore(noteContainer, newNote);
      });
    }
  }
  delete(note) {
    const message = window.confirm(
      "Are you sure yo want to delete this message"
    );
    if (message) {
      const noteContainer = note.parentElement;
      noteContainer.remove();
    }
    // remove from local storage
    let notes;
    notes = JSON.parse(localStorage.getItem("notes"));
    const noteIndex = notes.indexOf(note.value);
    notes.splice(noteIndex, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
  }
}

//Event listener to run when all DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  const myNote = new Note();
  myNote.render();
  //  addEventlistener to add new code
  newNote.addEventListener("click", () => {
    myNote.new();
  });
  //addEventlistener to the container
  notesContainer.addEventListener("click", (e) => {
    const notes = JSON.parse(localStorage.getItem("notes"));
    noteEditIndex = notes.indexOf(e.target.value);
    if (e.target.classList.contains("textarea")) {
      e.target.addEventListener("change", (e) => {
        myNote.save(e.target.value);
      });
    }
    if (e.target.classList.contains("bin")) {
      e.target.addEventListener("click", () => {
        myNote.delete(e.target);
      });
    }
  });
});
