let contacts = [];
let ascending = true;

function addContact() {
    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;

    if (!name || !mobile || !email) {
        document.getElementById("error").textContent = "All fields are required.";
        return;
    }

    const namePattern = /^[A-Za-z\s]{1,20}$/;
    const mobilePattern = /^\d{10}$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!namePattern.test(name) || !mobilePattern.test(mobile) || !emailPattern.test(email)) {
        document.getElementById("error").textContent = "Invalid input format.";
        return;
    }

    document.getElementById("error").textContent = "";

    const contact = { name, mobile, email };
    contacts.push(contact);
    displayContacts();
    resetFields();
}

function displayContacts() {
    const table = document.getElementById("contacts");
    table.innerHTML = `
        <tr>
            <th onclick="sortTable(0)">Name</th>
            <th>Mobile</th>
            <th>Email</th>
        </tr>
    `;
    
    for (let i = 0; i < contacts.length; i++) {
        const row = table.insertRow(i + 1);
        row.style.backgroundColor = i % 2 === 0 ? "#f2f2f2" : "";
        row.insertCell(0).innerHTML = contacts[i].name;
        row.insertCell(1).innerHTML = contacts[i].mobile;
        row.insertCell(2).innerHTML = contacts[i].email;
    }
}

function resetFields() {
    document.getElementById("name").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("email").value = "";
}

function sortTable(columnIndex) {
    contacts.sort((a, b) => {
        const valueA = a.name.toUpperCase();
        const valueB = b.name.toUpperCase();
        if (ascending) {
            return valueA.localeCompare(valueB);
        } else {
            return valueB.localeCompare(valueA);
        }
    });
    ascending = !ascending;
    displayContacts();
}

function filterContacts() {
    const search = document.getElementById("search").value;
    const filteredContacts = contacts.filter(contact => contact.mobile.includes(search));
    if (filteredContacts.length === 0) {
        document.getElementById("noResult").style.display = "block";
    } else {
        document.getElementById("noResult").style.display = "none";
    }
    displayContacts(filteredContacts);
}
