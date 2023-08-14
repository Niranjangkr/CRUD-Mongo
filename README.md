# CRUD-Mongo
 Deployed site: https://mern-app2.netlify.app/
 
**Local setUp**
Clone the repo 
- go to client folder and install all the dependencies using ```npm install``` 
- go to the server folder install all the dependencies using ```npm install```
- set up a database in mongodb atlas  
- make a .env file in the server folder and store the connection string which you get from mongodb application setup option , make a CONNECTION_STRING field in the .env and assign the string to it make sure to add the password and collection name in the string.
- run the server using ```node app.js```
- you'll get ```connecting``` message in console when the connection is done to the database
- run the client side code using ```npm run dev```
- **All Set**

uploads folder from server is not included make a uploads folder in the server folder to store the static files.
