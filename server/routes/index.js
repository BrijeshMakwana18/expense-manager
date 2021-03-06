const router = require("express").Router();
const register = require("../controllers/register");
const login = require("../controllers/login");
const transaction = require("../controllers/addTransaction");
const fetchTransaction = require("../controllers/dashboard");
const stat = require("../controllers/stat");
const investments = require("../controllers/investments");

router.use("/register", register);
router.use("/login", login);
router.use("/transaction", transaction);
router.use("/dashboard", fetchTransaction);
router.use("/stat", stat);
router.use("/investments", investments);
module.exports = router;
