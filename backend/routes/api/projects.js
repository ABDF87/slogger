const express = require('express');
const router = express.Router();
const projectsController = require('../../controllers/projectsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(projectsController.getAllProjects)
    .post(verifyRoles(ROLES_LIST.User), projectsController.createNewProject)
    .put(verifyRoles(ROLES_LIST.User), projectsController.updateProject)
    .delete(verifyRoles(ROLES_LIST.User), projectsController.deleteProject);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.User),projectsController.getProject);

module.exports = router;