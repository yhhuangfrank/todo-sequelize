const router = require("express").Router();
const homeRoute = require("./modules/home");
const authRoutes = require("./modules/auth");
const usersRoutes = require("./modules/users");
const todosRoutes = require("./modules/todos");
const authCheck = require("../middleware/authCheck");

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/todos", authCheck, todosRoutes);
router.use("/", authCheck, homeRoute);

module.exports = router;
