"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Card.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      position: DataTypes.INTEGER,
      list_id: DataTypes.INTEGER,
      expiray_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Card",
      underscored: true,
    }
  );
  return Card;
};
