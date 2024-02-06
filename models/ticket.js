const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Ticket extends Model {}

Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    guest_first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guest_last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    check_in_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ticket_request_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    requestor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requestorId: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Open",
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "ticket",
  },
);

module.exports = Ticket;
