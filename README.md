# Assignment 1 HTBBF

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.3.

The backend of this project was generated with [nodejs](https://nodejs.org/en/) version 14.15.4, [express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/).

## Development Team

- Kiana Cox
- Callum Friend
- Phil Walker

## Application Summary

### Dependencies (Windows)

Ensure you have the latest LTS version of NodeJS installed - https://nodejs.org/en/

Open an administrator command prompt and run the command `npm install -g @angular/cli@latest`

**Follow the instructions below to install MongoDB:**

1. Download the MongoDB Community installer from https://www.mongodb.com/try/download/community?tck=docs_server
   - In the Version dropdown, select the version of MongoDB to download
   - In the Platform dropdown, select Windows
   - In the Package dropdown, select msi
   - Click Download
2. Run the MongoDB installer
   - Go to the directory where you downloaded the MongoDB installer (.msi file). By default, this is your Downloads directory
   - Double-click the .msi file
3. Follow the MongoDB Community Edition installation wizard.
   - Choose Setup Type - Complete - Click "Next >"
   - Check the "Install MongoD as a service" checkbox and accept the defaults - Click "Next >"
   - Install MongoDB Compass (optional) Click "Next >"
4. Click "Install"
5. Download the MongoDB tools from https://www.mongodb.com/try/download/database-tools?tck=docs_databasetools
6.  Go to the directory where you downloaded the MongoDB tools (.zip file). By default, this is your Downloads directory
7.  Right click the .zip file and click "Extract All" then click "Extract".

_Taken from - (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)_

**Follow the instructions below to import a basic database:**

1. Clone the repository from https://github.com/kCox96/hasthebeastbeenfed
2. Navigate to the root level of the cloned repository (i.e. C:\Users\username\code\hasthebeastbeenfed) in an administrator command prompt
3. Run the below command to import the cats collection to a database named htbbf (Replacing the username with your own username)

   `C:\Users\username\Downloads\mongodb-database-tools-windows-x86_64-100.3.0\bin\mongoimport.exe --db=htbbf --collection=cats --jsonArray "api\dbImport\importCats.json"`

4. Run the below command to import the users collection to a database named htbbf (Replacing the username with your own username)

   `C:\Users\username\Downloads\mongodb-database-tools-windows-x86_64-100.3.0\bin\mongoimport.exe --db=htbbf --collection=users --jsonArray "api\dbImport\importUsers.json"`

### Dependencies (Mac OS X)

Ensure you have the latest LTS version of NodeJS installed - https://nodejs.org/en/

Open a terminal and run the command `npm install -g @angular/cli`

**Follow the instructions below to install MongoDB:**

1. Open a terminal instance
2. Run the command xcode-select --install
3. Run the command brew tap mongodb/brew
4. Run the command brew install mongodb-community@4.4
5. Finally run the command brew services start mongodb-community@4.4 to start MongoDB

Taken from - (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

**Follow the instructions below to import a basic database:**

1. Clone the repository from https://github.com/kCox96/hasthebeastbeenfed
2. Navigate to the root level of the cloned repository (i.e. /Users/username/code/hasthebeastbeenfed) in a terminal
3. Run the below command to import the cats collection to a database named htbbf

   `mongoimport --db 'htbbf' --collection 'cats' --jsonArray './api/dbImport/importCats.json'`

4. Run the below command to import the users collection to a database named htbbf

   `mongoimport --db 'htbbf' --collection 'users' --jsonArray './api/dbImport/importUsers.json'`

## Running the app

1. Open an administrator command prompt (Windows)/terminal (Mac OS X) and navigate to the folder where you cloned the repository to (i.e. C:\Users\Phil\Downloads\hasthebeastbeenfed).
2. Run `npm install` at the root level to install all the needed dependencies.
3. Run `ng serve` to run the Angular frontend.
4. Open another administrator command prompt (Windows)/terminal (Mac OS X) and navigate to the folder where you cloned the repository to (i.e. C:\Users\username\Downloads\hasthebeastbeenfed).
5. Run `npm start` for the node backend.
6. Open a web browser (Google Chrome is recommended) and navigate to `http://localhost:4200/` for the home page.

## Technology Stack

- Angular 11: Front end framework. Business logic is handled within the framework using Typescript.
- NodeJS and Express: Web server, routing, API logic, controllers, authentication and database connection.
- MongoDB: Data retention.
- Slack: Team communications.
- Github: Version control.
- Visual Studio Code: Integrated Development Environment

## Work Approach

- Agile
- Merge reviews to prevent breaking main
- Weekly reviews

## Security Points

`Login` - This is handled directly in the SPA using a login screen route. Ideally we would provide a seperately hosted login page using a third party provider, so that the password is never directly handled by the application code. However, this is a prototype and third party authentication is a feature that could be added in the future.

`JWT` - We make use of JWTs for an extra layer of security. No user can access the backend without a token and each token generated has an expiration date. After a certain point, a user's token will expire and they will be prompted to login again. Tokens are generated on each user login and cleared after each logout. In this prototype, we use the http response to return the JWT to the user. This approach has an advantage over storing the JWT in a cookie, as the application is not vulnerable to XSRF. However, the JWT could become readable by an attacker in the case of a successful script injection attack.

`Local Storage` - In this prototype, token data is stored in local storage. This has the advantage of clearing all data when the browser is closed. However, this is still not best practice and in the actual application this is not how we would be handling the token.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
