const { Router } = require("express");
const router = Router();

const { enrollClass, addClass } = require("../controllers/class.controllers");

router.post("/enroll",enrollClass);
router.post("/addClass",addClass);

module.exports = router;