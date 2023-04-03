"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.BoardList, {
        foreignKey: "move_to",
        as: "to",
      });
      History.belongsTo(models.BoardList, {
        foreignKey: "move_from",
        as: "from",
      });
      // {
      //   foreignKey: "move_to",
      //   as: "move_to",
      //   onDelete: "NO ACTION",
      //   onUpdate: "NO ACTION",
      // }
    }
  }
  History.init(
    {
      card_id: DataTypes.INTEGER,
      move_from: DataTypes.INTEGER,
      move_to: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "History",
    }
  );
  return History;
};
