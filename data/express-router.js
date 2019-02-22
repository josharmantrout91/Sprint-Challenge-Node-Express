const express = require("express");

const projectDb = require("./helpers/actionModel.js");
const actionDb = require("./helpers/projectModel.js");

const router = express.Router();

// ********** CREATE METHODS ********** //

// ********** READ METHODS ********** //

// GET request to /api/projects
router.get("/projects/", async (req, res) => {
  try {
    const projects = await projectDb.get();
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json("Aint no projects here, yall");
  }
});

// GET request to /api/actions
router.get("/actions/", async (req, res) => {
  try {
    const actions = await actionDb.get();
    res.status(200).json(actions);
  } catch (error) {
    console.log(error);
    res.status(500).json("Aint no actions here, yall");
  }
});

// GET request to /api/projects/:id/actions
router.get("/projects/:id/actions", async (req, res) => {
  try {
    const projectActions = await projectDb.getProjectActions(req.params.id);

    if (projectActions) {
      res.status(200).json(projectActions);
    } else {
      res.status(404).json({
        error: "You must be crazy, that project doesnt have any actions!"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "I dunno where those project actions are, but they aint here!"
    });
  }
});

// ********** UPDATE METHODS ********** //

// ********** DELETE METHODS ********** //

module.exports = router;
