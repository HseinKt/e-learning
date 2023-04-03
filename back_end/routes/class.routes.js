const { Router } = require("express");
const { adminMiddleware } = require("../middlewares/admin.middleware")
const router = Router();

const { enrollClass, addClass, getAllUsersEnrolled, withdrawalForm, withdrawalApprove} = require("../controllers/class.controllers");

router.post("/:class_id/enroll",enrollClass);
router.post("/addClass", adminMiddleware, addClass);
router.get("/:class_id/getUsers", adminMiddleware, getAllUsersEnrolled)
router.delete("/:class_id/withdrawal",withdrawalForm)
router.post("/:withdrawal_id/approve", adminMiddleware, withdrawalApprove)

module.exports = router;