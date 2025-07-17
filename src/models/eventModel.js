import pool from "../config/db.js";

//EVENT SERVICES
export const createEventService = async (title, location, capacity, date) => {
  const result = pool.query(
    "INSERT INTO events (title,location,capacity, date) VALUES ($1,$2,$3) RETURNING *",
    [title, location, capacity, date]
  );
  return result.rows[0];
};

export const getAllEventService = async () => {
  const result = await pool.query("SELECT * FROM events");
  return result.rows;
};

export const updateEventService = async (
  id,
  title,
  location,
  capacity,
  date
) => {
  const result = await pool.query(
    "UPDATE events SET title=$1, location=$2, capacity=$3  WHERE eventid=$4",
    [title, location, capacity, date, id]
  );
  return result.rows[0];
};

export const getRegisteredUsersService = async (eventid) => {
  const result = await pool.query(
    `SELECT e.*,
	u.userid as registered_userid,
	u.name as registered_name,
	u.email as registered_email,
	r.registration_date as registered_date
	FROM events e
	LEFT JOIN
	event_registration r ON e.eventid = r.eventid
	LEFT JOIN
	users u ON r.userid = u.userid
  WHERE eventid=$1`,
    [eventid]
  );
  return result.rows;
};

export const DeleteEventService = async (id) => {
  const result = pool.query("DELETE FROM events WHERE eventid=$2 RETURNING *", [
    id,
  ]);
  return result.rows[0];
};

//REGISTRATION SERVICES
export const createRegistrationService = async (userid, eventid) => {
  const result = await pool.query(
    "INSERT INTO event_registration (userid, eventid) VALUES ($1,$2) RETURNING *",
    [userid, eventid]
  );
  return result.rows[0];
};

export const deleteRegistrationService = async (userid, eventid) => {
  const result = await pool.query(
    "DELETE FROM event_registration WHERE userid=$1 AND eventid=$2 RETURNING *"[
      (userid, eventid)
    ]
  );
  return result.rows[0];
};

//Upcoming Events Services

export const upcomingEventsService = async () => {
  const result = await pool.query(
    `SELECT * FROM events WHERE event_date > CURRENT_DATE`
  );
  return result.rows;
};

//Event Stats Service
export const eventStatsService = async (eventid) => {
  const totalRegistrations = await pool.query(
    `SELECT count(*) FROM events WHERE eventid=$1 `,
    [eventid]
  );
  const capacity = await pool.query(
    "SELECT capacity FROM events where eventid=$1",
    [eventid]
  );

  return {
    TotalRegistrations: totalRegistrations,
    RemainingCapacity: capacity - totalRegistrations,
    PercentageCapacity: ((capacity - totalRegistrations) / capacity) * 100,
  };
};

//CHECKS
export const checkRegistration = async (userid, eventid) => {
  const result = await pool.query(
    "SELECT * FROM event_registration WHERE userid = $1 AND eventid = $2",
    [userid, eventid]
  );
  return result.rows.lenghth > 0;
};

export const checkEventisFull = async (eventid) => {
  const event_registrations = await pool.query(
    "SELECT COUNT(*) FROM event_registration WHERE eventid = $1 ",
    [eventid]
  );
  const event_capacity = pool.query(
    "SELECT capacity FROM events WHERE eventid = $1 ",
    [eventid]
  );
  return event_registrations <= event_capacity;
};

export const checkDate = async (eventid) => {
  const result = await pool.query(
    `SELECT
        CASE 
            WHEN event_date > CURRENT_DATE THEN TRUE 
            ELSE FALSE 
        END 
            FROM events 
            WHERE eventid = $1`,
    [eventid]
  );
  return result;
};
