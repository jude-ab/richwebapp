import fetch from "node-fetch";

// Function to process data for part 1
const post_titles = (posts) => {
    const title_length = posts.filter(post => titleLength(post.title));
    const titles = title_length.map(post => post.title);
    console.log("Titles with more than six words:");
    console.log(titles);
};

// Part 1: List all post titles with more than six words
const titleLength = (titles) => {
    const word = titles.split(' '); // Split on whitespace
    return word.length > 6;
};

// Function to process data for part 2
const wordMap = (posts) => {
    const body_content = posts.map(post => post.body);
    // Join all the body contents into one string, convert to lowercase, and 
    // split on whitespace to get an array of all words
    const words = body_content
        .join(' ')
        .toLowerCase()
        .match(/\w+/g);

    //(reduce) iterate over each word in the "words" array, and for each word, 
    //check if it exists in the map. If it does, increment its value by 1,
    //extract all the words, calculate their frequency, and
    //return a map of word frequency
    const word_frequency = words.reduce((map, word) => {
        map[word] = (map[word] || 0) + 1;
        return map;
    }, {});

    console.log('Word frequency map:');
    console.log(word_frequency);
};

//fetch data from the given URL and log the results.
const fetchData = () => {
    fetch('http://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            post_titles(posts);
            wordMap(posts);
        })
        .catch(error => console.error('Error fetching data:', error));
};

//initiate the process
fetchData();
