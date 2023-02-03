const router = require("express").Router();
const db = require("../../models");
const Todo = db.Todo;

router.get("/", async (req, res) => {
  try {
    const UserId = req.user.id;
    //! 將資料換轉換成單純的JS物件
    const todos = await Todo.findAll({
      raw: true,
      nest: true,
      where: { UserId },
    });
    return res.render("index", { todos });
  } catch (error) {
    return console.log(error);
  }
});

module.exports = router;
