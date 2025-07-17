# Event Management API

This project provides a robust RESTful API for managing events, user registrations, and retrieving event-related statistics. It is designed to offer clean routing, efficient data handling, and scalable architecture.

---

## Technologies Used

- **Node.js**: JavaScript runtime built on Chrome's V8 engine.
- **Express.js**: Fast, unopinionated web framework for Node.js.
- **CORS**: Enables cross-origin requests.
- **PostgreSQL**: Powerful open-source relational database.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL
- Express.js
- Cors
- Nodemon

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/event-management-api.git
cd event-management-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file:

```env
DB_USER=username
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dbName
PORT=3000
```

4. **Start the server**

```bash
npm run dev
```

The server will run on `http://localhost:3000`.

---

## API Endpoints

### Event Routes

| Method | Endpoint             | Description                           |
|--------|----------------------|---------------------------------------|
| POST   | `/event`             | Create a new event                    |
| GET    | `/event`             | Retrieve all events                   |
| PUT    | `/updateEvent/:id`   | Update an event by ID                 |
| DELETE | `/deleteEvent`       | Delete an event                       |

### User Routes

| Method | Endpoint           | Description                         |
|--------|--------------------|-------------------------------------|
| POST   | `/user`            | Create a new user                   |
| GET    | `/user`            | Retrieve all users                  |
| GET    | `/user/:id`        | Retrieve a user by ID               |
| GET    | `/registeredUsers` | Retrieve users registered for event |

### Registration Routes

| Method | Endpoint              | Description                             |
|--------|-----------------------|-----------------------------------------|
| POST   | `/createRegistration` | Register a user for an event            |
| DELETE | `/deleteRegistration` | Delete a user's event registration      |

### Upcoming Events

| Method | Endpoint           | Description                        |
|--------|--------------------|------------------------------------|
| GET    | `/upcomingEvents`  | Retrieve a list of future events  |

### Event Statistics

| Method | Endpoint        | Description                          |
|--------|-----------------|--------------------------------------|
| GET    | `/eventStats`   | Retrieve statistics about all events |

---

## License

[MIT License](https://github.com/AkkiKbl/event-management/blob/main/LICENSE)


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

---

## Contact

For questions, suggestions, or support, feel free to reach out:

**Akshay Kubal**    
 [LinkedIn](https://www.linkedin.com/in/akshay-kubal/)

---
