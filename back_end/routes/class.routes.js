const { Router } = require("express");
const router = Router();

const { enrollClass, addClass, getAllUsersEnrolled } = require("../controllers/class.controllers");

router.post("/:class_id/enroll",enrollClass);
router.post("/addClass",addClass);
router.get("/:class_id/getUsers",getAllUsersEnrolled)

module.exports = router;