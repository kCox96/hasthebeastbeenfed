# Data Import Instructions

## MongoDB

### Mac OS X

**Pre-Requisites**

1. homebrew is installed
2. User has sufficient permissions to run administrator commands

**MongoDB Installation**

1. Open a terminal instance
2. Run the command `xcode-select --install`
3. Run the command `brew tap mongodb/brew`
4. Run the command `brew install mongodb-community@4.4`
5. Finally run the command `brew services start mongodb-community@4.4` to start MongoDB

_Taken from - (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)_

### Windows

**Pre-Requisites**

1. User has sufficient permissions to run administrator commands

**MongoDB Installation**

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

_Taken from - (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)_

## Data Import Instructions

### Mac OS X

1. Clone the repository from https://github.com/kCox96/hasthebeastbeenfed
2. Navigate to the root level of the cloned repository (i.e. /Users/username/code/hasthebeastbeenfed) in a terminal
3. Run the below command to import the cats collection to a database named htbbf

   `mongoimport --db 'htbbf' --collection 'cats' --jsonArray './api/dbImport/importCats.json'`

4. Run the below command to import the users collection to a database named htbbf

   `mongoimport --db 'htbbf' --collection 'users' --jsonArray './api/dbImport/importUsers.json'`

### Windows

1. Clone the repository from https://github.com/kCox96/hasthebeastbeenfed
2. Navigate to the root level of the cloned repository (i.e. C:\\Users\username\code\hasthebeastbeenfed) in an administrator command prompt
3. Run the below command to import the cats collection to a database named htbbf

   `mongoimport --db 'htbbf' --collection 'cats' --jsonArray '~\api\dbImport\importCats.json'`

4. Run the below command to import the users collection to a database named htbbf

   `mongoimport --db 'htbbf' --collection 'users' --jsonArray '~\api\dbImport\importUsers.json'`
