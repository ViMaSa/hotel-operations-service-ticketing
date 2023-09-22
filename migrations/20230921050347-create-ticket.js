"use strict";

/** @type {import('sequelize-cli').Migration} **/
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tickets", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      priority: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      guest_first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      guest_last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      room_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      check_in_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ticket_request_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Open",
      },
      createdAt: {
        // Sequelize automatically manages this field if timestamps are enabled
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        // Sequelize automatically manages this field if timestamps are enabled
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("tickets");
  },
};
