'use strict';
module.exports = (sequelize, DataTypes) => {
  var Lesson = sequelize.define('Lesson', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    complete: DataTypes.BOOLEAN
  }, {});
  Lesson.associate = function(models) {
    Lesson.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    // associations can be defined here
  };
  return Lesson;
};