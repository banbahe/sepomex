const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/sepomex.controller');

router.get('/sepomex/company', ctrl.ListCompanies);
router.get('/sepomex/company/:id', ctrl.CompanyPerId);
router.get('/sepomex/report/:id', ctrl.ReportPerId);

module.exports = router;