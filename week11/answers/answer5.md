### Question 5:
Detail how the browser loads and bootstraps a rich web application from an initial URL.

### Answer: 
The following actions are taken by browsers in response to a user's request to retrieve a website:

1. The domain name server (DNS), which serves as an address book and informs the browser of the location of the website, is accessed by the browser. 

2. The browser establishes a TCP/IP connection to the IP address of the server and the assigned port linked to that URL. These prototypes will indicate the location on the server of the files needed to load the webpage.

3. A browser connects to an application server listening on that IP address.

4. Using the open TCP/IP connection, the browser sends an HTTP request.

5. Using the same TCP/IP connection, the application server parses the request and sends the required files to the browser.

