import pool from "../config/db.js";

const createEventsTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS events(
    eventid SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    date_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    Location VARCHAR(255),
     event_date DATE,
    capacity SMALLINT CHECK (capacity >=0 AND capacity <=1000)
) `;
  try {
    pool.query(queryText);
    console.log("Events Table has been created(if not exists)");
  } catch (error) {
    console.log("Error creating Events Table : ", error);
  }
};

const createRegistrationTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS event_registration(
    registrationid SERIAL PRIMARY KEY,
    userID INT NOT NULL,
    eventID INT NOT NULL,
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_user
        FOREIGN KEY (userid)
        REFERENCES users(userid)
        ON DELETE CASCADE,
    CONSTRAINT fk_event
        FOREIGN KEY (eventid)
        REFERENCES events(eventid)
        ON DELETE CASCADE
);`;
  try {
    await pool.query(queryText);
    console.log("Registration Table has been created(if not exists)");
  } catch (error) {
    console.log("Error creating the Registration Table :", error);
  }
};

export { createEventsTable, createRegistrationTable };
