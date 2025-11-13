## Steps to create a vintinder website:
  - create a repository uisng -> npm init
  - Initialise the repository
  - node_modules,package.json,package-lock.json
  - Install express using -> npm i express
  - Create a server
  - listen a server
  - request handler for /,/test,/hello
  - Install nodemon  and update script inside package.json using  -> npm i -g nodemon
  - what are the dependecies
  - what are the use of "-g" while npm install
  - Difference between caret and tilde ( ^ vs ~)

  - initialise the git 
  - create .gitignore and .env file 
  - create a remote repo on github
  - push all code to github 
  - play with routes extensions like /hello,/,/hello/2,/test/,/home 
  - order of routes matter a lot
  - Install postman app and make workspace/collections > get api call
  - write logic to handle GET,POST,DELETE,PATCH method and test api .
  - Explore routing and use of ? , + , *, () in the routes
  - Use of regex in routes /a/ , /.*fly$/
  - Reading the query params in the routes
  - Reading the dynamic routes

  - multiple route handler in one route
  - next() and  errors with along res.send()
  - app.use("/route", Rh1,[RH2,RH3],Rh4,RH5)
  - what is the middleware
  - How Express js basically handles request behind the scenes
  - write a dummy auth middleware for admin 
  - write a dummy auth middleware for User routes except user/login 
  - Error handling using app.use("/",(err,req,res,next) => {});

  - create free cluster on monogodb official website(Mongo Altas);
  - install monogoose library
  - Connect your application to database / vintinder
  - call the connectdb function and connect to the database before the application on 7777
  - Create a userSchema and User Model
  - create a post /signup api to add database
  - push some documents to database using  api calls from postman 
  - Error handling using try and catch

  - JS object vs json (difference)
  - Add the express.json() middleware to app
  - make your /signup api  dynamic to receive data from end user(postman or browser) 
  - API - get userOne by emailId
  - API - Feed API  - GET /feed - get all the users from database using find() and findOne() filter 
  - Install dotenv package to use .env and require("dotenv").config(); 