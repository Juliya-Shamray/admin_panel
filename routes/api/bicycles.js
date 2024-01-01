const express = require("express");
const ctrl = require("../../controllers/bicycles");

const router = express.Router();

router.get("/admin/bike-booking", ctrl.getAll);

module.exports = router;
