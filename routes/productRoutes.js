const productRoute = require("express").Router();
const { ProductController } = require("../controllers/");
const {admin}  = require('../middlewares/auth')
const upload = require("../middlewares/multer");

productRoute.get("/", ProductController.getAll);
productRoute.post(
  "/add",
  upload("products").single("foto"),
  ProductController.add
);
productRoute.delete('/delete/:id',admin,ProductController.delete)
productRoute.put('/update/:id',admin,ProductController.update)

module.exports = productRoute;
