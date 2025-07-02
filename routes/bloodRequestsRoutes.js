const express = require("express");
const router = express.Router();
const BloodRequestsController = require("../controllers/bloodRequestsController");

router.post("/blood-requests", BloodRequestsController.createBloodRequest);
router.get("/blood-requests", BloodRequestsController.getAllBloodRequests);
router.get("/blood-requests/:id", BloodRequestsController.getBloodRequestById);
router.delete("/blood-requests/:id", BloodRequestsController.deleteBloodRequest);
router.get("/blood-requests/:facility_id",BloodRequestsController.getBloodRequestsByFacilityId);

module.exports = router;
