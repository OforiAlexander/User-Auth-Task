# Password Hashing Logic

The Logic behind hashing passwords is to set a one-way function where when data is first hashed, it cannot be reversed or sent back to it previous or original state.

- Hashed passwords are stored in the database as a number of random salt characters that hides the actual plain-text nature of the password

## My Auth User Backend 
The backend provides a layered and secure authentication method and structure to storing user's information and validating each request and inputs received. 

### My data structure includes:

1. **User Model**: This sets and definds the user schema whiles inilialy hashing all passwords received.
2. **UserAuthController**: My controller is responsible for handling the logic of recieving and retrieving the user's information on request.
3. **JSON Web Tokens**: Used it to generate the login tokens for authenticated users for successfully logging in.

I used the `bcrypt` library to securely hash the password with a salt [`the random characters inserted when passwords are hashed`]. Even passwords that are identical ends up having different characters. Swaying intruders from knowing you password.


## User Registration Logic
The `register` method in the `UserAuthController` creates a new user using the `User.create()` method.This method receives the requested username and password, upon successful authentication, it returns a message indicating the new user creation


## User Login Logic
The `login` method in the `UserAuthController` checks if the username exists in the database using `User.findOne()` method. This method checks if there is an existing data that matchs the one inserted. If the username is not found, a 401 Unauthorized response is returned with an `Invalid username or password` message.

If the username is found, the `validatePassword` method is called to compare the provided password with the hashed password stored in the database.

If the password is invalid, a 401 Unauthorized response is returned with an `Invalid username or password` message. If the username and password are both valid, the JWT is generated using the user's `id` and `username`. The token is then returned in the response json with a 200 success status.

## Input Validation
The application uses the Joi library for input validation. The `validate` middleware function is used to validate the request body for both registration and login endpoints.

- There is a layered validation method that ensures input validations for both the register and login endpoints, securing the application from wrongful injections.