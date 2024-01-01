const express = require("express");
const ctrl = require("../../controllers/bicycles");
const { isValidId, validateBody } = require("../../middlewares");
const { schema } = require("../../models/bicycle");

const router = express.Router();

router.get("/bike-booking", ctrl.getAll);

router.post("/add", validateBody(schema.addSchema), ctrl.add);

router.patch(
  "/:id/status",
  isValidId,
  validateBody(schema.updateStatusSchema),
  ctrl.updateStatus
);

router.delete("/:id/remove", isValidId, ctrl.remove);

module.exports = router;
