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
  - API - for delete api for user
  - API - Update a user by Id
  - Explore mongoose docs for Model
  - explore Model.findOneAndUpdate option
  - API - Update a user by emailId

  - Explore SchemaTypes option from mongoose docs
  - Add validation like required,unique,lowercase,min,max,minlength,trim.
  - Add dafault value
  - Improve the DB schema Put all validation on each field schema
  - Add timestamps to the schema
  - Add api level validation on patch request & sign up api
  - Data Sanitizing - Add API validation for each field

  - Installed validator
  - Explore validator function and use validator function for password,emailId,photoURL
  - validate the signup API - create a validation.js file
  - Install bcrypt library to to create passwordHash using bcrypt.hash() and user is Encrypted password
  - Created  login api
  - compare passwords using bcrypt.comapare() and throw errors if emailId and password does not match
  
  - Install cookie-parser -> app.use(cookieParser())
  - sending dummy cookie to user
  - create GET /profile api and check if the cookie get back 
  - Install jwt(jsonwebtoken) 
  - In login API,after email and password validation,create a JWT token and send it it inside  cookie ->res.cookies("token",token)
  - read the cookie inside the /profile API and find the logged in user. 
  - Created userAuth Middeleware
  - Add the userAuth middleware in profile page and new sendConnectionRequest API
  - set  the expiry of JWT Token and cookies to 7 days 