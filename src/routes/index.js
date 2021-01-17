var express = require('express');
var router = express.Router();

const OpportunitiesController = require("../controllers/OpportunitiesController");

router.get('/opportunities/', OpportunitiesController.index);
router.post('/opportunities/create', OpportunitiesController.create);

module.exports = router;