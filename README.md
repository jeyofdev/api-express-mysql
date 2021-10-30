# Api Express Mysql

## Features

- ![NodeJS](https://img.shields.io/badge/NODE.JS-black?style=plastic&logo=node.js)
- ![Express.js](https://img.shields.io/badge/EXPRESS.JS-black?style=plastic&logo=express)
- ![Mysql](https://img.shields.io/badge/MYSQL-black?style=plastic&logo=mysql)
- ![JWT](https://img.shields.io/badge/JWT-black?style=plastic&logo=JSON%20web%20tokens)
- ![EsLint](https://img.shields.io/badge/ESLint-black?style=plastic&logo=eslint)
- ![TypeScript](https://img.shields.io/badge/typescript-black?style=plastic&logo=typescript)

## Getting starting

### Tools

Check that [`Nodejs`](https://nodejs.org/en/download/) is installed :

```sh
$ node -v
```

### Install all dependencies

Install all dependencies :

```sh
$ yarn
$ npm install
```

### Environment

Create .env file based on .env.example and modify variables if needed.

```sh
# General settings
PORT=your_port

# Database settings
DB_HOST=your_database_host
DB_USER=your_database_username
DB_PASS=your_database_password
DB_NAME=database_name

# PRIVATE KEYS
PRIVATE_KEY=your_super_private_key
```

### Scripts

Execute eslint :

```sh
$ yarn lint
```

Compile the TypeScript files:

```sh
$ yarn build
$ yarn build:watch
```

Start development server :

```sh
$ yarn dev
```

Start production server :

```sh
$ yarn start
```

### Routes

#### GET

Get all movies or users

```
 GET /api/movies
 GET /api/users
```

Get all movies based on a filter

```
 GET /api/movies?type=Sci-Fi&max_year=2000
```

Get movie or user by id

```
 GET /api/movies/:id
 GET /api/users/:id
```

#### POST

Login user

```
POST /api/auth/login
```

Example body :

```javascript
{
    "email": "john.doe@gmail.com",
    "password": "12345"
}
```

Post new movie or new user

```
POST /api/movies/
POST /api/users/
```

Example body for movie :

```javascript
{
    "title": "Jurassic Park",
    "director": "Steven Spielberg",
    "year": "1993",
    "rating": 8,
    "duration": 127,
    "type": "Adventure"
}
```

Example body for user :

```javascript
{
    "email": "john.doe@example.com",
    "firstname": "John",
    "lastname": "Doe",
    "city": "New-york",
    "password": "12345"
}
```

#### PUT

Update movie or user by id

```
PUT /api/movies/:id
PUT /api/users/:id
```

Example body for movie :

```javascript
{
    "title": "The Godfather"
}
```

or

```javascript
{
    "title": "The Godfather",
    "director": "Francis Ford Coppola",
    "year": "1972"
}
```

or

```javascript
{
    "title": "The Godfather",
    "director": "Francis Ford Coppola",
    "year": "1972",
    "rating": 9,
    "duration": 175,
    "type": "Drama"
}
```

Etc...

Example body for user :

```javascript
{
    "email": "jane.doe@example.com"
}
```

or

```javascript
{
    "firstname": "Jane",
    "city": "London"
}
```

or

```javascript
{
    "email": "jane.doe@example.com",
    "firstname": "Jane",
    "lastname": "Doe",
    "city": "London",
    "password": "12345"
}
```

Etc...

#### DELETE

Delete movie or user by id

```
DELETE /api/movies/
DELETE /api/users/
```
