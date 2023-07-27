const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.json({
    message: "Home Page Server is Up !",
  });
});

const productRoutes = require('./productRoutes')
const userRoutes = require('./userRoutes')

routes.use('/products',productRoutes)
routes.use('/users',userRoutes)


module.exports = routes;
