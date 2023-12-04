## Question 2:

In functional programming, what does the term functor mean? Can you give an example in JavaScript?

Answer:
A construct that can be mapped over, similar to a container, is called a functor in functional programming. It is an object with a map function. By applying a function to the values inside the object (the container), the map method creates a new object containing the modified data.

Arrays are a typical example of a functor in JavaScript. Array.prototype.map is a function that maps over an array.

#### Example of Functor in JavaScript:

`this.map = (f) => Functor(f(value));`
