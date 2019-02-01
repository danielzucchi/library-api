# and-library-nodejs

Application to manage books in NodeJS


# 1.0 Tech stack

### Core

* NodeJS

* Express.js

* Mongoose

* MongoDB

* Docker (optional)

### Package Manager

* npm

### Unit Testing

* Jest

### Integration/end-to-end testing

* Jest

* Supertest

# 2.0 Setup

## 2.1 Run Mongo DB

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

### 2.1.1 Docker Image

* Run the image :

```
docker run -d --name docker-mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=password mongo
```

### 2.1.2 Local Installation

* MongoDB will need to be installed locally, to do so use information at https://docs.mongodb.com/manual/installation/

* Run Mongo daemon in terminal using `mongod`

## 2.2 Install and Run

* Install npm dependencies
`npm install`

* Run app
`npm start`

# 3.0 Testing

For end to end tests make sure the database is running

## Run tests in terminal

* Run all tests - ```npm test```
* Run test coverage - ```npm test -- --coverage```

# 4.0 API

[Run the server](#22-Install-and-Run) and navigate to the following url:

[`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)
