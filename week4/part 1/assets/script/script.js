displayContacts();
// preventing default server side behaviour
const form = document.querySelector('form');
let  change_order = true;
form.onsubmit = (e) => {

    e.preventDefault();
}

// FUNCTION: to validate user inputs
function formValidation() {

    let errorDiv =  document.getElementById('error');
    let contactName = document.forms['contactForm']['contact_name'].value;
    let mobileNumber = document.forms['contactForm']['mobile_number'].value;
    let email = document.forms['contactForm']['email'].value;
    let regexName = /^[A-Za-z\s]*$/;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let errorMsg = "";

    if(contactName == null || contactName == "") {

        errorMsg = "Error: Contact name must be filled in.";
        errorDiv.innerHTML = errorMsg;
        return false; 
    }
    
    if(!regexName.test(contactName)) {

        errorMsg = "Error: Contact name can only contain letters and spaces.";
        errorDiv.innerHTML = errorMsg;
        return false; 

    }

    if(contactName.length > 20) {

        errorMsg = "Error: Name is too long.";
        errorDiv.innerHTML = errorMsg;
        return false;
    }

    if(mobileNumber == "" || mobileNumber == null){ // mobile number validation

        errorMsg = "Error: Mobile number must filled in.";
        errorDiv.innerHTML = errorMsg;
        return false;
    }

    if(mobileNumber < 10) {

        errorMsg = "Error: Mobile number is not valid.";
        errorDiv.innerHTML = errorMsg;
        return false;
    }
    
    if(isNaN(mobileNumber)) { // mobile number validation

        errorMsg = "Error: Mobile number must be numeric.";
        errorDiv.innerHTML = errorMsg;
        return false;
    }

    if(!regexEmail.test(email)) { // validation for  email 

        errorMsg = "Error: Please enter a valid email address."
        errorDiv.innerHTML = errorMsg;
        return false;
    }

    // user input is fine and proceed to creating contact
    createContact(contactName, mobileNumber, email);
    errorDiv.style.visibility = "hidden";
    form.reset();
    return true;

}

// FUNCTION: to display person object in table form
function displayContacts() {

    let storeContact = localStorage.getItem("storeContact"); // local storage

    if(storeContact == null) {

        contacts = []; // holds local storage

    } else {

        contacts = JSON.parse(storeContact);
    }

    contacts.forEach(contact => {

        addContact(contact);
    });

}

// FUNCTION: to populate person object with user input
function createContact(name, number, email) {
    let storeContact = localStorage.getItem("storeContact"); // local storage
    let person = {};

    if(storeContact == null) {

        contacts = []; 

    } else {

        contacts = JSON.parse(storeContact);
    }

    person = {"name": name,
            "mobile_number": number,
            "email": email };

    contacts.push(person);
    localStorage.setItem("storeContact", JSON.stringify(contacts));

    addContact(person);

}

// FUNCTION: Adding contacting to the table
function addContact(contact) {

    const table = document.getElementById('contact-table');  
    let table_row = document.createElement('tr');
    let user_name = document.createElement('td'); 
    let user_number = document.createElement('td');
    let user_email = document.createElement('td'); 

    user_name.innerHTML = contact.name;
    user_number.innerHTML = contact.mobile_number;
    user_email.innerHTML = contact.email;

    table_row.appendChild(user_name);
    table_row.appendChild(user_number);
    table_row.appendChild(user_email);
    table.appendChild(table_row);

}

// FUNCTION: implents search feature to find a contact by mobile number - come back and look at this
function mobileNumberSearch() {

    let search_query = document.getElementById('search-bar').value;
    let data = document.getElementsByTagName('tr');
    let errorMsg = "";
    let match_found = 0; 

    // looping through the table at i = 1 because table headers is at i = 0
    for(let i = 1; i < data.length; i++) {

        if(data[i].innerHTML.includes(search_query)) { // The row exists

            data[i].style.display = "";
            match_found = 1;  // if a match is found
            document.getElementById('noResult').style.visibility = "hidden";

        }  else { //row doesnt exist 

            data[i].style.display = "none"; 

            if(match_found === 0) { // The row doesn't exist

                errorMsg = "Error: No Result.";
                document.getElementById('noResult').style.visibility = "visible";
                document.getElementById('noResult').innerHTML = errorMsg;

            }
        }
    }

    match_found = 0;
}

// FUNCTION: to sort contact names in ascending/descending order onclick
function sortContactNames() {

    // https://www.w3schools.com/howto/howto_js_sort_list.asp
    let table, table_rows, switching, i, current_row, next_row, shouldSwitch;
    table = document.getElementById("contact-table");
    switching = true;

    while(switching) {
        switching = false // no switching should take place until click is detected
        table_rows = table.rows;

        // looping through all rows except table headers
        for(i = 1; i < (table_rows.length - 1); i++) {
            shouldSwitch = false;

            current_row = table_rows[i].getElementsByTagName("td")[0];
            next_row = table_rows[i + 1].getElementsByTagName("td")[0];

            if(change_order){

                if(current_row.innerHTML.toLowerCase() > next_row.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }

            } else {

                if(current_row.innerHTML.toLowerCase() < next_row.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if(shouldSwitch) {
            table_rows[i].parentNode.insertBefore(table_rows[i + 1], table_rows[i]);
            switching =  true;

        } else {

            change_order = !change_order;
            
        }
    }

}
