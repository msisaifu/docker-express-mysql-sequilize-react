"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BoardList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BoardList.hasMany(models.Card, {
        foreignKey: "list_id",
        as: "cards",
        onDelete: "CASCADE",
      });
      // define association here
    }
  }
  BoardList.init(
    {
      title: DataTypes.STRING,
      board_id: DataTypes.INTEGER,
      position: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BoardList",
      tableName: "BoardLists",
      underscored: true,
    }
  );
  return BoardList;
};
