## Self-Study/Essay Questions

Demonstrate your understanding of this Sprint's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

- [1] Mention two parts of Express that you learned about this week.
  Express is a framework that sits on top of Node.js that adds extra functionality like middleware and routing.

- [2] Describe Middleware?
  Relative to Express, middleware is essentially an array of functions that are executed in our server in the order they're introduced (which almost always means left-to-right).

- [3] Describe a Resource?
  A resource in terms of Node.js and Express is any piece of data from our database we might want to reference with an endpoint.

- [4] What can the API return to help clients know if a request was successful?
  It can return a status code that indicates a successful request along with a json object.

- [5] How can we partition our application into sub-applications?
  We can use middleware and routes to partition our app into sub-apps that run separately depending on the request that comes in.
