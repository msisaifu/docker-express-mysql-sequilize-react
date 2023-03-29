"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Token.init(
    {
      access_token: DataTypes.STRING,
      refresh_token: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      user_agent: DataTypes.STRING,
      active: DataTypes.TINYINT(1),
    },
    {
      sequelize,
      modelName: "Token",
      underscored: true,
    }
  );
  return Token;
};
