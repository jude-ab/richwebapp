Question 3:
We have looked at three kinds of asynchronous programming mechanisms, namely callbacks, promises and streams. Mention one advantage and one disadvantage of each type.

Answer:

###  Callbacks

#### Advantage

Using callback functions in JavaScript allows for the development of asyncronous programs. They ensure that the function won't continue to run until a task has been completed. The function will carry on after the task has been completed. Callback functions provide the primary benefit of allowing one function to wait on the outcome of a prior function call.

#### Disadvantage

The issue with callback functions is that they handle errors less effectively than Promises. Callback methods that are used for error handling provide nested callbacks since one callback method's data is required for another. resulting in non-DRY code that is challenging to manage.

### Promises

#### Advantage

Another method for implementing asynchronous activities in JavaScript is to use promises. Promises can support many asychronous functions and manage errors more effectively.

##  Disadvantage
Promises' incompatibility with earlier browser versions is their primary drawback. Due to their design, promises operate more slowly than callback functions since they cannot handle data sources that contain multiple values.

## Streams

### Advantage

Process data as it comes in and manage massive volumes of data effectively by processing individual pieces rather than waiting for the entire payload.

### Disadvantage

More complicated setup and interface; difficult to manage data flow and handle back pressure.
