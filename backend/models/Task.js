const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Sync model with database
sequelize.sync()
  .then(() => console.log("✅ Task table created"))
  .catch(err => console.log("❌ Table creation failed:", err));

module.exports = Task;

