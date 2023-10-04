// span elements 
const spans = document.getElementsByTagName("span");
for(let i = 0; i < spans.length; i++) {

    spans[i].innerText = "COMPUTER SCIENCE FINAL YEAR";
}

// div elements 
const divs = document.getElementsByTagName("div");
for(let i = 0; i < divs.length; i++) {

    divs[i].style.background = "#D5DC48";
}

document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.getElementById("playButton");
    let audio = new Audio(chrome.runtime.getURL("song.mp3"));
  
    playButton.addEventListener("click", function () {
      if (audio.paused) {
        audio.play();
        playButton.textContent = "Pause";
      } else {
        audio.pause();
        playButton.textContent = "Play";
      }
    });
  });
  
