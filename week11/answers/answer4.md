### Question 4:

With the aid of a diagram and example code, describe the Cascading Style Sheets (CSS) Box Model and show how it can be used to space DOM elements

### Answer:

The CSS Box Model explains how each document object model (DOM) element appears as a rectangular box on the page. It is made up of margins, borders, padding, and the content area.

![image of box model](image)

example code:

.box {
width: 100px;
height: 100px;
padding: 20px;  
 border: 5px solid black;
margin: 10px;
}

/_ HTML _/

<div class="box"></div>
