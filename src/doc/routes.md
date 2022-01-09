# Routes

## GET

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

## POST

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

## PUT

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

## DELETE

Delete movie or user by id

```
DELETE /api/movies/
DELETE /api/users/
```
