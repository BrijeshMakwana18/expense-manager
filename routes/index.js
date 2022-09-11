const router = require("express").Router();
const investments = require("../controllers/investments");
router.use("/investments", investments);
module.exports = router;
