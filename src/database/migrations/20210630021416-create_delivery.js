"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Deliveries", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Customers", key: "id" },
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
      },
      motoboyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Motoboys", key: "id" },
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
      },
      associateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Associates", key: "id" },
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Deliveries");
  },
};
