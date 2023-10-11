import fetch from "node-fetch";

//FUNCTION: which returns true if the post title is > 6
function countTitleWords(title) {

  const posts = title.split(' ');

  return posts.filter(word => word !== '').length > 6;

}

function displayFrequency(body_text) {

  let result = {};
  let strArr = body_text.split(/\s+/);

  for(let i = 0; i < strArr.length; i++) {

    let word = strArr[i];

    if(result[word] === undefined) {

      result[word] = 1;

    } else {

      result[word] += 1;

    }

  }

  return result;

}

let request = fetch('https://jsonplaceholder.typicode.com/posts/');
  request.then(response => response.json())

  .then(posts => {

    console.log(posts.filter(posts => countTitleWords(posts.title)).map(posts => posts.title))  
    console.log(posts.map(posts => displayFrequency(posts.body))) 

  });

