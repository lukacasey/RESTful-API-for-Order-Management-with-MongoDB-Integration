Description: This project involved designing and building a MongoDB database to support an orders application. The database was implemented using JSON-like documents, and the DAO pattern was used to handle interactions with the database. The application uses a RESTful API to allow users to create, read, update, and delete orders stored in the database. The server was built using Node.js and Express, and the MongoDB driver was used to establish a connection to the MongoDB cluster. The application was designed to be scalable, with automatic scaling features provided by MongoDB. The resulting database offers high performance and availability, allowing the application to efficiently handle large amounts of data.
**

--Instuctions/How to use--

1. Enter...

{
	"username": "myuser",
	"password": "mypassword"
}

... to "/api/login" to receive Json Web Token (JWT). 

2. Copy this Token.

3. Then, when sending a GET request to "/api/orders"... use "Authorization" as the header name and in the value field type "Bearer insertJwtHere"

4. Access will be given to the orders API
