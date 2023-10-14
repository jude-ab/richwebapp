
//calling function to display contacts from local storage onto the page
display_contacts();

const form = document.querySelector('form'); 
let  change_order = true; 
form.onsubmit = (e) => {

    e.preventDefault(); //preventing page from refreshing
}

//function to populate table with contacts
function createContact(name, mobile, email) {
    let store_contact = localStorage.getItem("store_contact"); //getting contacts from local storage
    let user = {};

    if(store_contact == null) {

        contacts = []; //initializing contacts if local storage is empty

    } 
    else {

        contacts = JSON.parse(store_contact);
    }

    user = {  
            "name": name,
            "mobile_number": mobile,
            "email": email 
        };

    contacts.push(user);
    localStorage.setItem("store_contact", JSON.stringify(contacts));

    addContact(user); //calling function to add contact to the table
}

//function to display contacts from local storage to the table on the contact
function display_contacts() {

    let store_contact = localStorage.getItem("store_contact"); //getting contacts from local storage

    if(store_contact == null) {

        contacts = []; //initializing contacts if local storage is empty

    } else {

        contacts = JSON.parse(store_contact); //parsing contacts from local storage
    }

    contacts.forEach(contact => {

        addContact(contact); //calling function to add each contact to the table
    });

}

//function to validate user input
function Validation() {

    let contact_n = document.forms['contact_form']['contact_name'].value;
    let mobile_n = document.forms['contact_form']['mobile_number'].value;
    let email = document.forms['contact_form']['email'].value;
    let regex_name = /^[A-Za-z\s]*$/;
    let regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let error_div =  document.getElementById('error');
    let error_message = "";

    //validation for user email
    if(!regex_email.test(email)) {

        error_message = "Email address invalid!"
        error_div.innerHTML = error_message;
        return false;
    }

    //validation for user mobile number
    if(isNaN(mobile_n)) { 

        error_message = "Mobile number must include numbers!";
        error_div.innerHTML = error_message;
        return false;
    }

    //validation for user name    
    if(contact_n == null || contact_n == "") {

        error_message = "Contact name must be filled in!";
        error_div.innerHTML = error_message;
        return false; 
    }
    
    //validation for user name
    if(!regex_name.test(contact_n)) {

        error_message = "Contact name can only contain letters and spaces!";
        error_div.innerHTML = error_message;
        return false; 

    }

    //validation for user name
    if(contact_n.length > 20) {

        error_message = "Name is too long!";
        error_div.innerHTML = error_message;
        return false;
    }

    //validation for user mobile number
    if(mobile_n == "" || mobile_n == null){ 
        error_message = "Mobile number must filled in!";
        error_div.innerHTML = error_message;
        return false;
    }

    //validation for user mobile number
    if(mobile_n < 10) {

        error_message = "Mobile number is invalid!";
        error_div.innerHTML = error_message;
        return false;
    }
    
    //creating contact if all validations are passed
    createContact(contact_n, mobile_n, email);
    error_div.style.visibility = "hidden";
    form.reset();
    return true;

}

//function to add contact to the table
function addContact(contact) {

    const table = document.getElementById('contacts_table');  //getting table from html
    let table_row = document.createElement('tr');
    let user_name = document.createElement('td'); 
    let user_mobile = document.createElement('td');
    let user_email = document.createElement('td'); 

    //getting contact info from local storage
    user_name.innerHTML = contact.name; 
    user_mobile.innerHTML = contact.mobile_number;
    user_email.innerHTML = contact.email;

    //appending contact details to the table
    table_row.appendChild(user_name); 
    table_row.appendChild(user_mobile); 
    table_row.appendChild(user_email); 
    table.appendChild(table_row); 

}

//function to sort contact names in ascending and descending order
function sortNames() {

    //https://www.w3schools.com/howto/howto_js_sort_list.asp
    //https://codereview.stackexchange.com/questions/268091/sort-table-with-ascending-or-descending-order-without-a-library
    let table, table_rows, switching, i, current_row, next_row, shouldSwitch;
    table = document.getElementById("contacts_table");
    switching = true;

    while(switching) {
        switching = false; //no switching has been done
        table_rows = table.rows;

        //looping through the table at i = 1 because table headers is at i = 0
        //comparing the current row with the next row
        for(i = 1; i < (table_rows.length - 1); i++) {
            shouldSwitch = false;

            //getting the first cell of the current row and the next row 
            current_row = table_rows[i].getElementsByTagName("td")[0]; 
            next_row = table_rows[i + 1].getElementsByTagName("td")[0]; 

            if(change_order){ //sorting in ascending order

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
            table_rows[i].parentNode.insertBefore(table_rows[i + 1], table_rows[i]);
            switching =  true;

        } else {

            change_order = !change_order;
            
        }
    }

}

//function to sort contact numbers in ascending and descending order
function mobileSearch() {

    let search = document.getElementById('search_bar').value; //getting search input from user
    let user_data = document.getElementsByTagName('tr'); //getting table rows from html
    let error_message = "";
    let user_found = 0; 

    // looping through the table at i = 1 because table headers is at i = 0
    for(let i = 1; i < user_data.length; i++) {

        //checking if the search input matches any of the table rows
        if(user_data[i].innerHTML.includes(search)) { 

            user_data[i].style.display = "";
            user_found = 1; //row exists
            document.getElementById('noResult').style.visibility = "hidden";

        }  else { //if the search input doesn't match any of the table rows 

            user_data[i].style.display = "none"; 

            if(user_found === 0) { //if no row exists

                error_message = "Error: No Result.";
                document.getElementById('noResult').style.visibility = "visible";
                document.getElementById('noResult').innerHTML = error_message;

            }
        }
    }

    user_found = 0;
}



