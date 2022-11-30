const express = require('express');

//importamos el fichero con los datos que necesita nuestro Router
const {todos} = require('../data/index');
const { addDateMiddleware, validateTodo } = require('../middleware');
const User = require('../mongo/schemas/user');


/*

Un Router de express es como un switch case de Javascript. Simplemente redirige las peticiones hacia la ruta correcta, si esta existe.

En una aplicacion de express podemos tener tantos Routers como queramos/sean necesarios. Lo habitual cuando se implementa una API REST
es tener un Router por cada "recurso" de la api. Si imaginamos una aplicacion que tiene 3 recursos (User, Todo, Category), deberiamos
tener 3 routers diferentes: userRouter, todoRouter y categoryRouter.
*/

const todoRouter = express.Router();

todoRouter.get('/', async (req, res) => {
  const allUsers = await User.find();
  res.json(allUsers);
})


todoRouter.get('/:id', async (req, res) => {
  const allUsers = await User.findById(req.params.id);
  res.json(allUsers);
})

todoRouter.post('/search', async (req, res) => {
  const allUsers = await User.find(req.body);
  res.json(allUsers);
})

todoRouter.patch('/:id', async (req, res) => {
  const allUsers = await User.findByIdAndUpdate(req.params.id, req.body);
  res.json(allUsers);
});

todoRouter.patch('/query/:name', async (req, res) => {
  const filter = {
      name: req.params.name
  };
  const allUsers = await User.findOneAndUpdate(filter, req.body);
  res.json(allUsers);
})

todoRouter.delete('/:id', async (req, res) => {
  const allUsers = await User.findByIdAndDelete(req.params.id);
  res.json(allUsers);
})

todoRouter.post("/", async(req, res) => {
  //recogemos el body de la request
  const body = req.body;

  console.log(body);

  const data = {
      name: body.name,
      email: body.email,
      lastName: body.lastName
  };

  //creamos una nueva instancia de user,
  const newUser = new User(data);

  //lo guardamos en mongo
  await newUser.save()

  //devolvemos respuesta
  res.json(newUser);
});

module.exports = todoRouter;
