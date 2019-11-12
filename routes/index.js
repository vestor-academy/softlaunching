var express = require('express');
var router = express.Router();

// Require controller modules.
var controller = require('../controllers/controller');

router.get('/', controller.index);
// router.post('/', controller.post);
router.get('/index.html', controller.redirect);
// router.get('/apipost', controller.apipost);

// API
// Create a new User
router.post('/api', controller.create);

// Retrieve all Users
router.get('/api', controller.findAll);

// Retrieve a single User with emailId
router.get('/api/:emailId', controller.findOne);

// Update a User with emailId
router.put('/api/:emailId', controller.update);

// Delete a User with emailId
router.delete('/api/:emailId', controller.delete);

module.exports = router;
