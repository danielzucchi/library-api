# and-library-nodejs

Application to manage AND Digital's books in NodeJS

# 1.0 Tech stack

### Core

• NodeJS

• Express.js

• Mongoose

• MongoDB

• Docker (optional)

### Package Manager

• npm

### Unit testing

• Jest

### Integration/end-to-end testing

• Jest

• Supertest

# 2.0 Build

## 2.1 run the mongo DB

Can be run either through docker image or via local mongo db installation.

In the server.js uncomment the chosen connection option.

If using local database, uncomment this:

```js
mongoose.connect(
  "mongodb://localhost/library",
  { useNewUrlParser: true }
);
```

If using Docker image database, uncomment this:

```js
mongoose.connect(
  "mongodb://root:password@localhost:27017/library?authSource=admin",
  { useNewUrlParser: true }
);
```

### 2.1.1 Docker image

• Run the image :

```
docker run -d --name docker-mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=password mongo
```

### 2.1.2 Local installation

• MongoDB will need to be installed locally, to do so use information at https://docs.mongodb.com/manual/installation/
• Run Mongo daemon in terminal using `mongod`

## 2.2 Install and Run

• Install npm dependencies
`npm install`

• Run app
`npm start`

# 3.0 API

## Update Book

Update the fields of any existing book.

**URL** : `/library/books/:id`

**Method** : `PUT`

### Success Response

**Code** : `200 OK`

**Content examples**

For a book where you are updating the author field. You will receieve the response matching the body passed into the request

```json
{
  "isbn": "ISBN1234",
  "title": "Title",
  "author": "newAuthor",
  "edition": 1,
  "numOfCopies": 1,
  "about": "About",
  "numOfPages": 500,
  "illustrator": "Illustrator",
  "copyrightYear": 1990,
  "editor": "Editor",
  "genre": "Genre",
  "publisher": "Publisher",
  "coverImage": "Cover Image",
  "active": true
}
```
