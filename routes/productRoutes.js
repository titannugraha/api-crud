const productRoute = require("express").Router();
const { ProductController } = require("../controllers/");
const { admin } = require("../middlewares/auth");
const upload = require("../middlewares/multer");

productRoute.get("/", ProductController.getAll);
productRoute.post(
  "/add",
  upload("products").single("foto"),
  ProductController.add
);
productRoute.delete("/delete/:id", admin, ProductController.delete);
productRoute.put(
  "/update/:id",
  admin,
  upload("products").single("foto"),
  ProductController.update
);
productRoute.get("/:id", ProductController.getById);

module.exports = productRoute;
