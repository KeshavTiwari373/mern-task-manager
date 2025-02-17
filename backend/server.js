require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await sequelize.sync();  // Ensure tables exist
});

