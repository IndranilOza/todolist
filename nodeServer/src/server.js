const app = require("./app");
const { mysqlPool } = require("./config/db");

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
