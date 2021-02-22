# HTBBF

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.3.

The backend of this project was generated with [nodejs]() version 14.15.4, [express]() and [MongoDB]().

## Launching the App

Run `npm install` at the root level to install all the needed dependencies.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm start` for the node backend.

## User Authentication

## Security Points

`Login` - This is handled directly in the SPA using a login screen route. Ideally we would provide a seperately hosted login page using a third party provider, so that the password is never directly handled by the application code. However, this is a prototype and third party authentication is a feature that could be added in the future.

`JWT` - We make use of JWTs for an extra layer of security. No user can access the backend without a token and each token generated has an expiration date. After a certain point, a user's token will expire and they will be prompted to login again. Tokens are generated on each user login and cleared after each logout. In this prototype, we use the http response to return the JWT to the user. This approach has an advantage over storing the JWT in a cookie, as the appliaction is not vulnerable to XSRF. However, the JWT could become readable by an attacker in the case of a successful script injection attack.

`Local Storage` - In this prototype, token data is stored in local storage. This has the advantage of clearing all data when the browser is closed. However, this is still not best practice and in the actual application this is not how we would be handling the token.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
