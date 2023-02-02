const express = require("express");
const routes = require("./routes/index");
const session = require("express-session");
const usePassport = require("./config/passport");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const app = express();
const PORT = 3000;

app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false,
    saveUninitialized: false,
  })
);
usePassport(app);

app.use(routes);

app.listen(PORT, () => {
  console.log(`App is listening to http://localhost:${PORT}`);
});
