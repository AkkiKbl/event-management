//Standardised Response function

import {
  createUserByIdService,
  deleteUserService,
  getAllUserService,
  getUserByIdService,
  updateUserService,
} from "../models/userModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const newUser = await createUserByIdService(name, email);
    handleResponse(res, 201, "User Created Successfully", newUser);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUserService();
    handleResponse(res, 200, "User Fetched Successfully", users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User Fetched by ID Successfully", user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await updateUserService(req.params.id, name, email);
    if (!updatedUser) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User Updated Successfully", updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const deletedUser = await deleteUserService(req.params.id, name, email);
    if (!deletedUser) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User Deleted Successfully", deletedUser);
  } catch (err) {
    next(err);
  }
};
