# api-express-mysql

## Features

- ![NodeJS](https://img.shields.io/badge/NODE.JS-black?style=plastic&logo=node.js)
- ![Express.js](https://img.shields.io/badge/EXPRESS.JS-black?style=plastic&logo=express)
- ![Mysql](https://img.shields.io/badge/MYSQL-black?style=plastic&logo=mysql)

## Getting starting

### Tools

Check that [`Nodejs`](https://nodejs.org/en/download/) is installed :

```sh
$ node -v
```

### Install all dependencies

Install all dependencies :

```sh
$ yarn install
```

### Environment

Create .env file based on .env.example and modify variables if needed.

```sh
PORT=your_port
DB_HOST=your_host
DB_USER=your_username
DB_PASS=your_passwword
DB_NAME=your_database_name
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
