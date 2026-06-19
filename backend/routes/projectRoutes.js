const express = require("express");
const Project = require("../models/Project");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Get all projects
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find().populate("createdBy", "name");

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Create project (Admin only)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only Admin can create project",
      });
    }

    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.user.id,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;