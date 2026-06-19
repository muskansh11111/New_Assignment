const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Get Tasks
router.get("/", auth, async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find()
        .populate("assignedTo", "name")
        .populate("projectId", "title");
    } else {
      tasks = await Task.find({
        assignedTo: req.user.id,
      })
        .populate("assignedTo", "name")
        .populate("projectId", "title");
    }

    res.json(tasks);
  } catch (error) {
  console.log(error);

  res.status(500).json({
    message: error.message,
  });
}
});

// Create Task
router.post("/", auth, async (req,res) => {

  try {

    const task = await Task.create({
      title:req.body.title,
      assignedTo:req.body.assignedTo,
      dueDate:req.body.dueDate,
      status:"Pending"
    });

    res.status(201).json(task);

  } catch(error) {

    console.log(error);

    res.status(500).json({
      message:error.message
    });
  }

});
// Update Task Status
router.put("/:id", async (req, res) => {

  try {

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

// Delete Task
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;