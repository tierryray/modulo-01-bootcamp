const express = require("express");

const server = express();

//  Query Params = ?teste=1 => req.query
//  Route Params = /user/1 => : / req.params
//  Request Body = { "name": "Diego", "email": "tierry.ray@gmail.com" }

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  return res.json({ message: `Buscando o usuário ${id}` });
});

server.listen(3000);
