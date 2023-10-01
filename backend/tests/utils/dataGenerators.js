const { faker } = require("@faker-js/faker");

const generateTicketData = (overrides ={}) => {
  defaultData = {
    priority: faker.number.int({ min: 1, max: 5 }),
    guest_first_name: faker.person.firstName(),
    guest_last_name: faker.person.lastName(),
    room_number: faker.number.int({ min: 1000, max: 9999 }),
    check_in_date: faker.date.recent({ days: 15 }).toISOString().split("T")[0],
    ticket_request_type: faker.helpers.arrayElement(["Maintenance", "Guest Request", "House Keeping"]),
    description: faker.lorem.sentence(),
    status: faker.helpers.arrayElement(["Pending", "Started", "Stopped", "Completed", "Voided"])
  };

  return {
    ...defaultData,
    ...overrides
  };
};

const inavlidId = -1;

module.exports = {
  generateTicketData,
  inavlidId
};
