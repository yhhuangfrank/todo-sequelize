const router = require("express").Router();
const db = require("../../models");
const Todo = db.Todo;

router.get("/new", (req, res) => {
  return res.render("new");
});

router.post("/new", async (req, res) => {
  const UserId = req.user.id;
  const { name } = req.body;
  await Todo.create({ name, UserId });
  return res.redirect("/");
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    return res.render("detail", { todo: todo.toJSON() });
  } catch (error) {
    return console.log(error);
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    return res.render("edit", { todo: todo.toJSON() });
  } catch (error) {
    return console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isDone } = req.body;
    await Todo.update({ name, isDone: isDone === "on" }, { where: { id } });
    return res.redirect(`/todos/${id}`);
  } catch (error) {
    return console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.destroy({ where: { id } });
    return res.redirect("/");
  } catch (error) {
    return console.log(error);
  }
});

module.exports = router;
