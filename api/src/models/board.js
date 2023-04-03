"use strict";
const { Model } = require("sequelize");
// const { BoardList } = require("./index");
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Board.hasMany(models.BoardList, {
        foreignKey: "board_id",
        as: "board_lists",
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
      });
    }
  }
  Board.init(
    {
      name: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Board",
      underscored: true,
    }
  );

  return Board;
};
