const express = require('express');

//importamos el fichero con los datos que necesita nuestro Router
const {todos} = require('../data/index');
const { addDateMiddleware, validateTodo } = require('../middleware');


/*

Un Router de express es como un switch case de Javascript. Simplemente redirige las peticiones hacia la ruta correcta, si esta existe.

En una aplicacion de express podemos tener tantos Routers como queramos/sean necesarios. Lo habitual cuando se implementa una API REST
es tener un Router por cada "recurso" de la api. Si imaginamos una aplicacion que tiene 3 recursos (User, Todo, Category), deberiamos
tener 3 routers diferentes: userRouter, todoRouter y categoryRouter.
*/

const todoRouter = express.Router();

const products = [
  {
    name: 'Galletas con chocolate',
    price: 3
  },
  {
    name: 'Turron del güeno',
    price: 12
  },
  {
    name: 'Polvorones',
    price: 5
  },
];

todoRouter.get('/todo',
(req, res) => {
  res.send({message: 'hola', data: products});
});

todoRouter.post("/todo", validateTodo, (req, res) => {
  products.push(req.body);
  res.status(201).json(products);
});

todoRouter.patch("/todo/:id", (req, res) => {});

module.exports = todoRouter;
