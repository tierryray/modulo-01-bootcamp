//  Query Params = ?teste=1 => req.query
//  Route Params = /user/1 => : / req.params
//  Request Body = { "name": "Diego", "email": "tierry.ray@gmail.com" }

//  CRUD - Create, Read, Update, Delete

const express = require("express");

const server = express();

//  Middleware
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd("Request");
});

function checkUserNameExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }

  req.user = user;

  return next();
}

//  Adicionando plugin para usar JSON
server.use(express.json());

const users = ["Diego", "Robson", "Victor"];

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

server.post("/users", checkUserNameExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put(
  "/users/:index",
  checkUserNameExists,
  checkUserInArray,
  (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
  }
);

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
