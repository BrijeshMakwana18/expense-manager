const router = require("express").Router();
const axios = require("axios").default;
const authorization = require("./authorization");
const otherInvestments = [
  {
    id: "https://api.mfapi.in/mf/103174",
    units: 2474.897,
    avg: 157.5807,
    sip: 3000,
    date: 14,
  },
  {
    id: "https://api.mfapi.in/mf/112277",
    units: 6864.275,
    avg: 25.931,
    sip: 2000,
    date: 25,
  },
  {
    id: "https://api.mfapi.in/mf/118692",
    units: 6044.034,
    avg: 44.1752,
    sip: 3000,
    date: 28,
  },
];
router.post("/", authorization, async (req, res) => {
  let { body } = req;
  let response = {
    responseType: true,
  };
  res.send(response);
});

module.exports = router;
