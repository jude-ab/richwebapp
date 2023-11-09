document.addEventListener("DOMContentLoaded", function () {
  const { fromEvent } = rxjs;
  const { map, filter } = rxjs.operators;

  // Getting references to the HTML elements by their IDs
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

  // Create observables for DOM elements and events
  const addNoteButtonClick$ = fromEvent(document.getElementById("add-note-button"), "click");
  const editButtonClick$ = fromEvent(notesContainer, "click").pipe(
      filter((event) => event.target.classList.contains("Edit"))
  );
  const deleteButtonClick$ = fromEvent(notesContainer, "click").pipe(
      filter((event) => event.target.classList.contains("Delete"))
  );

  // Subscribe to add note button click event
  addNoteButtonClick$.subscribe(() => addNote());

  // Subscribe to edit note button click event
  editButtonClick$.subscribe((event) => {
      const noteContent = event.target.parentElement.parentElement.querySelector("p");
      editNoteContent(noteContent);
  });

  // Function to add a new note
  function addNote() {
      const noteText = noteInput.value.trim(); // Get the trimmed text from the note input field
      if (noteText === "") return; // If the input is empty, do nothing

      const selectColour = colourList.value; // Get the selected color

      const note = new Note(noteText, selectColour);
      const noteElement = createNoteElement(note);

      notesContainer.appendChild(noteElement); // Append the new note to the notes container

      noteInput.value = ""; // Clearing the input field
  }

  // Function to create a note element
  function createNoteElement(note) {
      const noteElement = document.createElement("div"); // Creating a new div element for the note

      noteElement.className = "notes"; // Setting the note class CSS
      noteElement.style.backgroundColor = note.color; // Setting the background color of the note

      // Creating p element to hold the text
      const noteContent = document.createElement("p");
      noteContent.textContent = note.text;

      // Creating a div element for note actions to edit and delete
      const noteAction = document.createElement("div");
      noteAction.className = "actions";

      // Creating edit button and adding click event listener
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "Edit";

      // Creating delete button and adding click event listener
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "Delete";

      // Add event listener for delete button click
      deleteButton.addEventListener("click", () => {
          deleteNoteAndChildren(note);
      });

      // Appending the edit and delete buttons to the note actions
      noteAction.appendChild(editButton);
      noteAction.appendChild(deleteButton);

      // Appending the note text and note actions to the note element
      noteElement.appendChild(noteContent);
      noteElement.appendChild(noteAction);

      return noteElement;
  }

  // Function to edit note's content
  function editNoteContent(noteContent) {
      const newText = prompt("Edit note:", noteContent.textContent); // Prompting the user to edit the note
      if (newText !== null) {
          noteContent.textContent = newText;
      }
  }

// Function to delete note and its children
function deleteNoteAndChildren(note) {
  if (note.parent) {
      const index = note.parent.children.indexOf(note);
      if (index !== -1) {
          note.parent.children.splice(index, 1);
      }
  }

  const noteElement = notesContainer.querySelector(".notes"); // Find the note element in the DOM
  notesContainer.removeChild(noteElement);
  note.children.forEach((child) => deleteNoteAndChildren(child));
}});
