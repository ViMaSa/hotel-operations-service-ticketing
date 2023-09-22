# Hotel Operations Service Ticketing System - PRD

## Introduction
The Hotel Operations Service Ticketing System aims to facilitate the hotel's operations team in managing and organizing service requests or issues reported by guests during their stay. This document outlines the system requirements, features, infrastructure decisions, architectural choices, and other key components.

## Objective
Provide an intuitive, scalable, and efficient system to manage guest service requests, improving the overall guest experience.

## Target Users
Hotel operations staff, including managers, receptionists, housekeepers, and maintenance teams.

## Requirements

### Infrastructure

- **Monorepository Approach**: All services, both frontend and backend, will reside in the same GitHub repository.

- **Backend**: Node.js with Express.js for the API layer.

- **Database**: PostgreSQL.
  - Managed and interacted with through Sequelize ORM.
  - Secure practices implemented by storing sensitive database connection details in a `.env` file.

- **Frontend**: Vue.js.

### Architecture

- **MVC Design**: Following the Model-View-Controller (MVC) design pattern for clarity, maintainability, and scalability.

### Models

#### Ticket Model
  - ID (auto-incremented primary key)
  - Priority (integer)
  - Guest First Name (string)
  - Guest Last Name (string)
  - Room Number (integer)
  - Check-in Date (date)
  - Ticket Request Type (string)
  - Description (text)
  - Status (string with default as "Open")

### Features

#### CRUD Operations for Tickets

- **Create**: Staff can register new tickets based on guest reports.
- **Read**: Ability to view a list of all tickets or view details of a specific ticket.
- **Update**: Modify ticket details as required.
- **Delete**: Remove tickets that are no longer needed or were created in error.

### Codebase Organization

- **Backend**:

  - `models/`: Contains Sequelize models, e.g., `Ticket.js`.
  - `controllers/`: Logic for handling different routes, e.g., `ticketController.js` for ticket-related operations.
  - `routes/`: Route definitions. An `index.js` aggregates all routes for easy import.
  - `config/`: Configuration files, including the Sequelize setup.

- **Frontend**:

  - Development details to be outlined once Vue.js setup and development begins.

### Future Considerations

- User authentication for staff members.
- Associating tickets with a guest model for better data structure.
- Implementing middleware for error handling and validation.
- Advanced features like notification systems for the status of tickets, analytics on ticket types, etc.

## Other Notes

- Considering future expansion and integration with other hotel systems.
- Ensuring responsive design to accommodate usage on tablets or mobile devices by the staff.
- Implementing best practices for code structure, database design, and UI/UX.
