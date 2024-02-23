'use strict';
const { faker } = require('@faker-js/faker');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const bulkTickets = [];
    const requestTypesArr = ["House Keeping", "Dinning Service", "Facilities", "Vendor"];

    for(let i = 0; i < 15; i++) {
      const ticket = {};
      ticket.priority = Math.floor((Math.random() * 5) + 1);
      ticket.guest_first_name = faker.person.firstName();
      ticket.guest_last_name = faker.person.lastName();
      ticket.room_number = ((faker.number.int({ min: 2, max:30 }) * 1000)
        + (faker.number.int({ min:1, max:3 }) * 100)
        + faker.number.int(30));
      ticket.check_in_date = faker.date.soon({ days: 30 });

      let min_check_out_date = new Date(ticket.check_in_date);
      min_check_out_date.setDate(min_check_out_date.getDate() + 1)

      ticket.check_out_date = faker.date.soon({ days: 7, refDate: min_check_out_date })
      ticket.ticket_request_type = requestTypesArr[faker.number.int({ min:0, max:3 })];
      ticket.description = faker.lorem.sentences();
      ticket.requestor = faker.person.fullName();

      bulkTickets.push(ticket);
    }

    await queryInterface.bulkInsert('tickets', bulkTickets);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tickets', null, {});
  }
};
