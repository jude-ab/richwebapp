//FUNCTION: TO SEARCH GITHUB API FOR USERNAME THAT IS ENTERED
function searchUser() {
    
    const search_input = document.getElementById("search-query");
    let username = document.getElementById('search-query').value;

    // if no username is entered
    if(!username) {
        alert("ERROR: USERNAME MUST BE ENTERED IN ORDER TO SEARCH GITHUB");
    }

    search_input.value = ""; //resetting input field to be empty once search
    
    let request = fetch(`https://api.github.com/users/${username}`);

    request.then(response => {

        console.log(response.json());

        //if the request has a status code of 200 - 299
        if(response.ok) {

            displayUserProfile(username);
            displayUserRepos(username);
        }
    })
}

// FUNCTION: TO DISPLAY USER INFORMATION
function displayUserProfile(username) {

    let profile_picture = document.getElementById('profile-picture');
    let name = document.getElementById('name');
    let git_username = document.getElementById('username');
    let email = document.getElementById('email');
    let location = document.getElementById('location');
    let num_gists = document.getElementById('number-of-gists');
    
    let request = fetch(`https://api.github.com/users/${username}`);

    request.then(response => response.json()) 
    .then(user_data => {

        profile_picture.src = user_data.avatar_url;
        name.innerHTML = "Name: " + user_data.name;
        git_username.innerHTML = "Username: " + user_data.login;
        location.innerHTML = "Location: " + user_data.location;
        num_gists.innerHTML = "Number of Gists: " + user_data.public_gists;

        // if no email is returned
        if(user_data.email === null) {

            email.innerHTML = "Email: N/A";
        } 

        // if not name is returned 
        if(user_data.name === null) {

            name.innerHTML = "Name: N/A";
        }

        // if not location is returned
        if(user_data.location === null) {

            location.innerHTML = "Location: N/A";
        }
    })
}

//FUNCTION: TO DISPLAY USER REPO INFORMATION
function displayUserRepos(username) {

    let repo_conatiner = document.getElementById('repo');

    // clearing previous fetch data
    while(repo_conatiner.firstChild) {

        repo_conatiner.firstChild.remove();
    }

    let request = fetch(`https://api.github.com/users/${username}/repos`);
    
    request.then(response => response.json())
    .then(repos => {

        console.log(repos)
        // if there are more than 5 repos make the scroll bar visible
        if(repos.length > 5) {

            let user_repo_container = document.getElementById('repo-container');
            user_repo_container.className = "div-scrollbar";
            user_repo_container.style.overflow = "auto";
        }

        for(let i = 0; i < repos.length; i++) {

            let next_repo_container = document.createElement("div");
            let next_repo_name = document.createElement("p");
            let next_repo_desc = document.createElement("p");
            next_repo_name.innerHTML = "Name: ";
            next_repo_desc.innerHTML = "Description: ";
            next_repo_container.className = "next-repo-style";
            next_repo_name.insertAdjacentText('beforeend', repos[i].name);

            // if there is no repo description
            if(!repos[i].description) {

                next_repo_desc.insertAdjacentText('beforeend', 'No repository description available');

            } else {

                next_repo_desc.insertAdjacentText('beforeend', repos[i].description);
            }

            repo_conatiner.appendChild(next_repo_container);
            next_repo_container.appendChild(next_repo_name);
            next_repo_container.appendChild(next_repo_desc);
        }
    })
}