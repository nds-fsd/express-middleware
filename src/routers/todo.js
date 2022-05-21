const express = require('express');

//importamos el fichero con los datos que necesita nuestro Router
const {todos} = require('../data/index');


/*

Un Router de express es como un switch case de Javascript. Simplemente redirige las peticiones hacia la ruta correcta, si esta existe.

En una aplicacion de express podemos tener tantos Routers como queramos/sean necesarios. Lo habitual cuando se implementa una API REST
es tener un Router por cada "recurso" de la api. Si imaginamos una aplicacion que tiene 3 recursos (User, Todo, Category), deberiamos
tener 3 routers diferentes: userRouter, todoRouter y categoryRouter.
*/

const todoRouter = express.Router();

todoRouter.get('/todo', (req, res) => {
  return res.json(todos); 
});

todoRouter.post('/todo', (req, res) => {
  const newTodo = {
    id: todos.length,
    ...req.body
  }

  todos.push(newTodo);
  return res.json(todos);

});


/*
En este endpoint, el path contiene una variable llamada id. La syntaxis que utiliza express para estos casos es el simbolo :

Una variable en un path, significa que express recoge el valor que va justo después de /todo/ y lo guarda en una variable dentro del objeto "req"
con el mismo nombre que hemos utilizado en el path.

Ejemplo:

Si con Insomnia o Postman hicisemos una peticion GET a la ruta /todo/12, está será dirigida directamente hasta este endpoint.


*/
todoRouter.get('/todo/:id',  (req, res) => {

  //recogemos el valor de la variable del path llamada "id" y lo transormamos a un numero (todos nuestros ids son numericos).
  //cualquier valor que recogemos de req.params será siempre un String. Por eso lo convertimos a numero.
  const id = parseInt(req.params.id);

  //comprobamos que haya realmente un valor
  if(id){
    const todo = todos.find(t => t.id === id); //buscamos con el metodo find() dentro de nuestro Array de Todos aquel que coincide con la variable id.
    //comprobamos que haya encontrado el TODO correspondiente. Si no lo ha encontrado, la variable todo será "undefined" y por lo tanto al evalualra en el if
    // dará false, haciendo que no entre a la siguiente linea.
    if(todo){ 
      return res.json(todo); //devolvemos el TODO encontrado.
    }
  }

  //Si no hemos econtrado un TODO o no nos han pasado un id en la ruta, devolvemos un 404.
  return res.status(404).send();
});


// MISSING '/todo/:id' PATCH

// MISSING '/todo/:id' DELETE


//exportamos el router para poder 'usarlo' en nuestra app.
module.exports = todoRouter;