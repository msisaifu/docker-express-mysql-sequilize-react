"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Histories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      card_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Cards",
          },
          key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
        allowNull: false,
      },
      move_from: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "BoardLists",
          },
          key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
        allowNull: false,
      },
      move_to: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "BoardLists",
          },
          key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Histories");
  },
};
