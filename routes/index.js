const router = require("express").Router();
const homeRoute = require("./modules/home");
const usersRoutes = require("./modules/users");
const todosRoutes = require("./modules/todos");
const authCheck = require("../middleware/authCheck");

router.use("/users", usersRoutes);
router.use("/todos", authCheck, todosRoutes);
router.use("/", authCheck, homeRoute);

module.exports = router;
