const express = require("express");

const projectDb = require("./helpers/projectModel.js");
const actionDb = require("./helpers/actionModel.js");

function checkActionDescLength(req, res, next) {
  let actionDescLength = req.body.description.length;
  console.log(actionDescLength);
  if (actionDescLength > 128) {
    res
      .status(404)
      .json(
        "We aint tryna read a novel! Keep that description under 128 characters fool!!"
      );
  } else {
    next();
  }
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
router.post("/actions", checkActionDescLength, async (req, res) => {
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

// PUT to /api/projects/:id
router.put("/projects/:id", async (req, res) => {
  try {
    updated = await projectDb.update(req.params.id, req.body);

    if (!req.params.id) {
      res
        .status(404)
        .json({ message: "We aint got no project with that ID yall" });
    } else if (req.body.name && req.body.description) {
      res.status(200).json(updated);
    } else {
      res.status(400).json({
        errorMessage:
          "Just because we doin a update dont mean you can leave out a project id, description, and notes yall"
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "That action must be set in stone cuz we cant make NO CHANGES yall"
    });
  }
});

// PUT to /api/actions/:id
router.put("/actions/:id", async (req, res) => {
  try {
    updated = await actionDb.update(req.params.id, req.body);

    if (!req.params.id) {
      res
        .status(404)
        .json({ message: "We aint got no action with that ID yall" });
    } else if (req.body.description.length > 128) {
      res
        .status(404)
        .json(
          "We aint tryna read a novel! Keep that description under 128 characters fool!!"
        );
    } else if (req.body.project_id && req.body.description && req.body.notes) {
      res.status(200).json(updated);
    } else {
      res.status(400).json({
        errorMessage:
          "Just because we doin a update dont mean you can leave out a project id, notes, and description yall"
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "That action must be set in stone cuz we cant make NO CHANGES yall"
    });
  }
});

// ********** DELETE METHODS ********** //

// DELETE to /api/projects/:id
router.delete("/projects/:id", async (req, res) => {
  try {
    count = await projectDb.remove(req.params.id);
    if (count) {
      res
        .status(200)
        .json({ count, message: "We got rid of that project yall!" });
    } else {
      res
        .status(404)
        .json({ message: "We aint even got a project to delete yall" });
    }
  } catch (error) {
    res.status(500).json({
      error:
        "Sorry but this project is stickin around for now... I couldnt remove it!"
    });
  }
});

// DELETE to /api/actions/:id
router.delete("/actions/:id", async (req, res) => {
  try {
    count = await actionDb.remove(req.params.id);
    if (count) {
      res
        .status(200)
        .json({ count, message: "We got rid of that action yall!" });
    } else {
      res
        .status(404)
        .json({ message: "We aint even got a action to delete yall" });
    }
  } catch (error) {
    res.status(500).json({
      error:
        "Sorry but this action is stickin around for now... I couldnt remove it!"
    });
  }
});

module.exports = router;
