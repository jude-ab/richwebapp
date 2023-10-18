
//calling function to display contacts from local storage onto the page
display_contacts(); 

const form = document.querySelector('form'); 
let  asc_order = true; 
form.onsubmit = (e) => {
    e.preventDefault(); //preventing page from refreshing
}

//function to create contact object and store it in local storage
function create_contact(name, mobile, email) {
    let stored_contacts = localStorage.getItem("store_contact") || "[]"; // Get contacts from local storage
    let contacts = JSON.parse(stored_contacts);

    const user = {
        "name": name,
        "mobile_number": mobile,
        "email": email
    };

    contacts.push(user);
    localStorage.setItem("store_contact", JSON.stringify(contacts)); // Add the contact to local storage

    addContact(user); // Add the contact to the table
}

//function to display contacts from local storage onto the page
function display_contacts() {
    let stored_contacts = localStorage.getItem("store_contact") || "[]"; 
    let contacts = JSON.parse(stored_contacts);

    contacts.forEach(contact => {
        addContact(contact); //Add the contact to the table
    });
}


//function to validate user input
function Validation() {

    let contact_n = document.forms['contact_form']['contact_name'].value;
    let mobile_n = document.forms['contact_form']['contact_number'].value;
    let email = document.forms['contact_form']['contact_email'].value;
    let name_r = /^[A-Za-z\s]*$/;
    let email_r = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let error_div = document.getElementById('error');
    let error_message = "";

    if(contact_n == null || contact_n == "") {

        error_message = "Error! Contact name can not be empty!.";
        error_div.innerHTML = error_message;
        return false; 
    }
    
    if(!name_r.test(contact_n)) {

        error_message = "Error! Contact name can only contain letters and spaces!";
        error_div.innerHTML = error_message;
        return false; 

    }
              
    if(contact_n.length > 20) {

        error_message = "Error! Contact name is too long!";
        error_div.innerHTML = error_message;
        return false;
    }

    if(mobile_n == "" || mobile_n == null){ // mobile number validation

        error_message = "Error! Mobile number can not be empty!";
        error_div.innerHTML = error_message;
        return false;
    }

    if(mobile_n < 10) {

        error_message = "Error! Mobile number can not contain less than 10 numbers!";
        error_div.innerHTML = error_message;
        return false;
    }
    
    if(isNaN(mobile_n)) { // mobile number validation

        error_message = "Error! Mobile number must contain only numbers!";
        error_div.innerHTML = error_message;
        return false;
    }

    if(!email_r.test(email)) { // validation for  email 

        error_message = "Error! Email address invalid!"
        error_div.innerHTML = error_message;
        return false;
    }

    // user input is fine and proceed to creating contact
    create_contact(contact_n, mobile_n, email);
    error_div.style.visibility = "hidden";
    form.reset();
    return true;
}


//function to add contact to the table
function addContact(contact) {

    const table = document.getElementById('contacts_table');  //getting table from html
    let contact_name = document.createElement('td'); 
    let contact_mobile = document.createElement('td');
    let contact_email = document.createElement('td'); 
    let row = document.createElement('tr');

    //getting contact info from local storage
    contact_name.innerHTML = contact.name; 
    contact_mobile.innerHTML = contact.mobile_number;
    contact_email.innerHTML = contact.email;

    //appending contact details to the table
    row.appendChild(contact_name); 
    row.appendChild(contact_mobile); 
    row.appendChild(contact_email); 
    table.appendChild(row); 

}

//function to sort contact names in ascending and descending order
function sortNames() {

    //https://www.w3schools.com/howto/howto_js_sort_list.asp
    //https://codereview.stackexchange.com/questions/268091/sort-table-with-ascending-or-descending-asc_order-without-a-library
    let switching, i, current_row, next_row, shouldSwitch;
    const table = document.getElementById("contacts_table");
    switching = true;
    let t_rows = table.rows;

    while(switching) {
        switching = false; //no switching has been done

        //looping through the table at i = 1 because table headers is at i = 0
        //comparing the current row with the next row
        for(i = 1; i < (t_rows.length - 1); i++) {
            shouldSwitch = false;

            //getting the first cell of the current row and the next row 
            current_row = t_rows[i].getElementsByTagName("td")[0]; 
            next_row = t_rows[i + 1].getElementsByTagName("td")[0]; 

            if(asc_order){ //sorting in ascending order

                if(current_row.innerHTML.toLowerCase() > next_row.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }

            } else { //sorting in descending order

                if(current_row.innerHTML.toLowerCase() < next_row.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        //if switching is true, switch the rows
        if(shouldSwitch) {
            t_rows[i].parentNode.insertBefore(t_rows[i + 1], t_rows[i]); //inserting the next row before the current row
            switching =  true;

        } else {

            asc_order = !asc_order; //change the asc_order
            
        }
    }

}

//function to search for contact mobile number
//https://www.w3schools.com/howto/howto_js_filter_lists.asp
function numberSearch() {
    const search = document.getElementById('search_bar');
    const filter = search.value.trim().toLowerCase();
    const table = document.getElementById("contacts_table");
    const contact_rows = table.getElementsByTagName('tr');
    const error_message = document.getElementById('no_result');

    // Loop through all table rows, and hide those that don't match the search query
    for (let i = 1; i < contact_rows.length; i++) { // Start at 1 to skip the table headers
        const cells = contact_rows[i].getElementsByTagName("td");
        const number_column = cells[1]; // Mobile number is in the second column

            if (number_column) { // If the column exists
                const mobileNumber = number_column.textContent.trim().toLowerCase(); // Get the mobile number
                // If the mobile number matches the search query, display the row, otherwise hide it
                if (mobileNumber.indexOf(filter) > -1) {
                    contact_rows[i].style.display = "";
                } else {
                    contact_rows[i].style.display = "none";
                }
            }
    }

    // Show the "No Result" message if no matching rows are found
    const display_number = Array.from(contact_rows).slice(1).some(row => row.style.display !== 'none');
    error_message.style.visibility = display_number ? 'hidden' : 'visible';
    error_message.innerHTML = 'Error! Invalid mobile number.';
}

// Add an event listener to start searching as soon as the user types
document.getElementById('search_bar').addEventListener('input', numberSearch);
