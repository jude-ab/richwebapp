//function to search for username
function find_user() {
    
    const user_input = document.getElementById("user_search");
    let user_name = document.getElementById('user_search').value;

    // if no user_name is entered
    if(!user_name) {
        alert("error! Please enter a user name to search for!");
    }

    user_input.value = ""; //resetting input field to be empty once search
    
    let request = fetch(`https://api.github.com/users/${user_name}`);

    request.then(response => {

        console.log(response.json());

        //if the request was successful. If not, display error message
        if(response.ok) {

            display_profile(user_name);
            display_repos(user_name);
        }
        else {
            alert("Error! Please enter a valid user name to search for!");
        }
    })
}

//function to display user profile
function display_profile(user_name) {

    let pfp = document.getElementById('profile-picture');
    let name = document.getElementById('name');
    let git_name = document.getElementById('username');
    let email = document.getElementById('user_email');
    let location = document.getElementById('user_location');
    let gists_number = document.getElementById('gists');

    let github_api = `https://api.github.com/users/${user_name}`;
    
    let github_request = fetch(github_api);

    //fetching user information
    github_request.then(response => response.json())
    .then(user_data => {

        //Display user information
        pfp.src = user_data.avatar_url;
        name.innerHTML = "Name: " + (user_data.name ? user_data.name : "Name is not available");
        git_name.innerHTML = "git_name: " + user_data.login;
        location.innerHTML = "Location: " + (user_data.location ? user_data.location : "Location is not available");
        gists_number.innerHTML = "Number of Gists: " + user_data.public_gists;

        //Display a message if email is not available
        if (!user_data.email) {
            email.innerHTML = "Email is not available";
        }
    });
}

//function to display user repos
function display_repos(user_name) {

    const repoC = document.getElementById('repo');

    //Clear previous fetch data
    while (repoC.firstChild) {
        repoC.firstChild.remove();
    }

    let  github_api = `https://api.github.com/users/${user_name}/repos`;

    //fetching user repos
    fetch(github_api)
        .then(response => response.json())
        .then(repos => {
            console.log(repos);

   
        // if there are more than 5 repos make the scroll bar visible
        if(repos.length > 5) {

            let user_repo = document.getElementById('repo_container');
            user_repo.className = "scroll_bar";
            user_repo.style.overflow = "auto";
        }

        //Display user repos
        for(let i = 0; i < repos.length; i++) {

            let container_user_repo = document.createElement("div");
            let repo_name = document.createElement("p");
            let repo_description = document.createElement("p");
            repo_name.innerHTML = "Name: ";
            repo_description.innerHTML = "Description: ";
            container_user_repo.className = "repo_style";
            repo_name.insertAdjacentText('beforeend', repos[i].name);

            //if there is no repo description
            if(!repos[i].description) {

                repo_description.insertAdjacentText('beforeend', 'No description available');

            } else { 

                repo_description.insertAdjacentText('beforeend', repos[i].description);
            }

            //appending user repos to the container
            repoC.appendChild(container_user_repo);
            container_user_repo.appendChild(repo_name);
            container_user_repo.appendChild(repo_description);
        }
    })
}