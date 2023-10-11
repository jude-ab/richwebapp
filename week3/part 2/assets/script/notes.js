//Getting references to the HTML elementsb by their IDs
const notesContainer = document.getElementById("notes-container");
const noteInput = document.getElementById("note-input");
const colourList = document.getElementById("colour-list");

//function to add a new note
function addNote() {
    const noteText = noteInput.value.trim(); // Get the trimmed text from the note input field
    if (noteText === "") return; // If the input is empty, do nothing

    const selectColour = colourList.value; // Get the selected color

    const note = createNoteElement(noteText, selectColour); //create a new note element with the provided text and color

    notesContainer.appendChild(note); //append the new note to the notes container

    noteInput.value = ""; //clearing the input field
}

function createNoteElement(noteText, selectColour) {
    const note = document.createElement("div"); //creating a new div element for the note

    note.className = "notes"; //setting the note class css

    //background color 
    note.style.backgroundColor = selectColour; //setting background color of the note

    //creating p element to hold the text
    const noteContent = document.createElement("p"); 
    noteContent.textContent = noteText;

    //creating a div element for note actions to edit and delete 
    const noteAction = document.createElement("div");
    noteAction.className = "actions";

    //creating edit button and adding click event listener
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "Edit";
    editButton.addEventListener("click", () => editNoteContent(noteContent));

    //creating delete button and adding click event listener
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "Delete";
    deleteButton.addEventListener("click", () => deleteNote(note));

    //appending the edit and delete buttons to the note actions
    noteAction.appendChild(editButton);
    noteAction.appendChild(deleteButton);

    //appending the note text and note actions to the note element
    note.appendChild(noteContent);
    note.appendChild(noteAction);

    return note;
}

//function to edit note's content
function editNoteContent(noteContent) {
    const newText = prompt("Edit note:", noteContent.textContent); //prompting the user to edit the note
    if (newText !== null) {
        noteContent.textContent = newText;
    }
}

//function to delete note
function deleteNote(note) {
    notesContainer.removeChild(note);
}
