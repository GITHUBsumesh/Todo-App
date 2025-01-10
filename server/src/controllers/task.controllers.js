import ErrorHandler from "../middlewares/error.middlewares.js";
import { Task } from "../models/task.models.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      message: "Task Created Successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      message: "My Tasks",
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(
      req.params.id);

    if (!task) return next(new ErrorHandler("Task Not Found", 404));
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Task not found", 404));
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};
