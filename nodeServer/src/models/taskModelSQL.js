module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      taskId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      taskName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      taskDetails: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      activeStatus: {
        type: DataTypes.ENUM("todo", "done", "in progress"),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("personal", "work", "social", "study"),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "tasks",
    }
  );

  return Task;
};
