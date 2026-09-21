require("dotenv").config();
const app = require("./src/app");
const sequelize = require("./src/config/db");

// Register all models so Sequelize knows about them before sync()
require("./src/models/userModels");
require("./src/models/linkModels");
require("./src/models/careModels");
require("./src/models/healthModels");
require("./src/models/reportModels");

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log(`Database connected (${process.env.DB_DIALECT || "sqlite"})`);

    // In dev this creates/updates tables automatically.
    // In production, use real migrations instead of sync({ alter: true }).
    await sequelize.sync({ alter: process.env.DB_DIALECT !== "mssql" });
    console.log("Models synced");

    app.listen(PORT, () => {
      console.log(`MindGuard API listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
