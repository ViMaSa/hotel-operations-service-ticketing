const Ticket = require("../models/ticket.js");

exports.getAllTickets = async (req, res, next) => {
  try {
    let tickets;

    if(req.query.room_number) {
      tickets = await Ticket.findAll({
        where: {
          room_number: req.query.room_number
        }
      })
    }
    else {
      tickets = await Ticket.findAll();
    }
    res.status(200).json(tickets);
  } catch (err) {
    next(err);
  }
};

exports.getTicketById = async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (err) {
    next(err);
  }
};

exports.createTicket = async (req, res, next) => {
  try {
    req.body.requestorId = req.user.userId;

    if (Date(req.body.check_in_date) > Date(req.body.check_out_date)) {
      throw new Error("Checkout date must be after check-in date.");
    }

    const ticket = await Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
};

exports.updateTicket = async (req, res, next) => {
  try {
    if (Date(req.body.check_in_date) > Date(req.body.check_out_date)) {
      throw new Error("Checkout date must be after check-in date.");
    }

    const ticket = await Ticket.update(req.body, {
      where: { id: req.params.id },
    });
    if (!ticket[0]) {
      // Sequelize update method returns an array with number of affected rows as the first item
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ message: "Ticket updated" });
  } catch (err) {
    next(err);
  }
};

exports.deleteTicket = async (req, res, next) => {
  try {
    const result = await Ticket.destroy({ where: { id: req.params.id } });
    if (!result) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ message: "Ticket deleted" });
  } catch (err) {
    next(err);
  }
};
