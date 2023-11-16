document.addEventListener("DOMContentLoaded", function () {
  const { fromEvent } = rxjs;
  const { map, filter } = rxjs.operators;

  const notesContainer = document.getElementById("notes-container");
  const noteInput = document.getElementById("note-input");
  const colourList = document.getElementById("colour-list");

  class Note {
      constructor(text, color, parent = null) {
          this.text = text;
          this.color = color;
          this.parent = parent;
          this.children = [];
      }
  }

  //Create an observable from the add note button click event
  const addNoteButtonClick$ = fromEvent(document.getElementById("add-note-button"), "click");
  const editButtonClick$ = fromEvent(notesContainer, "click").pipe(
      filter((event) => event.target.classList.contains("Edit"))
  );
  const deleteButtonClick$ = fromEvent(notesContainer, "click").pipe(
      filter((event) => event.target.classList.contains("Delete"))
  );

  //Subscribe to add note button click event
  addNoteButtonClick$.subscribe(() => addNote());

  //Subscribe to edit note button click event
  editButtonClick$.subscribe((event) => {
      const noteContent = event.target.parentElement.parentElement.querySelector("p");
      editNoteContent(noteContent);
  });

  //add a new note
  function addNote() {
      const noteText = noteInput.value.trim();
      if (noteText === "") return;

      const selectColour = colourList.value; 

      const note = new Note(noteText, selectColour);
      const noteElement = createNoteElement(note);

      notesContainer.appendChild(noteElement); 

      noteInput.value = ""; 
  }

  //create a note element
  function createNoteElement(note) {
      const noteElement = document.createElement("div"); 

      noteElement.className = "notes"; 
      noteElement.style.backgroundColor = note.color; // Setting the background color of the note

      //p element to hold the text
      const noteContent = document.createElement("p");
      noteContent.textContent = note.text;

      //Create a div element for note actions to edit and delete
      const noteAction = document.createElement("div");
      noteAction.className = "actions";

      //Create edit button and adding click event listener
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "Edit";

      //Create delete button and adding click event listener
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "Delete";

      //Add event listener for delete button click
      deleteButton.addEventListener("click", () => {
          deleteNoteAndChildren(note);
      });

      //Append the edit and delete buttons to the note actions
      noteAction.appendChild(editButton);
      noteAction.appendChild(deleteButton);

      //Append the note text and note actions to the note element
      noteElement.appendChild(noteContent);
      noteElement.appendChild(noteAction);

      return noteElement;
  }

  //edit note's content
  function editNoteContent(noteContent) {
      const newText = prompt("Edit note:", noteContent.textContent); // Prompting the user to edit the note
      if (newText !== null) {
          noteContent.textContent = newText;
      }
  }

//delete note and its children
function deleteNoteAndChildren(note) {
  if (note.parent) {
      const index = note.parent.children.indexOf(note);
      if (index !== -1) {
          note.parent.children.splice(index, 1);
      }
  }

  // Recursively delete all children
  const noteElement = notesContainer.querySelector(".notes"); 
  notesContainer.removeChild(noteElement);
  note.children.forEach((child) => deleteNoteAndChildren(child));
}});
