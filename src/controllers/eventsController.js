import {
  checkEventisFull,
  checkRegistration,
  createEventService,
  createRegistrationService,
  DeleteEventService,
  deleteRegistrationService,
  eventStatsService,
  getAllEventService,
  getRegisteredUsersService,
  upcomingEventsService,
  updateEventService,
} from "../models/eventModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createEvent = async (req, res, next) => {
  const { title, location, capacity, date } = req.body;
  try {
    const result = await createEventService(title, location, capacity, date);
    handleResponse(res, 201, "User Created Successfully", result);
  } catch (err) {
    next(err);
  }
};

export const updateEvent = async (req, res, next) => {
  const id = req.params.id;
  const { title, location, capacity, date } = req.body;
  try {
    const result = await updateEventService(
      id,
      title,
      location,
      capacity,
      date
    );
    handleResponse(res, 201, "User Created Successfully", result);
  } catch (err) {
    next(err);
  }
};

export const getAllEvent = async (req, res, next) => {
  try {
    const result = await getAllEventService();
    handleResponse(res, 201, "User Created Successfully", result);
  } catch (err) {
    next(err);
  }
};

export const getRegisteredUsers = async (req, res, next) => {
  const eventid = req.body;

  try {
    const result = await getRegisteredUsersService(eventid);
    handleResponse(res, 201, "Data fetched Successfully", result);
  } catch (err) {
    next(err);
  }
};

export const deleteEvent = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await DeleteEventService(id);
    handleResponse(res, 201, "User Created Successfully", result);
  } catch (err) {
    next(err);
  }
};

//Registration Events
export const registerEvent = async (req, res, next) => {
  const { userid, eventid } = req.body;

  try {
    if (
      !checkRegistration(userid, eventid) &&
      checkEventisFull(eventid) &&
      checkDate
    ) {
      const result = await createRegistrationService(userid, eventid);
      handleResponse(res, 201, "User Created Successfully", result);
    } else {
      handleResponse(res, 409, "User is already registered for this event.");
    }
  } catch (err) {
    next(err);
  }
};

export const DeleteRegistration = async (req, res, next) => {
  const { userid, eventid } = req.body;

  try {
    const result = await deleteRegistrationService(userid, eventid);
    handleResponse(res, 201, "User Deleted Successfully", result);
  } catch (err) {
    next(err);
  }
};

//Custom comparator
const customEventSort = (eventA, eventB) => {
  if (eventA.event_date.getTime() < eventB.event_date.getTime()) {
    return -1;
  }

  if (eventA.event_date.getTime() > eventB.event_date.getTime()) {
    return 1;
  }

  return eventA.location.localeCompare(eventB.location);
};

//upcoming Events

export const upcomingEvents = async (req, res, next) => {
  const { userid, eventid } = req.body;

  try {
    const result = await upcomingEventsService();
    result.sort(customEventSort); //Sort using custom comparator
    handleResponse(res, 201, "User Deleted Successfully", result);
  } catch (err) {
    next(err);
  }
};

//Event Stats

export const eventStats = async (req, res, next) => {
  const { userid, eventid } = req.body;

  try {
    const result = await eventStatsService();
    result.sort(customEventSort); //Sort using custom comparator
    handleResponse(res, 201, "User Deleted Successfully", result);
  } catch (err) {
    next(err);
  }
};
