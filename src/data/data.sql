CREATE TABLE IF NOT EXISTS users(
    userid SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
) 

CREATE TABLE IF NOT EXISTS events(
    eventid SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    date_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    Location VARCHAR(255),
    capacity SMALLINT CHECK (capcity >=0 AND capacity <=1000)
) 

CREATE TABLE IF NOT EXISTS event_registration(
    registrationid SERIAL PRIMARY KEY,
    userID INT NOT NULL,
    eventID INT NOT NULL,
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    CONSTRAINT fk_user
        FOREIGN KEY (userID)
        REFERENCES users(userID)
        ON DELETE CASCADE,
    CONSTRAINT fk_event
        FOREIGN KEY (eventID)
        REFERENCES events(eventID)
        ON DELETE CASCADE,
)