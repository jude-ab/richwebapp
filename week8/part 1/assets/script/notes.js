document.addEventListener("DOMContentLoaded", function () {
    const { fromEvent } = rxjs;
    const { map, filter } = rxjs.operators;
  
    // Getting references to the HTML elements by their IDs
    const notesContainer = document.getElementById("notes-container");
    const noteInput = document.getElementById("note-input");
    const colourList = document.getElementById("colour-list");
  
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
  
    // Subscribe to delete note button click event
    deleteButtonClick$.subscribe((event) => {
      const note = event.target.parentElement.parentElement;
      deleteNote(note);
    });
  
    // Function to add a new note
    function addNote() {
      const noteText = noteInput.value.trim(); // Get the trimmed text from the note input field
      if (noteText === "") return; // If the input is empty, do nothing
  
      const selectColour = colourList.value; // Get the selected color
  
      const note = createNoteElement(noteText, selectColour); // Create a new note element with the provided text and color
  
      notesContainer.appendChild(note); // Append the new note to the notes container
  
      noteInput.value = ""; // Clearing the input field
    }
  
    // Function to create a note element
    function createNoteElement(noteText, selectColour) {
      const note = document.createElement("div"); // Creating a new div element for the note
  
      note.className = "notes"; // Setting the note class CSS
  
      // Background color
      note.style.backgroundColor = selectColour; // Setting the background color of the note
  
      // Creating p element to hold the text
      const noteContent = document.createElement("p");
      noteContent.textContent = noteText;
  
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
  
      // Appending the edit and delete buttons to the note actions
      noteAction.appendChild(editButton);
      noteAction.appendChild(deleteButton);
  
      // Appending the note text and note actions to the note element
      note.appendChild(noteContent);
      note.appendChild(noteAction);
  
      return note;
    }
  
    // Function to edit note's content
    function editNoteContent(noteContent) {
      const newText = prompt("Edit note:", noteContent.textContent); // Prompting the user to edit the note
      if (newText !== null) {
        noteContent.textContent = newText;
      }
    }
  
    // Function to delete note
    function deleteNote(note) {
      notesContainer.removeChild(note);
    }
  });
  