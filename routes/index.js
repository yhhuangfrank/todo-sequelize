const router = require("express").Router();
const homeRoute = require("./modules/home");
const usersRoutes = require("./modules/users");
const todosRoutes = require("./modules/todos");

router.use("/users", usersRoutes);
router.use("/todos", todosRoutes);
router.use("/", homeRoute);

module.exports = router;
