document.addEventListener("DOMContentLoaded", function () {
    const { fromEvent } = rxjs;
    const { map, filter } = rxjs.operators;
  
    //Get references to the HTML elements by their IDs
    const notesContainer = document.getElementById("notes-container");
    const noteInput = document.getElementById("note-input");
    const colourList = document.getElementById("colour-list");
  
    //Create observables for DOM elements and events
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
  
    // Subscribe to delete note button click event
    deleteButtonClick$.subscribe((event) => {
      const note = event.target.parentElement.parentElement;
      deleteNote(note);
    });
  
    // Function to add a new note
    function addNote() {
      const noteText = noteInput.value.trim(); 
      if (noteText === "") return;
  
      const selectColour = colourList.value; 
  
      const note = createNoteElement(noteText, selectColour); 
  
      notesContainer.appendChild(note); //Append the new note to the notes container
  
      noteInput.value = ""; //clearing the input field
    }
  
    //create a note element
    function createNoteElement(noteText, selectColour) {
      const note = document.createElement("div"); 
  
      note.className = "notes"; 
  
      // Background color
      note.style.backgroundColor = selectColour;
  
      //p element hold the text
      const noteContent = document.createElement("p");
      noteContent.textContent = noteText;
  
      //create a div element for note actions to edit and delete
      const noteAction = document.createElement("div");
      noteAction.className = "actions";
  
      //create edit button and add click event listener
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "Edit";
  
      //create delete button and add click event listener
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "Delete";
  
      noteAction.appendChild(editButton);
      noteAction.appendChild(deleteButton);

      note.appendChild(noteContent);
      note.appendChild(noteAction);
  
      return note;
    }
  
    //edit note's content
    function editNoteContent(noteContent) {
      const newText = prompt("Edit note:", noteContent.textContent); 
      if (newText !== null) {
        noteContent.textContent = newText;
      }
    }
  
    //delete note
    function deleteNote(note) {
      notesContainer.removeChild(note);
    }
  });
  