const router = require("express").Router();
const db = require("../../models");
const Todo = db.Todo;

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findByPk(id);
    return res.render("detail", { todo: todo.toJSON() });
  } catch (error) {
    return console.log(error);
  }
});

module.exports = router;
