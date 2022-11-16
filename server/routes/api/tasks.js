const express = require('express');
const router = express.Router();
const tasksController = require('../../controllers/tasksController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(tasksController.getAllTasks)
    .post(verifyRoles(ROLES_LIST.User), tasksController.createNewTask)
    .put(verifyRoles(ROLES_LIST.User), tasksController.updateTask)
    .delete(verifyRoles(ROLES_LIST.User), tasksController.deleteTask)

    router.route('/all')
    .delete(tasksController.deleteAllTask)

router.route('/:id')
    .get(tasksController.getTask);

module.exports = router;