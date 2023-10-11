//music player for extension 
//creating audio object and adding event listener to play button 
document.addEventListener("DOMContentLoaded", function () { //when the page/DOM loads
  const playButton = document.getElementById("playButton"); //getting the play button element
  let audio = new Audio(chrome.runtime.getURL("song.mp3")); //creating a new audio object with the song.mp3 file

  //adding event listener to play button
  playButton.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
      playButton.textContent = "Pause";
    } else {
      //if the audio is playing, pause it and change the button text to play
      audio.pause();
      playButton.textContent = "Play"; //changing the button text to play
    }
  });
});

// getting and changing span elements to COMPUTER SCIENCE FINAL YEAR
const spans = document.getElementsByTagName("span");
for(let i = 0; i < spans.length; i++) {

    spans[i].innerText = "COMPUTER SCIENCE FINAL YEAR";
} 

//getting and changing background of div elements to #D5DC48/yellow
const divs = document.getElementsByTagName("div");
for(let i = 0; i < divs.length; i++) {

    divs[i].style.background = "#D5DC48"; //changing the background color of the divs to yellow
}

