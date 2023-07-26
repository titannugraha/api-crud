const userRoute = require("express").Router();
const { UserController } = require("../controllers/");
const { auth } = require("../middlewares/auth");

userRoute.get("/", UserController.getAll);
userRoute.post("/login", UserController.login);
userRoute.post("/register", UserController.register);
userRoute.get("/user", auth, UserController.getTokenUser);

module.exports = userRoute;
