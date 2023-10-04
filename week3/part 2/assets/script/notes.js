const notesContainer = document.getElementById("notes-container");
const noteInput = document.getElementById("note-input");

function addNote() {
    const noteText = noteInput.value.trim();
    if (noteText === "") return;

    const note = document.createElement("div");
    note.className = "note";

    const noteContent = document.createElement("p");
    noteContent.textContent = noteText;

    const noteActions = document.createElement("div");
    noteActions.className = "note-actions";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit";
    editButton.addEventListener("click", () => editNote(noteContent, editButton));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    deleteButton.addEventListener("click", () => deleteNote(note));

    noteActions.appendChild(editButton);
    noteActions.appendChild(deleteButton);

    note.appendChild(noteContent);
    note.appendChild(noteActions);

    notesContainer.appendChild(note);

    noteInput.value = "";
}

function editNote(noteContent, editButton) {
    const newText = prompt("Edit your note:", noteContent.textContent);
    if (newText !== null) {
        noteContent.textContent = newText;
    }
}

function deleteNote(note) {
    notesContainer.removeChild(note);
}
