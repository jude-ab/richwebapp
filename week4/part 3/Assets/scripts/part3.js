//FUNCTION: TO SEARCH GITHUB API FOR USER_NAME THAT IS ENTERED
function find_user() {
    
    const user_input = document.getElementById("user_search");
    let user_name = document.getElementById('user_search').value;

    // if no user_name is entered
    if(!user_name) {
        alert("error! Please enter a user_name to search for!");
    }

    user_input.value = ""; //resetting input field to be empty once search
    
    let request = fetch(`https://api.github.com/users/${user_name}`);

    request.then(response => {

        console.log(response.json());

        //if the request has a status code of 200 - 299
        if(response.ok) {

            display_profile(user_name);
            display_repos(user_name);
        }
    })
}

// FUNCTION: TO DISPLAY USER INFORMATION
function display_profile(user_name) {

    let pfp = document.getElementById('profile-picture');
    let name = document.getElementById('name');
    let git_name = document.getElementById('username');
    let email = document.getElementById('user_email');
    let location = document.getElementById('user_location');
    let gists_number = document.getElementById('gists');
    
    let request = fetch(`https://api.github.com/users/${user_name}`);

    request.then(response => response.json()) 
    .then(user_data => {

        pfp.src = user_data.avatar_url;
        name.innerHTML = "Name: " + user_data.name;
        git_name.innerHTML = "User name: " + user_data.login;
        location.innerHTML = "Location: " + user_data.location;
        gists_number.innerHTML = "Number of Gists: " + user_data.public_gists;

        // if not name is returned 
        if(user_data.name === null) {

            name.innerHTML = "Name: N/A";
        }

        // if no email is returned
        if(user_data.email === null) {

            email.innerHTML = "Email: N/A";
        } 

        // if not location is returned
        if(user_data.location === null) {

            location.innerHTML = "Location: N/A";
        }
    })
}

//FUNCTION: TO DISPLAY USER REPO INFORMATION
function display_repos(user_name) {

    let repoC = document.getElementById('repo');

    // clearing previous fetch data
    while(repoC.firstChild) {

        repoC.firstChild.remove();
    }

    let request = fetch(`https://api.github.com/users/${user_name}/repos`);
    
    request.then(response => response.json())
    .then(repos => {

        console.log(repos)
        // if there are more than 5 repos make the scroll bar visible
        if(repos.length > 5) {

            let user_repo = document.getElementById('repo_container');
            user_repo.className = "scroll_bar";
            user_repo.style.overflow = "auto";
        }

        for(let i = 0; i < repos.length; i++) {

            let next_user_repo = document.createElement("div");
            let next_user_repoN = document.createElement("p");
            let next_description = document.createElement("p");
            next_user_repoN.innerHTML = "Name: ";
            next_description.innerHTML = "Description: ";
            next_user_repo.className = "repo_style";
            next_user_repoN.insertAdjacentText('beforeend', repos[i].name);

            // if there is no repo description
            if(!repos[i].description) {

                next_description.insertAdjacentText('beforeend', 'No repository description available');

            } else {

                next_description.insertAdjacentText('beforeend', repos[i].description);
            }

            repoC.appendChild(next_user_repo);
            next_user_repo.appendChild(next_user_repoN);
            next_user_repo.appendChild(next_description);
        }
    })
}