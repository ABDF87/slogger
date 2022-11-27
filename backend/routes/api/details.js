const express = require('express');
const router = express.Router();
const detailsController = require('../../controllers/detailsController')
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(detailsController.getAllDetails)
    .post(verifyRoles(ROLES_LIST.User), detailsController.createNewDetail)
    .put(verifyRoles(ROLES_LIST.User), detailsController.updateDetail)
    .delete(verifyRoles(ROLES_LIST.User), detailsController.deleteDetail);

router.route('/all')
    .delete(detailsController.deleteAllDetails)

router.route('/:id')
    .get(detailsController.getDetail);

module.exports = router;