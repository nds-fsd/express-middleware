const express = require("express");


/*

Un Router de express es como un switch case de Javascript. Simplemente redirige las peticiones hacia la ruta correcta, si esta existe.

En una aplicacion de express podemos tener tantos Routers como queramos/sean necesarios. Lo habitual cuando se implementa una API REST
es tener un Router por cada "recurso" de la api. Si imaginamos una aplicacion que tiene 3 recursos (User, Todo, Category), deberiamos
tener 3 routers diferentes: userRouter, todoRouter y categoryRouter.
*/

const todoRouter = express.Router();

const products = [
  {
    id: 1,
    name: "Galletas con chocolate",
    price: 3,
    description:
      "Una galleta con pepitas de chocolate o con chispas de chocolate es una galleta de origen estadounidense con pepitas de chocolate como ingrediente distintivo. La receta tradicional combina una masa a base de mantequilla y azúcar moreno o blanco con pepitas de chocolate semidulces. Las variaciones incluyen recetas con otros tipos de chocolate o ingredientes adicionales, como nueces o avena.",
  },
  {
    id: 2,
    name: "Turron del güeno",
    price: 12,
    description:
      "El turrón (en francés, tourron; en italiano, torrone; en portugués, torrão, en catalán, torró) es una golosina proveniente del sudeste de Europa, compuesta generalmente de miel, azúcar y de clara de huevo revuelto con almendras tostadas y otros frutos secos, de forma rectangular o circular.",
  },
  {
    id: 3,
    name: "Polvorones",
    price: 5,
    description:
      "El polvorón es una torta, comúnmente pequeña, de harina, manteca y azúcar, cocida en horno fuerte. En la actualidad es un producto típico de la repostería navideña de España y de muchos lugares hispanohablantes que trae su denominación de deshacerse en polvo al comerlo.",
  },
];

todoRouter.get("/", (req, res) => {
  res.send({ message: "hola", data: products, jwtInfo: req.jwtPayload });
});

todoRouter.get("/:productId", (req, res) => {
  const id = req.params.productId;

  const product = products.filter((element) => element.id === Number(id));
  res.send(product[0]);
});

todoRouter.post("/", (req, res) => {
  products.push(req.body);
  res.status(201).json(products);
});

todoRouter.patch("/:id", (req, res) => {});

module.exports = todoRouter;
