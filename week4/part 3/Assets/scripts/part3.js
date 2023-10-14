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

            name.innerHTML = "Name: not available";
        }

        // if no email is returned
        if(user_data.email === null) {

            email.innerHTML = "Email: not available";
        } 

        // if not location is returned
        if(user_data.location === null) {

            location.innerHTML = "Location: not available";
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

            let container_user_repo = document.createElement("div");
            let repo_name = document.createElement("p");
            let repo_description = document.createElement("p");
            repo_name.innerHTML = "Name: ";
            repo_description.innerHTML = "Description: ";
            container_user_repo.className = "repo_style";
            repo_name.insertAdjacentText('beforeend', repos[i].name);

            // if there is no repo description
            if(!repos[i].description) {

                repo_description.insertAdjacentText('beforeend', 'No repository description available');

            } else {

                repo_description.insertAdjacentText('beforeend', repos[i].description);
            }

            repoC.appendChild(container_user_repo);
            container_user_repo.appendChild(repo_name);
            container_user_repo.appendChild(repo_description);
        }
    })
}