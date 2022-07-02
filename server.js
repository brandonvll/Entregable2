const { app } = require("./app");
//utils
const { db, DataTypes } = require("./utils/database.util");

db.authenticate()
  .then(() => console.log("DataBase authenticate"))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log(err));

//listen to server
app.listen(4000, () => {
  console.log("Express app running!");
});
