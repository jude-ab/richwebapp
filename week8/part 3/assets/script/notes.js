document.addEventListener("DOMContentLoaded", function () {
    const { fromEvent } = rxjs;
    const { map, filter } = rxjs.operators;

    const notesContainer = document.getElementById("notes-container");
    const input = document.getElementById("note-input");
    const colour_list = document.getElementById("colour-list");

    const notes = []; // Store notes in an array

    class Note extends HTMLElement {
        constructor(text, color, parent = null) {
            super(); //always call super first in constructor
            this.text = text;
            this.color = color;
            this.parent = parent; // Store parent note
            this.child_notes = []; // Store child notes in an array
            this.attachShadow({ mode: "open" }); // Attach a shadow root to the element. 
            this.render();// Render the element’s template
        }

        //render the element’s template in its shadow root using DOM methods.
        render() {
            this.shadowRoot.innerHTML = `
                <div class="notes" style="background-color: ${this.color}">
                    <p>${this.text}</p>
                    <div class="actions">
                        <button class="Edit">Edit</button>
                        <button class="Delete">Delete</button>
                    </div>
                </div>
            `;

            //references to the edit and delete buttons in the shadow DOM
            const edit_button = this.shadowRoot.querySelector(".Edit"); 
            const delete_button = this.shadowRoot.querySelector(".Delete");

            //event listeners to the edit and delete buttons
            edit_button.addEventListener("click", () => this.edit_content());
            delete_button.addEventListener("click", () => this.delete_note_and_children());
        }

        edit_content() {
            const new_content = prompt("Edit note here", this.text);
            if (new_content !== null) {
                this.text = new_content;
                this.render();
            }
        }

        //delete the note and all its children
        delete_note_and_children() {
            if (this.parent) {
                const index = this.parent.child_notes.indexOf(this);
                if (index !== -1) {
                    this.parent.child_notes.splice(index, 1);
                }
            }

            // Remove the note from the DOM tree 
            const container = this.parentElement;
            if (container) {
                container.removeChild(this);
            }

            // Recursively delete all children
            this.child_notes.forEach((child) => child.delete_note_and_children());
        }
    }

    customElements.define("create-note", Note);

    //observable from the add note button click event
    const addNoteButtonClick$ = fromEvent(document.getElementById("add-note-button"), "click");
    const edit_buttonClick$ = fromEvent(notesContainer, "click").pipe(
        filter((event) => event.target.classList.contains("Edit"))
    );
    const delete_buttonClick$ = fromEvent(notesContainer, "click").pipe(
        filter((event) => event.target.classList.contains("Delete"))
    );

    // Subscribe
    // Subscribe to add note button click event
    addNoteButtonClick$.subscribe(() => addNote());

    // Subscribe
    // Subscribe to edit note button click event
    edit_buttonClick$.subscribe((event) => {
        const noteContent = event.target.parentElement.parentElement.querySelector("p");
        edit_content(noteContent);
    });

    //new note
    function addNote() {
        const note_content = input.value.trim();
        if (note_content === "") return;

        const select_colour = colour_list.value;

        const note = new Note(note_content, select_colour);
        notes.push(note); // Add the note to the array
        notesContainer.appendChild(note);

        input.value = "";
    }

});
