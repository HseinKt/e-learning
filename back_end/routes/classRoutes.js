const { Router } = require("express");
const router = Router();

const { enrollClass } = require("../controllers/class.controllers");

router.post("/enroll",enrollClass);

module.exports = router;