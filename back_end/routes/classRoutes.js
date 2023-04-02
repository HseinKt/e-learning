const { Router } = require("express");
const router = Router();

const { enrollClass } = require("../controllers/class.controllers");

router.post("/enroll/:id",enrollClass);

module.exports = router;