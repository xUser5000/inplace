# Authentication/Authorization Workflow

## Registration
To register a new user, POST `/auth/register` with the user data in the request body. This creates a new user record in the database and sends an email containing a link for the user to verify his account.

Note that in the local development environment, send emails are handled by `mailhog` mail server. The web UI of `mailhog` can be accessed through [http://localhost:8025](http://localhost:8025).

If you set the `REQUIRE_EMAIL_VERIFICATION` environment variable to `Yes`, any newly-registered user will be automatically verified and no verification email would be sent.

## Login
To obtain a JSON Web Token (JWT), POST `/auth/login` and include the `email` and `password` in the request body. The JWT doesn't currently have an expiration date.

`/auth/login` sends back an object containing a JWT and the user data (without the password of course xD).

## Logout
For now, there is no mechanism to log out on the backend. The frontend just has to get rid of the token. This will be changed in the future.

## Authorization
To access any private endpoint (i.e., endpoints that require the user to be logged in), the JWT associated with that user must be sent in the header `x-auth-token` alongside every request.
