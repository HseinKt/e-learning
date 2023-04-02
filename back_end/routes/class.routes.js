const { Router } = require("express");
const router = Router();

const { enrollClass, addClass, getAllUsersEnrolled, withdrawalForm} = require("../controllers/class.controllers");

router.post("/:class_id/enroll",enrollClass);
router.post("/addClass",addClass);
router.get("/:class_id/getUsers",getAllUsersEnrolled)
router.delete("/:user_id/withdrawal/:class_id",withdrawalForm)

module.exports = router;