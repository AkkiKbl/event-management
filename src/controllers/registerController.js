import { createRegistrationService } from "../models/eventModel";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createEvent = async (req, res, next) => {
  const { userid, eventid } = req.body;
  try {
    const result = await createRegistrationService();
    handleResponse(res, 201, "User Created Successfully", result);
  } catch (err) {
    next(err);
  }
};
