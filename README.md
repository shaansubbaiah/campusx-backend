> ### REST API implemented using NodeJS + MySQL


# Getting started
To get the Node server running locally:
- Clone this repo
- `npm install` to install all required dependencies
- Install MySQL and edit the database config at _src/config/db.config.js_
- `npm start` to start the local server

>`node src/index.js c` or `npm startc` to delete all tables before running.
>`node src/server.js` or `npm start` to continue with existing tables before running.


# Code Overview


## Dependencies
- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
MongoDB data to javascript 
- [sequelize](https://github.com/sequelize/sequelize) - Modelling and handling SQL commands
- [mysql2](https://github.com/sidorares/node-mysql2) - MySQL client for NodeJS


## Application Structure
- `server.js` - The entry point to the application. Defines our express server and connects it to MySQL using Sequelize. It also requires the routes and models that will be used.
- `config/` - Contains configuration for the database.
- `routes/` - Contains the route definitions for our API.
- `models/` - Contains the schema definitions for our Sequelize models.
- `controllers/` - Contains contoller functions as specified in the routes.

# API Spec

## JSON Objects returned by API:
**api/users/1** - returns user json of specified **id**
```json
{
    "createdAt": "2020-04-23T10:14:51.625Z",
    "email": "a@b.com",
    "gtoken": "1433981953",
    "id": 1,
    "name": "Chuck Norris",
    "phone": "1234567890",
    "updatedAt": "2020-04-23T10:14:51.625Z"
}
```
**api/users** - returns array of **all users**
```json
[
    {
        "createdAt": "2020-04-23T10:14:51.000Z",
        "email": "a@b.com",
        "gtoken": "1433981953",
        "id": 1,
        "name": "Chuck Norris",
        "phone": 1234567890,
        "updatedAt": "2020-04-23T10:14:51.000Z"
    },
    {
        "createdAt": "2020-04-23T10:16:20.000Z",
        "email": "c@m.com",
        "gtoken": "1654732678",
        "id": 2,
        "name": "Wilbur A",
        "phone": 1234588888,
        "updatedAt": "2020-04-23T10:16:20.000Z"
    }
]
```
**api/things/1** - returns user json of specified **id**
```json
{
    "createdAt": "2020-04-23T10:14:51.625Z",
    "donation": true,
    "email": "a@b.com",
    "gtoken": "1433981953",
    "id": 1,
    "name": "Chuck Norris",
    "phone": "1234567890",
    "updatedAt": "2020-04-23T10:14:51.625Z"
}
```
**api/things** - returns array of **all things**
```json
[
    {
        "book": null,
        "branch": "ise",
        "createdAt": "2020-04-23T10:23:28.000Z",
        "donation": true,
        "drive": {
            "description": "nice link and stuff",
            "id": 1,
            "thingId": 2,
            "url": "www.drive.com"
        },
        "id": 2,
        "other": null,
        "sem": "V",
        "title": "5 sem notes and papers",
        "updatedAt": "2020-04-23T10:23:28.000Z",
        "userId": 1
    },
    {
        "book": {
            "author": "Arthur B",
            "id": 1,
            "image": "www.imgur.com/aseds.png",
            "publisher": "Small Penguin Publishers",
            "thingId": 1
        },
        "branch": "cse",
        "createdAt": "2020-04-23T10:22:57.000Z",
        "donation": true,
        "drive": null,
        "id": 1,
        "other": null,
        "sem": "III",
        "title": "C Programming",
        "updatedAt": "2020-04-23T10:22:57.000Z",
        "userId": 1
    }
]
```
Returns most recent things by default, provide `title`, `sem`, `branch` or `donation` query parameter to filter results

Filter by title:
`?title=CProgramming`

Filter by sem:
`?sem=4`

Filter by branch:
`?branch=CSE`

Filter donations:
`?donation=1`

Combine multiple filters:
`?sem=4&branch=CSE`
