const express = require("express");

const projectDb = require("./helpers/projectModel.js");
const actionDb = require("./helpers/actionModel.js");

function checkActionDescLength() {
  return function(req, res, next) {
    let actionDescLength = req.body.description.length;
    if (actionDescLength <= 128) {
      next();
    } else {
      res
        .status(404)
        .json(
          "We aint tryna read a novel! Keep that description under 128 characters fool!!"
        );
    }
  };
}

const router = express.Router();

// ********** CREATE METHODS ********** //

// POST request to /api/projects
router.post("/projects", async (req, res) => {
  try {
    const project = await projectDb.insert(req.body);

    if (req.body.name && req.body.description) {
      res.status(201).json(project);
    } else {
      res.status(400).json({
        errorMessage:
          "Ay! You Crazy?!? This project NEEDS a NAME AND DESCRIPTION!!"
      });
    }
  } catch (error) {
    res.status(500).json({
      error:
        "I dunno what to tell you bro... I just cant save that project for you"
    });
  }
});

// POST request to /api/actions
router.post("/actions", async (req, res) => {
  try {
    const action = await actionDb.insert(req.body);

    if (req.body.project_id && req.body.description && req.body.notes) {
      res.status(201).json(action);
    } else {
      res.status(400).json({
        errorMessage:
          "Ay! You Crazy?!? This action NEEDS a PROJECT ID, DESCRIPTION, AND NOTES!!"
      });
    }
  } catch (error) {
    res.status(500).json({
      error:
        "I dunno what to tell you bro... I just cant save that action for you"
    });
  }
});

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
