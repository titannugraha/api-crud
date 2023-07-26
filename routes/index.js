const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.json({
    message: "Home Page Server is Up !",
  });
});

const productRoutes = require('./productRoutes')
const userRoutes = require('./userRoutes')

routes.use('/api/products',productRoutes)
routes.use('/api/users',userRoutes)


module.exports = routes;
